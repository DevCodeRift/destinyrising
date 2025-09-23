import { NextRequest, NextResponse } from 'next/server';
import { sql, DatabaseSubmission } from '@/lib/database';
import { ArtifactSubmission } from '@/types/artifacts';
import { put } from '@vercel/blob';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const artifactId = searchParams.get('artifactId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    // Build WHERE conditions
    let whereConditions = [];
    let queryParams = [];
    let paramIndex = 1;

    if (status) {
      whereConditions.push(`status = $${paramIndex}`);
      queryParams.push(status);
      paramIndex++;
    }

    if (artifactId) {
      whereConditions.push(`artifact_id = $${paramIndex}`);
      queryParams.push(parseInt(artifactId));
      paramIndex++;
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get submissions with artifact info
    const submissionsQuery = `
      SELECT
        s.*,
        a.name as artifact_name,
        a.slot as artifact_slot
      FROM artifact_submissions s
      LEFT JOIN artifacts a ON s.artifact_id = a.id
      ${whereClause}
      ORDER BY s.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    queryParams.push(limit, offset);

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM artifact_submissions s ${whereClause}`;
    const countParams = queryParams.slice(0, -2);

    const [submissionsResult, countResult, statusCounts] = await Promise.all([
      sql(submissionsQuery, queryParams),
      sql(countQuery, countParams),
      sql`
        SELECT
          status,
          COUNT(*) as count
        FROM artifact_submissions
        GROUP BY status
      `
    ]);

    // Transform to API format
    const submissions: ArtifactSubmission[] = submissionsResult.map((row: any) => ({
      id: row.id.toString(),
      artifactId: row.artifact_id,
      artifactName: row.artifact_name,
      artifactSlot: row.artifact_slot,
      submitterInfo: {
        username: row.submitter_name,
        email: row.submitter_contact,
        anonymous: !row.submitter_name,
      },
      submissionData: row.submission_data,
      evidence: {
        notes: row.evidence_notes,
        files: row.evidence_files || [],
      },
      status: row.status,
      adminNotes: row.admin_notes,
      metadata: {
        submittedAt: row.created_at,
        reviewedAt: row.reviewed_at,
        reviewedBy: row.reviewed_by,
        priority: 'normal',
      },
    }));

    const total = parseInt(countResult[0].total);
    const metadata = {
      totalSubmissions: total,
      pendingSubmissions: statusCounts.find((s: any) => s.status === 'pending')?.count || 0,
      approvedSubmissions: statusCounts.find((s: any) => s.status === 'approved')?.count || 0,
      rejectedSubmissions: statusCounts.find((s: any) => s.status === 'rejected')?.count || 0,
    };

    return NextResponse.json({
      submissions,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      metadata
    });

  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const bodyData = formData.get('data') as string;

    if (!bodyData) {
      return NextResponse.json(
        { error: 'Missing submission data' },
        { status: 400 }
      );
    }

    const body = JSON.parse(bodyData);

    // Validate required fields
    if (!body.artifactId || !body.submissionData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify artifact exists
    const artifact = await sql`
      SELECT id FROM artifacts WHERE id = ${body.artifactId}
    `;

    if (artifact.length === 0) {
      return NextResponse.json(
        { error: 'Artifact not found' },
        { status: 404 }
      );
    }

    // Handle file uploads
    const evidenceFiles = [];
    const files = formData.getAll('files') as File[];

    for (const file of files) {
      if (file.size > 0) {
        const blob = await put(file.name, file, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        evidenceFiles.push({
          name: file.name,
          url: blob.url,
          size: file.size,
          type: file.type,
        });
      }
    }

    // Create submission in database
    const submission = await sql`
      INSERT INTO artifact_submissions (
        artifact_id,
        submitter_name,
        submitter_contact,
        submission_data,
        evidence_notes,
        evidence_files,
        status
      ) VALUES (
        ${body.artifactId},
        ${body.submitterInfo?.username || null},
        ${body.submitterInfo?.email || null},
        ${JSON.stringify(body.submissionData)},
        ${body.evidence?.notes || null},
        ${JSON.stringify(evidenceFiles)},
        'pending'
      )
      RETURNING id
    `;

    // Update artifact submission count
    await sql`
      UPDATE artifacts
      SET submission_count = submission_count + 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${body.artifactId}
    `;

    return NextResponse.json({
      success: true,
      submissionId: submission[0].id,
      message: 'Submission created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json(
      { error: 'Failed to create submission' },
      { status: 500 }
    );
  }
}