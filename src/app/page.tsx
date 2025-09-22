import Link from 'next/link';
import { HeroSection } from '@/components/ui/HeroSection';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { ItemCard, type Item } from '@/components/ui/ItemCard';

// Sample data for testing
const sampleItems: Item[] = [
  {
    id: '1',
    name: 'Fatebringer',
    slug: 'fatebringer',
    description: 'A legendary hand cannon known for its precision and power.',
    itemType: 'Hand Cannon',
    rarity: 'legendary',
    element: 'arc',
    powerLevel: 1350,
    isCraftable: true,
  },
  {
    id: '2',
    name: 'Gjallarhorn',
    slug: 'gjallarhorn',
    description: 'An exotic rocket launcher that fires tracking rockets.',
    itemType: 'Rocket Launcher',
    rarity: 'exotic',
    element: 'solar',
    powerLevel: 1370,
    isCraftable: false,
  },
  {
    id: '3',
    name: 'Vision of Confluence',
    slug: 'vision-of-confluence',
    description: 'A scout rifle with solar damage capabilities.',
    itemType: 'Scout Rifle',
    rarity: 'legendary',
    element: 'solar',
    powerLevel: 1340,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />

        {/* Featured Items Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Featured Items
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Discover the most powerful and sought-after weapons and gear in Destiny Rising.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/items"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 destiny-glow"
              >
                View All Items
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Everything You Need
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Comprehensive tools and data to help you master Destiny Rising.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="destiny-card p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Advanced Search</h3>
                <p className="text-gray-300">
                  Find exactly what you&apos;re looking for with powerful filtering and search capabilities.
                </p>
              </div>

              <div className="destiny-card p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Detailed Stats</h3>
                <p className="text-gray-300">
                  Complete statistics, perks, and performance data for every item in the game.
                </p>
              </div>

              <div className="destiny-card p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Collections</h3>
                <p className="text-gray-300">
                  Organize and track your favorite items with custom collections and wishlists.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
