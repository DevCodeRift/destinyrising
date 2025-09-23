import { NextResponse } from 'next/server';
import { checkDatabaseHealth } from '@/lib/init-db';

export async function GET() {
  try {
    const health = await checkDatabaseHealth();

    if (!health.healthy) {
      return NextResponse.json(
        {
          status: 'unhealthy',
          error: health.error
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        artifacts: health.artifacts,
        submissions: health.submissions,
        verified: health.verified,
        withEffects: health.withEffects,
      }
    });

  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      {
        status: 'error',
        error: 'Health check failed'
      },
      { status: 500 }
    );
  }
}