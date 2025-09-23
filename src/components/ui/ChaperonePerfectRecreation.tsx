'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface ChaperonePerfectRecreationProps {
  className?: string;
}

export function ChaperonePerfectRecreation({ className = '' }: ChaperonePerfectRecreationProps) {
  const [selectedPanel, setSelectedPanel] = useState<'trait1' | 'trait2' | 'catalyst' | null>(null);

  return (
    <div className={`bg-black text-white relative ${className}`}>
      <div className="flex">
        {/* Left Panel - Exact Recreation */}
        <div className="w-1/2 min-h-[700px]">
          {/* Header - Exact match to Header.png */}
          <div className="relative">
            {/* Golden background with diamond pattern */}
            <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 relative overflow-hidden">
              {/* Diamond pattern overlay */}
              <div className="absolute inset-0 opacity-20">
                <div className="flex justify-center space-x-4 pt-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-white transform rotate-45 opacity-30"></div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-white mb-4">The Chaperone</h1>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-purple-700 rounded-sm flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded-sm"></div>
                      </div>
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </div>
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center border-2 border-gray-600">
                        <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
                      </div>
                      <span className="text-black font-bold text-lg ml-4">SHOTGUN</span>
                    </div>

                    <div className="mb-2">
                      <div className="text-black text-lg font-bold">BASE POWER</div>
                      <div className="text-black text-4xl font-bold">
                        ◇4490~5030
                      </div>
                    </div>
                  </div>

                  {/* Weapon Image */}
                  <div className="flex-shrink-0 ml-8">
                    <div className="w-80 h-32 flex items-center justify-center">
                      <Image
                        src="/assets/exotics/exotic_weapons/The_Chaperone/167x167-ChaperoneIcon.jpg"
                        alt="The Chaperone"
                        width={200}
                        height={120}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gear Level Badge */}
            <div className="bg-gray-900 px-6 py-3">
              <div className="flex items-center">
                <span className="text-white text-lg font-bold mr-4">GEAR LEVEL</span>
                <div className="bg-gray-700 px-4 py-2 rounded border-2 border-gray-600">
                  <span className="text-white text-2xl font-bold">70</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="bg-gray-900 p-6">
            {/* Traits & Perks */}
            <div className="mb-8">
              <h3 className="text-white text-sm font-bold mb-4">Traits & Perks</h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedPanel(selectedPanel === 'trait1' ? null : 'trait1')}
                  className="transition-all hover:scale-105"
                >
                  <Image
                    src="/assets/exotics/exotic_weapons/The_Chaperone/IntrinsicTrait.png"
                    alt="Intrinsic Trait"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </button>
                <button
                  onClick={() => setSelectedPanel(selectedPanel === 'trait2' ? null : 'trait2')}
                  className="transition-all hover:scale-105"
                >
                  <Image
                    src="/assets/exotics/exotic_weapons/The_Chaperone/Perk1.png"
                    alt="Perk 1"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </button>
              </div>
            </div>

            {/* Catalyst */}
            <div className="mb-8">
              <h3 className="text-white text-sm font-bold mb-4">Catalyst</h3>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPanel(selectedPanel === 'catalyst' ? null : 'catalyst')}
                    className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center transition-all hover:scale-105 ${
                      i === 4
                        ? 'bg-yellow-600/30 border-yellow-500 shadow-lg shadow-yellow-500/25'
                        : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className={`w-6 h-6 transform rotate-45 ${i === 4 ? 'bg-yellow-500' : 'bg-gray-600'}`}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats - Exact layout from screenshots */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">DPS</span>
                  <span className="text-white font-bold">737</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Precis. Bonus</span>
                  <span className="text-white font-bold">1.6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Magazine Cap.</span>
                  <span className="text-white font-bold">6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Max Ammo</span>
                  <span className="text-white font-bold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Rate of Fire</span>
                  <span className="text-white font-bold">65</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">DMG</span>
                  <span className="text-white font-bold">1100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Reload Speed</span>
                  <span className="text-white font-bold">37</span>
                </div>
              </div>

              {/* Stat Bars */}
              <div className="space-y-2 mt-6">
                {[
                  { label: 'Range', value: 74 },
                  { label: 'Stability', value: 28 },
                  { label: 'Handling', value: 72 }
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{stat.label}</span>
                      <span className="text-white font-bold">{stat.value}</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full">
                      <div
                        className="bg-white h-2 rounded-full"
                        style={{ width: `${stat.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-8 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Eligible ×2</span>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full border border-gray-600"></div>
                  <div className="w-8 h-8 bg-orange-600 rounded-full border border-gray-600"></div>
                </div>
              </div>
              <div className="text-center text-gray-400 text-sm mt-3">Unacquired</div>
            </div>
          </div>
        </div>

        {/* Right Panel - Information Overlays */}
        {selectedPanel && (
          <div className="w-1/2 bg-gray-800 border-l border-gray-700">
            {selectedPanel === 'trait1' && (
              <div className="p-8">
                <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-500/50 rounded-lg p-8">
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-2xl font-bold text-yellow-400">PRECISION SLUG</h3>
                    <span className="text-xs text-yellow-500 font-bold uppercase tracking-wider px-3 py-1 bg-yellow-900/30 rounded">
                      INTRINSIC TRAIT
                    </span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">Fires a single-slug precision round.</p>
                </div>
              </div>
            )}

            {selectedPanel === 'trait2' && (
              <div className="p-8">
                <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-500/50 rounded-lg p-8">
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-2xl font-bold text-yellow-400">THE ROADBORN</h3>
                    <span className="text-xs text-yellow-500 font-bold uppercase tracking-wider px-3 py-1 bg-yellow-900/30 rounded">
                      PERK/DAMAGE
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-400 font-bold text-xl">◇ Power +800</span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Precision kills briefly increase the weapon&apos;s handling, range, and precision damage.
                  </p>
                </div>
              </div>
            )}

            {selectedPanel === 'catalyst' && (
              <div className="p-8">
                <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-500/50 rounded-lg p-8">
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-2xl font-bold text-yellow-400">THE CHAPERONE CATALYST</h3>
                    <span className="text-xs text-yellow-500 font-bold uppercase tracking-wider px-3 py-1 bg-yellow-900/30 rounded">
                      ATTACHMENT/CATALYST
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-400 font-bold text-xl">◇ Power +1000</span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Precision final blows automatically reload this weapon from reserves.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}