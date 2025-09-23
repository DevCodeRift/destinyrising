import { sql } from './database';

export async function initializeDatabase() {
  try {
    // Check if tables exist
    const tablesResult = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('artifacts', 'rollable_stats', 'artifact_submissions')
    `;

    if (tablesResult.length < 3) {
      console.log('Database tables not found. Please run the schema.sql and migrate.sql scripts.');
      return false;
    }

    // Check if we have artifacts
    const artifactCount = await sql`SELECT COUNT(*) as count FROM artifacts`;
    const count = parseInt(artifactCount[0].count);

    if (count === 0) {
      console.log('No artifacts found. Please run the migrate.sql script to populate initial data.');
      return false;
    }

    console.log(`Database initialized with ${count} artifacts`);
    return true;

  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}

export async function checkDatabaseHealth() {
  try {
    // Test basic database connectivity
    await sql`SELECT 1`;

    // Get basic stats
    const [artifacts, submissions, stats] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM artifacts`,
      sql`SELECT COUNT(*) as count FROM artifact_submissions`,
      sql`
        SELECT
          COUNT(*) as total_artifacts,
          COUNT(*) FILTER (WHERE verified = true) as verified_artifacts,
          COUNT(*) FILTER (WHERE
            set_effect_1pc IS NOT NULL OR
            set_effect_2pc IS NOT NULL OR
            set_effect_3pc IS NOT NULL OR
            set_effect_4pc IS NOT NULL OR
            set_effect_5pc IS NOT NULL
          ) as artifacts_with_effects
        FROM artifacts
      `
    ]);

    return {
      healthy: true,
      artifacts: parseInt(artifacts[0].count),
      submissions: parseInt(submissions[0].count),
      verified: parseInt(stats[0].verified_artifacts),
      withEffects: parseInt(stats[0].artifacts_with_effects),
    };

  } catch (error) {
    console.error('Database health check failed:', error);
    return {
      healthy: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}