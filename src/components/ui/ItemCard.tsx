import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface Item {
  id: string;
  name: string;
  slug: string;
  description?: string;
  itemType: string;
  rarity: string;
  element?: string;
  powerLevel?: number;
  imageUrl?: string;
  isCraftable?: boolean;
  isSunset?: boolean;
}

interface ItemCardProps {
  item: Item;
  showDetails?: boolean;
  className?: string;
}

export function ItemCard({ item, showDetails = true, className = '' }: ItemCardProps) {
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

  const getGlowClass = (rarity: string) => {
    if (rarity.toLowerCase() === 'exotic') return 'destiny-glow-exotic';
    if (rarity.toLowerCase() === 'legendary') return 'destiny-glow-legendary';
    return '';
  };

  return (
    <Link href={`/items/${item.slug}`} className={className}>
      <div
        className={`
          destiny-card p-4 h-full flex flex-col relative overflow-hidden group
          ${getRarityClass(item.rarity)} ${getGlowClass(item.rarity)}
        `}
      >
        {/* Rarity border glow effect */}
        <div
          className={`
            absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300
            ${item.rarity.toLowerCase() === 'exotic' ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500' : ''}
            ${item.rarity.toLowerCase() === 'legendary' ? 'bg-gradient-to-br from-purple-400 via-purple-600 to-purple-800' : ''}
            ${item.rarity.toLowerCase() === 'rare' ? 'bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800' : ''}
          `}
        />

        {/* Item Image */}
        <div className="relative mb-3 flex-shrink-0">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-800 relative">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Power Level Badge */}
            {item.powerLevel && (
              <div className="absolute top-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                {item.powerLevel}
              </div>
            )}

            {/* Element Icon */}
            {item.element && (
              <div className={`absolute top-2 left-2 w-6 h-6 ${getElementClass(item.element)}`}>
                <ElementIcon element={item.element} />
              </div>
            )}
          </div>
        </div>

        {/* Item Info */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-orange-400 transition-colors">
              {item.name}
            </h3>
            <div className="flex items-center space-x-1 ml-2">
              {item.isCraftable && (
                <div className="w-4 h-4 text-green-400 flex-shrink-0" title="Craftable">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                  </svg>
                </div>
              )}
              {item.isSunset && (
                <div className="w-4 h-4 text-red-400 flex-shrink-0" title="Sunset">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-400 mb-2">
            {item.itemType}
          </div>

          {showDetails && item.description && (
            <p className="text-sm text-gray-300 line-clamp-2 flex-1">
              {item.description}
            </p>
          )}

          {/* Rarity indicator */}
          <div className="mt-auto pt-2">
            <div className={`text-xs font-medium uppercase tracking-wider ${getRarityClass(item.rarity)}`}>
              {item.rarity}
            </div>
          </div>
        </div>
      </div>
    </Link>
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