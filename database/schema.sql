-- Artifacts Database Schema for Neon PostgreSQL

-- Create tables for the artifact system
CREATE TABLE IF NOT EXISTS artifacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  slot INTEGER NOT NULL CHECK (slot IN (1, 2, 3, 4)),
  set_effect_1pc TEXT,
  set_effect_2pc TEXT,
  set_effect_3pc TEXT,
  set_effect_4pc TEXT,
  set_effect_5pc TEXT,
  verified BOOLEAN DEFAULT FALSE,
  submission_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create table for rollable stats
CREATE TABLE IF NOT EXISTS rollable_stats (
  id SERIAL PRIMARY KEY,
  artifact_id INTEGER REFERENCES artifacts(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  min_value INTEGER,
  max_value INTEGER,
  stat_type VARCHAR(50) NOT NULL CHECK (stat_type IN ('primary', 'secondary')),
  rarity VARCHAR(50) DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create table for submissions
CREATE TABLE IF NOT EXISTS artifact_submissions (
  id SERIAL PRIMARY KEY,
  artifact_id INTEGER REFERENCES artifacts(id) ON DELETE CASCADE,
  submitter_name VARCHAR(255),
  submitter_contact VARCHAR(255),
  submission_data JSONB NOT NULL,
  evidence_notes TEXT,
  evidence_files JSONB,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by VARCHAR(255)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_artifacts_slot ON artifacts(slot);
CREATE INDEX IF NOT EXISTS idx_artifacts_verified ON artifacts(verified);
CREATE INDEX IF NOT EXISTS idx_rollable_stats_artifact_id ON rollable_stats(artifact_id);
CREATE INDEX IF NOT EXISTS idx_rollable_stats_type ON rollable_stats(stat_type);
CREATE INDEX IF NOT EXISTS idx_submissions_artifact_id ON artifact_submissions(artifact_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON artifact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON artifact_submissions(created_at);

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_artifacts_updated_at BEFORE UPDATE ON artifacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();