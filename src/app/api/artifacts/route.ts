import { NextRequest, NextResponse } from 'next/server';
import { sql, DatabaseArtifact, DatabaseRollableStat } from '@/lib/database';
import { ArtifactSearchFilters, Artifact } from '@/types/artifacts';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse filters
    const filters: ArtifactSearchFilters = {
      slot: searchParams.get('slot') ? parseInt(searchParams.get('slot')!) : undefined,
      verified: searchParams.get('verified') === 'true',
      search: searchParams.get('search') || undefined,
      hasSetEffects: searchParams.get('hasSetEffects') === 'true',
      hasRollableStats: searchParams.get('hasRollableStats') === 'true',
      sortBy: (searchParams.get('sortBy') as any) || 'name',
      sortOrder: (searchParams.get('sortOrder') as any) || 'asc',
    };

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    // Build SQL query with filters
    let whereConditions = [];
    let queryParams = [];
    let paramIndex = 1;

    if (filters.slot) {
      whereConditions.push(`a.slot = $${paramIndex}`);
      queryParams.push(filters.slot);
      paramIndex++;
    }

    if (filters.verified !== undefined) {
      whereConditions.push(`a.verified = $${paramIndex}`);
      queryParams.push(filters.verified);
      paramIndex++;
    }

    if (filters.search) {
      whereConditions.push(`(LOWER(a.name) LIKE $${paramIndex} OR LOWER(a.description) LIKE $${paramIndex})`);
      queryParams.push(`%${filters.search.toLowerCase()}%`);
      paramIndex++;
    }

    if (filters.hasSetEffects) {
      whereConditions.push(`(
        a.set_effect_1pc IS NOT NULL AND a.set_effect_1pc != '' OR
        a.set_effect_2pc IS NOT NULL AND a.set_effect_2pc != '' OR
        a.set_effect_3pc IS NOT NULL AND a.set_effect_3pc != '' OR
        a.set_effect_4pc IS NOT NULL AND a.set_effect_4pc != '' OR
        a.set_effect_5pc IS NOT NULL AND a.set_effect_5pc != ''
      )`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Determine sort column
    let sortColumn = 'a.name';
    switch (filters.sortBy) {
      case 'slot':
        sortColumn = 'a.slot';
        break;
      case 'updated':
        sortColumn = 'a.updated_at';
        break;
      case 'submissions':
        sortColumn = 'a.submission_count';
        break;
      default:
        sortColumn = 'a.name';
    }

    const sortOrder = filters.sortOrder === 'desc' ? 'DESC' : 'ASC';

    // Get artifacts with rollable stats
    const artifactsQuery = `
      SELECT
        a.*,
        COALESCE(
          json_agg(
            CASE WHEN rs.id IS NOT NULL THEN
              json_build_object(
                'id', rs.id,
                'name', rs.name,
                'minValue', rs.min_value,
                'maxValue', rs.max_value,
                'type', rs.stat_type,
                'rarity', rs.rarity
              )
            ELSE NULL END
          ) FILTER (WHERE rs.id IS NOT NULL),
          '[]'
        ) as rollable_stats
      FROM artifacts a
      LEFT JOIN rollable_stats rs ON a.id = rs.artifact_id
      ${whereClause}
      GROUP BY a.id
      ORDER BY ${sortColumn} ${sortOrder}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    queryParams.push(limit, offset);

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM artifacts a ${whereClause}`;
    const countParams = queryParams.slice(0, -2); // Remove limit and offset

    const [artifactsResult, countResult] = await Promise.all([
      sql(artifactsQuery, queryParams),
      sql(countQuery, countParams)
    ]);

    // Transform database results to API format
    const artifacts: Artifact[] = artifactsResult.map((row: any) => {
      const rollableStats = row.rollable_stats || [];
      const primaryStats = rollableStats.filter((stat: any) => stat.type === 'primary');
      const secondaryStats = rollableStats.filter((stat: any) => stat.type === 'secondary');

      // Apply hasRollableStats filter if needed
      if (filters.hasRollableStats && rollableStats.length === 0) {
        return null;
      }

      return {
        id: row.id,
        name: row.name,
        description: row.description,
        slot: row.slot,
        setEffects: {
          effect1: row.set_effect_1pc || '',
          effect2: row.set_effect_2pc || '',
          effect3: row.set_effect_3pc || '',
          effect4: row.set_effect_4pc || '',
          effect5: row.set_effect_5pc || '',
        },
        rollableAttributes: {
          primaryStats,
          secondaryStats,
        },
        metadata: {
          verified: row.verified,
          submissionCount: row.submission_count,
          updatedAt: row.updated_at,
        },
      };
    }).filter(Boolean);

    const total = parseInt(countResult[0].total);

    return NextResponse.json({
      artifacts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      filters
    });

  } catch (error) {
    console.error('Error fetching artifacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artifacts' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { artifactId, updates } = body;

    if (!artifactId || !updates) {
      return NextResponse.json(
        { error: 'Missing artifactId or updates' },
        { status: 400 }
      );
    }

    // Check if artifact exists
    const existingArtifact = await sql`
      SELECT * FROM artifacts WHERE id = ${artifactId}
    `;

    if (existingArtifact.length === 0) {
      return NextResponse.json(
        { error: 'Artifact not found' },
        { status: 404 }
      );
    }

    // Prepare update fields
    const updateFields: any = {};

    if (updates.name) updateFields.name = updates.name;
    if (updates.description !== undefined) updateFields.description = updates.description;
    if (updates.slot) updateFields.slot = updates.slot;
    if (updates.setEffects) {
      updateFields.set_effect_1pc = updates.setEffects.effect1 || null;
      updateFields.set_effect_2pc = updates.setEffects.effect2 || null;
      updateFields.set_effect_3pc = updates.setEffects.effect3 || null;
      updateFields.set_effect_4pc = updates.setEffects.effect4 || null;
      updateFields.set_effect_5pc = updates.setEffects.effect5 || null;
    }
    if (updates.metadata?.verified !== undefined) updateFields.verified = updates.metadata.verified;
    if (updates.metadata?.submissionCount !== undefined) updateFields.submission_count = updates.metadata.submissionCount;

    // Update artifact
    const updatedArtifact = await sql`
      UPDATE artifacts
      SET ${sql(updateFields)}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${artifactId}
      RETURNING *
    `;

    // Update rollable stats if provided
    if (updates.rollableAttributes) {
      // Delete existing stats
      await sql`DELETE FROM rollable_stats WHERE artifact_id = ${artifactId}`;

      // Insert new stats
      const allStats = [
        ...updates.rollableAttributes.primaryStats.map((stat: any) => ({ ...stat, type: 'primary' })),
        ...updates.rollableAttributes.secondaryStats.map((stat: any) => ({ ...stat, type: 'secondary' }))
      ];

      for (const stat of allStats) {
        await sql`
          INSERT INTO rollable_stats (artifact_id, name, min_value, max_value, stat_type, rarity)
          VALUES (${artifactId}, ${stat.name}, ${stat.minValue}, ${stat.maxValue}, ${stat.type}, ${stat.rarity || 'common'})
        `;
      }
    }

    return NextResponse.json({
      success: true,
      artifact: updatedArtifact[0]
    });

  } catch (error) {
    console.error('Error updating artifact:', error);
    return NextResponse.json(
      { error: 'Failed to update artifact' },
      { status: 500 }
    );
  }
}