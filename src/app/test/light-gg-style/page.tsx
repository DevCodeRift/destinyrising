'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { LightGGStyle } from '@/components/ui/LightGGStyle';
import { DynamicWeaponDisplay } from '@/components/ui/DynamicWeaponDisplay';
import { WeaponData } from '@/components/ui/WeaponBuilder';

function LightGGStyleContent() {
  const searchParams = useSearchParams();
  const weaponId = searchParams.get('weapon');
  const [weaponData, setWeaponData] = useState<WeaponData | null>(null);
  const [savedWeapons, setSavedWeapons] = useState<WeaponData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('destinyrising-weapons');
    if (saved) {
      try {
        const weapons = JSON.parse(saved);
        setSavedWeapons(weapons);

        if (weaponId) {
          const weapon = weapons.find((w: WeaponData) => w.id === weaponId);
          if (weapon) {
            setWeaponData(weapon);
          }
        }
      } catch (error) {
        console.error('Failed to parse saved weapons:', error);
      }
    }
  }, [weaponId]);

  // If a specific weapon is requested and found, show it
  if (weaponData) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a
                href="/test/light-gg-style"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Static Demo
              </a>
              <div className="h-4 w-px bg-gray-300"></div>
              <a
                href="/test/weapon-builder"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Edit in Builder
              </a>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Dynamic Weapon: {weaponData.name}</h1>
          </div>
        </div>
        <DynamicWeaponDisplay weaponData={weaponData} />
      </div>
    );
  }

  // Show weapon selection if there are saved weapons but no specific one requested
  if (savedWeapons.length > 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-1">
          <div className="max-w-7xl mx-auto p-4">
            {/* Page Header */}
            <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">Light.gg Style Interface</h1>
                  <p className="text-gray-600">
                    Choose a custom weapon to display or view the static demo below.
                  </p>
                </div>
                <a
                  href="/test/weapon-builder"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Create New Weapon
                </a>
              </div>
            </div>

            {/* Saved Weapons Selection */}
            <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Custom Weapons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedWeapons.map((weapon) => (
                  <a
                    key={weapon.id}
                    href={`/test/light-gg-style?weapon=${weapon.id}`}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        {weapon.weaponImage ? (
                          <img
                            src={weapon.weaponImage}
                            alt={weapon.name}
                            className="w-12 h-12 object-contain rounded"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">No Image</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 truncate">
                          {weapon.name}
                        </h3>
                        <p className="text-sm text-gray-500">{weapon.type} {weapon.subtype}</p>
                        <p className="text-xs text-gray-400">{weapon.element}</p>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          &quot;{weapon.quote}&quot; {weapon.author && `—${weapon.author}`}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 text-right">
                      <span className="text-blue-600 text-sm group-hover:text-blue-700">
                        View Weapon →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Static Demo Header */}
            <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Static Demo</h2>
              <p className="text-gray-600">
                This is the original static demonstration showing the NEW MALPAIS pulse rifle.
              </p>
            </div>

            {/* Interface */}
            <LightGGStyle />

            {/* Features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Clean Design</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Light background with card-based layout
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Professional typography and spacing
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Subtle shadows and modern aesthetics
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Tabbed navigation for content organization
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Interactive Features</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Overview, Perks, and Lore tabs
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Animated stat bars with colors
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Responsive grid layout
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Organized information hierarchy
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Content Organization</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Detailed stats with visual progress bars
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Perk cards with authentic icons
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Sidebar with quick stats and sources
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Lore section with readable formatting
                </li>
              </ul>
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Light.gg Inspired Design</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Design Principles</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Clean, minimalist aesthetic</li>
                  <li>• Light background for readability</li>
                  <li>• Card-based information organization</li>
                  <li>• Professional color scheme</li>
                  <li>• Clear visual hierarchy</li>
                  <li>• Responsive and accessible</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Tabbed content navigation</li>
                  <li>• Color-coded stat visualization</li>
                  <li>• Authentic weapon icons and assets</li>
                  <li>• Organized perk display</li>
                  <li>• Quick stats sidebar</li>
                  <li>• Source information display</li>
                </ul>
              </div>
            </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Default static demo when no saved weapons
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-4">
          {/* Page Header */}
          <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Light.gg Style Interface</h1>
                <p className="text-gray-600">
                  Clean, modern weapon display inspired by light.gg&apos;s design patterns with card-based layout and professional styling.
                </p>
              </div>
              <a
                href="/test/weapon-builder"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Create Custom Weapon
              </a>
            </div>
          </div>

          {/* Interface */}
          <LightGGStyle />

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Clean Design</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Light background with card-based layout
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Professional typography and spacing
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Subtle shadows and modern aesthetics
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Tabbed navigation for content organization
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Interactive Features</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Overview, Perks, and Lore tabs
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Animated stat bars with colors
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Responsive grid layout
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Organized information hierarchy
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Content Organization</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Detailed stats with visual progress bars
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Perk cards with authentic icons
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Sidebar with quick stats and sources
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Lore section with readable formatting
                </li>
              </ul>
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Light.gg Inspired Design</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Design Principles</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Clean, minimalist aesthetic</li>
                  <li>• Light background for readability</li>
                  <li>• Card-based information organization</li>
                  <li>• Professional color scheme</li>
                  <li>• Clear visual hierarchy</li>
                  <li>• Responsive and accessible</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Tabbed content navigation</li>
                  <li>• Color-coded stat visualization</li>
                  <li>• Authentic weapon icons and assets</li>
                  <li>• Organized perk display</li>
                  <li>• Quick stats sidebar</li>
                  <li>• Source information display</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LightGGStyleTestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LightGGStyleContent />
    </Suspense>
  );
}