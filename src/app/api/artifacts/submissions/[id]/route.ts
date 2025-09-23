import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, adminNotes, reviewedBy } = body;
    const submissionId = parseInt(params.id);

    if (!status || !['approved', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Update submission
    const result = await sql`
      UPDATE artifact_submissions
      SET
        status = ${status},
        admin_notes = ${adminNotes || null},
        reviewed_by = ${reviewedBy || null},
        reviewed_at = ${status !== 'pending' ? new Date().toISOString() : null}
      WHERE id = ${submissionId}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    const submission = result[0];

    // If approved, potentially update the artifact with the submission data
    if (status === 'approved') {
      const submissionData = submission.submission_data;

      // Update artifact with approved data
      const updateFields: any = {};

      if (submissionData.setEffects) {
        if (submissionData.setEffects.effect1) updateFields.set_effect_1pc = submissionData.setEffects.effect1;
        if (submissionData.setEffects.effect2) updateFields.set_effect_2pc = submissionData.setEffects.effect2;
        if (submissionData.setEffects.effect3) updateFields.set_effect_3pc = submissionData.setEffects.effect3;
        if (submissionData.setEffects.effect4) updateFields.set_effect_4pc = submissionData.setEffects.effect4;
        if (submissionData.setEffects.effect5) updateFields.set_effect_5pc = submissionData.setEffects.effect5;
      }

      if (Object.keys(updateFields).length > 0) {
        await sql`
          UPDATE artifacts
          SET ${sql(updateFields)}, verified = true, updated_at = CURRENT_TIMESTAMP
          WHERE id = ${submission.artifact_id}
        `;
      }

      // Add rollable stats if provided
      if (submissionData.rollableAttributes && submissionData.rollableAttributes.length > 0) {
        for (const stat of submissionData.rollableAttributes) {
          await sql`
            INSERT INTO rollable_stats (artifact_id, name, min_value, max_value, stat_type, rarity)
            VALUES (
              ${submission.artifact_id},
              ${stat.name},
              ${stat.minValue},
              ${stat.maxValue},
              ${stat.type},
              ${stat.rarity || 'common'}
            )
            ON CONFLICT (artifact_id, name, stat_type) DO UPDATE SET
              min_value = LEAST(rollable_stats.min_value, ${stat.minValue}),
              max_value = GREATEST(rollable_stats.max_value, ${stat.maxValue})
          `;
        }
      }
    }

    return NextResponse.json({
      success: true,
      submission: result[0]
    });

  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Failed to update submission' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const submissionId = parseInt(params.id);

    const result = await sql`
      DELETE FROM artifact_submissions
      WHERE id = ${submissionId}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Submission deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
}