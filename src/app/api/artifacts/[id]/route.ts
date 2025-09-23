import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { ArtifactDatabase, SubmissionDatabase } from '@/types/artifacts';

const ARTIFACTS_DB_PATH = path.join(process.cwd(), 'src/data/artifacts/artifacts.json');
const SUBMISSIONS_DB_PATH = path.join(process.cwd(), 'src/data/artifacts/submissions.json');

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Read databases
    const artifactsContent = await fs.readFile(ARTIFACTS_DB_PATH, 'utf8');
    const artifactsDb: ArtifactDatabase = JSON.parse(artifactsContent);

    const submissionsContent = await fs.readFile(SUBMISSIONS_DB_PATH, 'utf8');
    const submissionsDb: SubmissionDatabase = JSON.parse(submissionsContent);

    // Find artifact
    const artifact = artifactsDb.artifacts.find(a => a.id === id);
    if (!artifact) {
      return NextResponse.json(
        { error: 'Artifact not found' },
        { status: 404 }
      );
    }

    // Get related submissions
    const relatedSubmissions = submissionsDb.submissions.filter(s => s.artifactId === id);

    return NextResponse.json({
      artifact,
      relatedSubmissions,
      submissionCount: relatedSubmissions.length
    });

  } catch (error) {
    console.error('Error fetching artifact:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artifact' },
      { status: 500 }
    );
  }
}