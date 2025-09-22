# Destiny Rising Database

A comprehensive database and web application for cataloging and exploring all weapons, armor, artifacts, and resources in the game "Destiny Rising". Built with a modern tech stack and inspired by Light.gg.

## 🚀 Features

- **Complete Item Database**: Weapons, armor, artifacts, resources, and maps
- **Advanced Search & Filtering**: Find exactly what you're looking for
- **Destiny 2 Themed UI**: Beautiful dark theme with rarity colors and visual effects
- **Admin Content Management**: Easy-to-use interface for adding and managing items
- **Image Storage**: Integrated with Vercel Blob for scalable image hosting
- **Responsive Design**: Works perfectly on desktop and mobile
- **Fast Performance**: Built with Next.js 15 and optimized for speed

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Destiny theme
- **Database**: Vercel Postgres with Drizzle ORM
- **Image Storage**: Vercel Blob
- **Deployment**: Vercel Platform

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin interface for content management
│   ├── items/             # Item listing and detail pages
│   ├── weapons/           # Weapon-specific pages
│   └── api/               # API routes for uploads and data
├── components/
│   ├── admin/             # Admin-specific components
│   └── ui/                # Reusable UI components
├── lib/
│   ├── db/                # Database schema and utilities
│   └── storage/           # Image storage utilities
└── types/                 # TypeScript type definitions
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd destinyrising
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```

4. **Set up the database**
   ```bash
   # Generate database schema
   npm run db:generate

   # Run migrations
   npm run db:migrate

   # Seed initial data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses a comprehensive schema designed for game item management:

- **Items**: Main table for all game items
- **Categories**: Weapons, Armor, Artifacts, etc.
- **Item Types**: Hand Cannons, Helmets, etc.
- **Rarities**: Common, Uncommon, Rare, Legendary, Exotic
- **Elements**: Arc, Solar, Void, Stasis, Kinetic
- **Stats**: Item statistics and performance data
- **Perks**: Weapon and armor perks/traits
- **Collections**: Curated item collections

## 🎨 Design System

### Rarity Colors
- **Common**: `#FFFFFF`
- **Uncommon**: `#4AE54A`
- **Rare**: `#5EA3F2`
- **Legendary**: `#B447F2`
- **Exotic**: `#F2E55E`

### Element Colors
- **Arc**: `#80CCFF`
- **Solar**: `#FF8000`
- **Void**: `#B866FF`
- **Stasis**: `#4D88FF`
- **Kinetic**: `#FFFFFF`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Drizzle Studio

## 📱 Admin Interface

Access the admin interface at `/admin` to:

- Add new items with images
- Manage categories and item types
- Upload and organize images
- View statistics and analytics

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on every push

3. **Set up Vercel Postgres**
   - Add Vercel Postgres to your project
   - Copy connection strings to environment variables
   - Run migrations on production

4. **Set up Vercel Blob**
   - Add Vercel Blob to your project
   - Copy the read/write token to environment variables

### Environment Variables

Required environment variables for production:

```bash
# Database
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NO_SSL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# Image Storage
BLOB_READ_WRITE_TOKEN=
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational and fan purposes. It is not affiliated with Bungie, NetEase Games, or the official Destiny franchise.

## 🙏 Acknowledgments

- Inspired by [Light.gg](https://light.gg) for Destiny 2
- Built with love for the Destiny community
- Special thanks to the Destiny Rising development team
