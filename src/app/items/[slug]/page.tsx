import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { type Item } from '@/components/ui/ItemCard';

// Sample data - in a real app, this would come from the database
const sampleItems: Item[] = [
  {
    id: '1',
    name: 'Fatebringer',
    slug: 'fatebringer',
    description: 'A legendary hand cannon known for its precision and power. Delivers devastating damage to enemies.',
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
    description: 'An exotic rocket launcher that fires tracking rockets with explosive wolfpack rounds.',
    itemType: 'Rocket Launcher',
    rarity: 'exotic',
    element: 'solar',
    powerLevel: 1370,
    isCraftable: false,
  },
  {
    id: '4',
    name: 'Thorn',
    slug: 'thorn',
    description: 'An exotic hand cannon that deals poison damage over time.',
    itemType: 'Hand Cannon',
    rarity: 'exotic',
    element: 'void',
    powerLevel: 1365,
    isCraftable: false,
  },
];

// Sample stats data
const sampleStats = [
  { name: 'Impact', value: 84, maxValue: 100 },
  { name: 'Range', value: 46, maxValue: 100 },
  { name: 'Stability', value: 33, maxValue: 100 },
  { name: 'Handling', value: 36, maxValue: 100 },
  { name: 'Reload Speed', value: 34, maxValue: 100 },
  { name: 'Magazine', value: 12, maxValue: 20 },
];

// Sample perks data
const samplePerks = [
  {
    name: 'Precision Frame',
    description: 'Recoil pattern on this weapon is more predictable. Damage falloff on this weapon starts later and is more forgiving.',
    slot: 1,
    isIntrinsic: true,
  },
  {
    name: 'Explosive Payload',
    description: 'Projectiles create an area-of-effect detonation on impact.',
    slot: 2,
    isIntrinsic: false,
  },
  {
    name: 'Firefly',
    description: 'Precision kills with this weapon increase reload speed and cause the target to explode, dealing Solar damage to nearby enemies.',
    slot: 3,
    isIntrinsic: false,
  },
];

interface ItemDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ItemDetailPage({ params }: ItemDetailPageProps) {
  const item = sampleItems.find(item => item.slug === params.slug);

  if (!item) {
    notFound();
  }

  const getRarityClass = (rarity: string) => {
    const rarityMap: Record<string, string> = {
      common: 'destiny-rarity-common',
      uncommon: 'destiny-rarity-uncommon',
      rare: 'destiny-rarity-rare',
      legendary: 'destiny-rarity-legendary',
      exotic: 'destiny-rarity-exotic',
    };
    return rarityMap[rarity.toLowerCase()] || 'destiny-rarity-common';
  };

  const getElementClass = (element?: string) => {
    if (!element) return '';
    const elementMap: Record<string, string> = {
      arc: 'destiny-element-arc',
      solar: 'destiny-element-solar',
      void: 'destiny-element-void',
      stasis: 'destiny-element-stasis',
      kinetic: 'destiny-element-kinetic',
    };
    return elementMap[element.toLowerCase()] || '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-orange-400">Home</Link></li>
              <li>/</li>
              <li><Link href="/items" className="hover:text-orange-400">Items</Link></li>
              <li>/</li>
              <li className="text-white">{item.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Item Overview */}
            <div className="lg:col-span-1">
              <div className="destiny-card p-6 sticky top-8">
                {/* Item Image */}
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-800 mb-6 relative">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}

                  {/* Power Level Badge */}
                  {item.powerLevel && (
                    <div className="absolute top-4 right-4 bg-black/80 text-white text-lg font-bold px-3 py-2 rounded">
                      {item.powerLevel}
                    </div>
                  )}

                  {/* Element Icon */}
                  {item.element && (
                    <div className={`absolute top-4 left-4 w-8 h-8 ${getElementClass(item.element)}`}>
                      <ElementIcon element={item.element} />
                    </div>
                  )}
                </div>

                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{item.name}</h1>
                    <p className={`text-lg font-medium uppercase tracking-wider ${getRarityClass(item.rarity)}`}>
                      {item.rarity} {item.itemType}
                    </p>
                  </div>

                  {item.description && (
                    <p className="text-gray-300">{item.description}</p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.isCraftable && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                        </svg>
                        Craftable
                      </span>
                    )}
                    {item.isSunset && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Sunset
                      </span>
                    )}
                    {item.element && (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 ${getElementClass(item.element)}`}>
                        {item.element}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Item Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats */}
              <div className="destiny-card p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Stats</h2>
                <div className="space-y-4">
                  {sampleStats.map((stat) => (
                    <div key={stat.name} className="flex items-center">
                      <div className="w-24 text-sm text-gray-300 font-medium">
                        {stat.name}
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(stat.value / stat.maxValue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm font-bold text-white">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Perks */}
              <div className="destiny-card p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Perks & Traits</h2>
                <div className="space-y-4">
                  {samplePerks.map((perk, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{perk.name}</h3>
                        <div className="flex items-center space-x-2">
                          {perk.isIntrinsic && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-900 text-blue-200">
                              Intrinsic
                            </span>
                          )}
                          <span className="text-sm text-gray-400">Slot {perk.slot}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{perk.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lore (if available) */}
              {item.name === 'Fatebringer' && (
                <div className="destiny-card p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Lore</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 italic mb-4">
                      &quot;His name was Kabr. He wasn&apos;t my friend.&quot;
                    </p>
                    <p className="text-gray-300">
                      The Vault of Glass holds many secrets, and Fatebringer is one of its most coveted treasures.
                      This hand cannon has become legendary among Guardians for its devastating precision and
                      the explosive finales it provides to those who master its use.
                    </p>
                  </div>
                </div>
              )}

              {/* Source & Availability */}
              <div className="destiny-card p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Source & Availability</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Source:</span>
                    <span className="text-white font-medium">
                      {item.name === 'Fatebringer' ? 'Vault of Glass Raid' :
                       item.name === 'Gjallarhorn' ? 'Exotic Quest' :
                       'Various Activities'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Drop Rate:</span>
                    <span className="text-white font-medium">
                      {item.rarity === 'exotic' ? 'Very Rare' : 'Common'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Requirements:</span>
                    <span className="text-white font-medium">
                      {item.name === 'Fatebringer' ? 'Complete Vault of Glass' : 'None'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ElementIcon({ element }: { element: string }) {
  const icons: Record<string, React.ReactElement> = {
    arc: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 14l3-3 3 3m-6 4h12m-6-8V3m0 5L9 6m0 0L6 9m3-3l3 3"/>
      </svg>
    ),
    solar: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-9.5l-4.24 4.24m-6.01 6.01L2.5 21.5m16.24-4.24l-4.24-4.24m-6.01-6.01L2.5 2.5"/>
      </svg>
    ),
    void: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    stasis: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    kinetic: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
      </svg>
    ),
  };

  return icons[element.toLowerCase()] || null;
}