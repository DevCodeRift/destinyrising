# Database Setup Instructions

## Environment Variables

Create a `.env.local` file based on `.env.local.example`:

```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@hostname/database_name

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_token_here

# Optional: Admin authentication
ADMIN_PASSWORD=your_admin_password_here
```

## Database Setup

1. **Create Database Schema**

   Run the schema creation script in your Neon console or via psql:
   ```bash
   psql $DATABASE_URL -f database/schema.sql
   ```

2. **Migrate Initial Data**

   Run the migration script to populate with the 80 artifacts:
   ```bash
   psql $DATABASE_URL -f database/migrate.sql
   ```

3. **Verify Setup**

   Check that everything was created correctly:
   ```sql
   -- Check tables exist
   \dt

   -- Check artifact counts
   SELECT slot, COUNT(*) as count FROM artifacts GROUP BY slot ORDER BY slot;

   -- Should show:
   -- slot | count
   -- -----+-------
   --    1 |    20
   --    2 |    20
   --    3 |    20
   --    4 |    20
   ```

## Vercel Blob Storage

1. Enable Blob storage in your Vercel project
2. Get your `BLOB_READ_WRITE_TOKEN` from Vercel dashboard
3. Add it to your `.env.local` file

## API Endpoints

After setup, your API endpoints will be:

- `GET /api/artifacts` - List artifacts with filtering
- `PUT /api/artifacts` - Update artifact data
- `GET /api/artifacts/submissions` - List submissions
- `POST /api/artifacts/submissions` - Create new submission
- `PUT /api/artifacts/submissions/[id]` - Approve/reject submission
- `DELETE /api/artifacts/submissions/[id]` - Delete submission

## Migration from JSON

The system has been migrated from JSON file storage to PostgreSQL database with Vercel Blob storage for images. The previous JSON files are no longer used.