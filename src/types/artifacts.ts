export interface RollableStat {
  name: string;
  minValue: number;
  maxValue: number;
  type: 'percentage' | 'flat' | 'multiplier';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  description?: string;
}

export interface ArtifactSetEffects {
  effect1?: string;  // 1 piece equipped
  effect2?: string;  // 2 pieces equipped
  effect3?: string;  // 3 pieces equipped
  effect4?: string;  // 4 pieces equipped
  effect5?: string;  // 5 pieces equipped
}

export interface Artifact {
  id: string;
  name: string;
  slot: 1 | 2 | 3 | 4;
  description?: string;
  image?: string;
  setEffects: ArtifactSetEffects;
  rollableAttributes: {
    primaryStats: RollableStat[];
    secondaryStats: RollableStat[];
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    submissionCount: number;
    verified: boolean;
    verifiedBy?: string;
    verifiedAt?: string;
  };
}

export interface ArtifactSubmission {
  id: string;
  artifactId: string;
  submitterInfo: {
    username?: string;
    email?: string;
    anonymous: boolean;
  };
  submissionData: {
    setEffects: ArtifactSetEffects;
    rollableAttributes: RollableStat[];
    notes?: string;
  };
  evidence?: {
    screenshots: string[];
    videoUrl?: string;
    notes: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'needs_review';
  metadata: {
    submittedAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
    reviewNotes?: string;
    priority: 'low' | 'normal' | 'high' | 'urgent';
  };
}

export interface ArtifactDatabase {
  artifacts: Artifact[];
  metadata: {
    version: string;
    lastUpdated: string;
    totalArtifacts: number;
    verifiedArtifacts: number;
  };
}

export interface SubmissionDatabase {
  submissions: ArtifactSubmission[];
  metadata: {
    totalSubmissions: number;
    pendingSubmissions: number;
    approvedSubmissions: number;
    rejectedSubmissions: number;
    lastUpdated: string;
  };
}

// Form-related interfaces
export interface ArtifactSubmissionForm {
  artifactId: string;
  submitterInfo: {
    username?: string;
    email?: string;
    anonymous: boolean;
  };
  setEffects: {
    effect1?: string;
    effect2?: string;
    effect3?: string;
    effect4?: string;
    effect5?: string;
  };
  rollableAttributes: {
    statName: string;
    minValue: number;
    maxValue: number;
    type: 'percentage' | 'flat' | 'multiplier';
    rarity?: string;
  }[];
  evidence?: {
    screenshots: File[];
    videoUrl?: string;
    notes: string;
  };
}

// API Response types
export interface ArtifactListResponse {
  artifacts: Artifact[];
  total: number;
  page: number;
  limit: number;
  filters?: {
    slot?: number;
    verified?: boolean;
    search?: string;
  };
}

export interface ArtifactDetailResponse {
  artifact: Artifact;
  relatedSubmissions?: ArtifactSubmission[];
}

export interface SubmissionResponse {
  success: boolean;
  submissionId?: string;
  message: string;
  errors?: string[];
}

// Admin interfaces
export interface AdminStats {
  totalArtifacts: number;
  verifiedArtifacts: number;
  pendingSubmissions: number;
  totalSubmissions: number;
  recentActivity: {
    newSubmissions: number;
    verifiedToday: number;
    lastWeek: number;
  };
}

export interface ArtifactSearchFilters {
  slot?: number;
  verified?: boolean;
  search?: string;
  hasSetEffects?: boolean;
  hasRollableStats?: boolean;
  sortBy?: 'name' | 'slot' | 'updated' | 'submissions';
  sortOrder?: 'asc' | 'desc';
}

// Utility types
export type ArtifactSlot = 1 | 2 | 3 | 4;
export type SetEffectLevel = 1 | 2 | 3 | 4 | 5;
export type StatType = 'percentage' | 'flat' | 'multiplier';
export type StatRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'needs_review';
export type Priority = 'low' | 'normal' | 'high' | 'urgent';