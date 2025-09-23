# Destiny Rising Artifact Database

A community-driven database for collecting and sharing Destiny Rising artifact data, including set effects and rollable stat ranges.

## Features

- **Browse Artifacts**: Search and filter through 80 artifacts across 4 equipment slots
- **Community Contributions**: Submit artifact data with evidence (screenshots, videos)
- **Admin Moderation**: Review and approve community submissions
- **Verified Data**: Quality-controlled artifact information
- **Modern Stack**: Built with Next.js 15, PostgreSQL (Neon), and Vercel Blob storage

## Quick Start

### Prerequisites

- Node.js 18+
- Neon PostgreSQL database
- Vercel Blob storage (for file uploads)

### Setup

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd destinyrising
   npm install
   ```

2. **Environment Variables**
   Create `.env.local` based on `.env.local.example`:
   ```bash
   DATABASE_URL=postgresql://username:password@hostname/database_name
   BLOB_READ_WRITE_TOKEN=vercel_blob_token_here
   ADMIN_PASSWORD=your_admin_password_here
   ```

3. **Database Setup**
   Run the SQL scripts in your Neon database:
   ```bash
   # Create tables
   psql $DATABASE_URL -f database/schema.sql

   # Populate with initial data
   psql $DATABASE_URL -f database/migrate.sql
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Database Structure

- **artifacts**: Core artifact data (name, slot, set effects, verification status)
- **rollable_stats**: Statistical ranges for artifact attributes
- **artifact_submissions**: Community submissions awaiting review

## API Endpoints

- `GET /api/artifacts` - List and filter artifacts
- `PUT /api/artifacts` - Update artifact data (admin)
- `GET /api/artifacts/submissions` - List submissions
- `POST /api/artifacts/submissions` - Submit new data
- `PUT /api/artifacts/submissions/[id]` - Approve/reject submissions
- `GET /api/health` - Database health check

## Pages

- `/` - Homepage with project overview
- `/artifacts` - Browse all artifacts with filtering
- `/contribute/artifacts` - Submit artifact data
- `/admin/artifacts` - Admin panel for managing submissions

## Contributing

The system is designed for community contributions:

1. Visit `/contribute/artifacts` to submit artifact data
2. Provide set effects, stat ranges, and evidence
3. Admin team reviews and approves accurate submissions
4. Verified data becomes available to all users

## Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19, Tailwind CSS
- **Database**: PostgreSQL (Neon)
- **File Storage**: Vercel Blob
- **Deployment**: Vercel

## License

MIT License