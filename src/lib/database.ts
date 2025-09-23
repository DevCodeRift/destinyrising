import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export const sql = neon(process.env.DATABASE_URL);

export interface DatabaseArtifact {
  id: number;
  name: string;
  description: string | null;
  slot: number;
  set_effect_1pc: string | null;
  set_effect_2pc: string | null;
  set_effect_3pc: string | null;
  set_effect_4pc: string | null;
  set_effect_5pc: string | null;
  verified: boolean;
  submission_count: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseRollableStat {
  id: number;
  artifact_id: number;
  name: string;
  min_value: number | null;
  max_value: number | null;
  stat_type: 'primary' | 'secondary';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  created_at: string;
}

export interface DatabaseSubmission {
  id: number;
  artifact_id: number;
  submitter_name: string | null;
  submitter_contact: string | null;
  submission_data: any;
  evidence_notes: string | null;
  evidence_files: any;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string | null;
  created_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
}