# Destiny Rising Artifact Database System Plan

## Overview
Building a comprehensive database system for Destiny Rising artifacts to collect and manage data on set effects and rollable attributes.

## Artifact Data Structure

### Artifact Slots (4 columns detected)
- **Column 1**: 20 artifacts
- **Column 2**: 20 artifacts
- **Column 3**: 20 artifacts
- **Column 4**: 20 artifacts
- **Total**: 80 unique artifacts

### Data Fields Per Artifact
- **Basic Info**:
  - Name
  - Slot (Column 1-4)
  - ID/Slug
  - Description (optional)
  - Image (optional)

- **Set Effects** (5 levels):
  - Set Effect 1 (1 piece equipped)
  - Set Effect 2 (2 pieces equipped)
  - Set Effect 3 (3 pieces equipped)
  - Set Effect 4 (4 pieces equipped)
  - Set Effect 5 (5 pieces equipped)

- **Rollable Attributes**:
  - Primary stats that can roll
  - Secondary stats that can roll
  - Stat ranges (min-max values)
  - Rarity tiers if applicable

## Database Schema Design

```typescript
interface Artifact {
  id: string;
  name: string;
  slot: 1 | 2 | 3 | 4;
  description?: string;
  image?: string;
  setEffects: {
    effect1?: string;  // 1 piece
    effect2?: string;  // 2 pieces
    effect3?: string;  // 3 pieces
    effect4?: string;  // 4 pieces
    effect5?: string;  // 5 pieces
  };
  rollableAttributes: {
    primaryStats: RollableStat[];
    secondaryStats: RollableStat[];
  };
  createdAt: string;
  updatedAt: string;
  submissionCount: number; // Track data quality
  verified: boolean; // Admin verification status
}

interface RollableStat {
  name: string;
  minValue: number;
  maxValue: number;
  type: 'percentage' | 'flat' | 'multiplier';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

interface ArtifactSubmission {
  id: string;
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
  rollableAttributes: RollableStat[];
  evidence?: {
    screenshots: string[];
    notes: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}
```

## System Components

### 1. Database Layer
- **File**: `/src/data/artifacts/artifacts.json`
- **Submissions**: `/src/data/artifacts/submissions.json`
- JSON-based storage (can migrate to proper DB later)

### 2. Admin Interface (`/admin/artifacts`)
- View all artifacts
- Manage submissions
- Edit artifact data
- Verify/approve submissions
- Export data

### 3. User Submission Form (`/contribute/artifacts`)
- Select artifact from dropdown
- Form for set effects (5 levels)
- Dynamic form for rollable attributes
- File upload for screenshots
- Anonymous or registered submissions

### 4. Public Artifact Database (`/artifacts`)
- Browse all artifacts
- Search and filter
- View set effects
- View rollable attributes
- Community ratings/verification

### 5. API Endpoints
- `GET /api/artifacts` - List all artifacts
- `GET /api/artifacts/[id]` - Get artifact details
- `POST /api/artifacts/submit` - Submit artifact data
- `GET /api/submissions` - List submissions (admin)
- `PUT /api/submissions/[id]/approve` - Approve submission
- `PUT /api/submissions/[id]/reject` - Reject submission

## Implementation Phases

### Phase 1: Database Setup ✓ (This session)
- [x] Parse artifact list data
- [ ] Create initial artifact database
- [ ] Define TypeScript interfaces
- [ ] Set up data structure

### Phase 2: Admin Interface
- [ ] Admin dashboard layout
- [ ] Artifact management interface
- [ ] Submission review system
- [ ] Data export functionality

### Phase 3: User Submission System
- [ ] Public submission form
- [ ] File upload handling
- [ ] Validation and sanitization
- [ ] Email notifications

### Phase 4: Public Interface
- [ ] Artifact browser
- [ ] Search and filtering
- [ ] Detailed artifact pages
- [ ] Community features

### Phase 5: Data Quality & Enhancement
- [ ] Submission verification system
- [ ] Community voting/rating
- [ ] Data consolidation algorithms
- [ ] API documentation

## Parsed Artifact List

### Column 1 (Slot 1) - 20 Artifacts
1. Abundant Planetesimal
2. Nourishing Pact
3. Nimble Veil
4. Healing Radiation
5. Resolute Conjunction
6. Resolution Nutation
7. Warding Pact
8. Healing Planetesimal
9. Talisman of Revival
10. Unrelenting Subgravity
11. Unrelenting Ground
12. Nimble Ground
13. Ring of Healing
14. Ring of Abundance
15. Chiaroscuro
16. Inverted Guard
17. Upright Guard
18. Bulwark Evolution
19. Unrelenting Shell
20. Bulwark Token

### Column 2 (Slot 2) - 20 Artifacts
1. Healing Veil
2. Inverted Tenacity
3. Resolute Radiation
4. Healing Conjunction
5. Healing Nutation
6. Siphoning Pact
7. Bulwark Pact
8. Binging Planetesimal
9. Retributive Planetesimal
10. Talisman of Luxuriance
11. Healing Subgravity
12. Fertile Ground
13. Healing Ground
14. Ring of Safeguarding
15. Ring of Conversion
16. Pranayama
17. Upright Tenacity
18. Unrelenting Evolution
19. Bloodthirsty Shell
20. Unrelenting Token

### Column 3 (Slot 3) - 20 Artifacts
1. Courageous Planetesimal
2. Rampaging Pact
3. Bellicose Radiation
4. Bellicose Precession
5. Bellicose Pact
6. Vigilant Planetesimal
7. Talisman of Unity
8. Valiant Subgravity
9. Valiant Ground
10. Mysterious Submagnetism
11. Bellicose Veil
12. Ring of Morale
13. Ring of Courage
14. Upright Vengeance Inverted Fury (Note: possible parsing error)
15. Upright Fury
16. Predator Evolution
17. Scattering Shell
18. Calming Token
19. Jolted Transit

### Column 4 (Slot 4) - 20 Artifacts
1. Bellicose Planetesimal
2. Valiant Veil
3. Rampaging Radiation
4. Rampaging Precession
5. Resonating Pact
6. Responsive Pact (Note: "Responive" typo corrected)
7. Rampaging Planetesimal
8. Talisman of Inspiration
9. Light-Rich Ground
10. Bellicose Subgravity
11. Illuminated Ground
12. Ring of Vengeance
13. Ring of Reflection
14. Inverted Survival
15. Inverted Vengeance
16. Upright Survival
17. Sympathetic Evolution
18. Explosive Shell
19. Hawkeye Token
20. Resonating Transit

## Notes & Considerations

1. **Data Quality**: Need robust submission validation
2. **Community Driven**: Design for community contributions
3. **Scalability**: Structure for future expansion
4. **Verification**: Admin approval system essential
5. **User Experience**: Make submission process intuitive
6. **Data Export**: Allow researchers to access data
7. **API Access**: Enable third-party integrations

## Files to Create

1. `/src/types/artifacts.ts` - TypeScript interfaces
2. `/src/data/artifacts/artifacts.json` - Main artifact database
3. `/src/data/artifacts/submissions.json` - User submissions
4. `/src/components/ui/ArtifactCard.tsx` - Artifact display component
5. `/src/components/ui/ArtifactSubmissionForm.tsx` - Submission form
6. `/src/components/ui/ArtifactAdmin.tsx` - Admin interface
7. `/src/app/admin/artifacts/page.tsx` - Admin page
8. `/src/app/contribute/artifacts/page.tsx` - Submission page
9. `/src/app/artifacts/page.tsx` - Public artifact browser
10. `/src/app/api/artifacts/route.ts` - API endpoints

## Success Metrics

- [ ] All 80 artifacts in database
- [ ] Functional submission system
- [ ] Admin approval workflow
- [ ] Public artifact browser
- [ ] 5 set effects tracked per artifact
- [ ] Rollable attributes system
- [ ] Community engagement features

---

**Status**: Phase 1 in progress
**Next**: Create database schema and populate with all artifacts