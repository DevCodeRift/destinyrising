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
          {/* Header - Exact 1:1 recreation of Header.png */}
          <div className="relative">
            {/* Golden background - exact match */}
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 relative h-80">
              {/* Diamond pattern at top - exact positioning */}
              <div className="absolute top-4 left-0 right-0 flex justify-center space-x-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-white/40 transform rotate-45"></div>
                ))}
              </div>

              {/* Content positioning exactly like Header.png */}
              <div className="relative pt-16 px-8 h-full flex">
                {/* Left side content */}
                <div className="flex-1">
                  {/* "The Chaperone" title */}
                  <h1 className="text-5xl font-bold text-white mb-6">The Chaperone</h1>

                  {/* Icons and SHOTGUN - exact positioning */}
                  <div className="flex items-center space-x-4 mb-12">
                    {/* Purple rectangle icon */}
                    <div className="w-12 h-10 bg-purple-700 rounded-lg flex items-center justify-center">
                      <div className="text-white text-xs font-bold">III</div>
                    </div>

                    {/* Blue circle icon */}
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white rounded-full"></div>
                    </div>

                    {/* Gray circle with X */}
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-400">
                      <div className="text-black text-lg font-bold">×</div>
                    </div>

                    <span className="text-white font-bold text-xl ml-2">SHOTGUN</span>
                  </div>

                  {/* BASE POWER section - exact positioning */}
                  <div className="absolute bottom-16 left-8">
                    <div className="text-white/80 text-lg font-bold mb-2">BASE POWER</div>
                    <div className="text-white text-5xl font-bold flex items-center">
                      <span className="mr-2">◇</span>4490~5030
                    </div>
                  </div>
                </div>

                {/* Right side - weapon image */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative">
                    <Image
                      src="/assets/exotics/exotic_weapons/The_Chaperone/167x167-ChaperoneIcon.jpg"
                      alt="The Chaperone"
                      width={300}
                      height={150}
                      className="object-contain"
                      priority
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Gear Level section - exact match */}
            <div className="bg-gray-900 h-16 flex items-center px-8">
              <span className="text-white text-xl font-bold mr-8">GEAR LEVEL</span>
              <div className="bg-transparent border-2 border-gray-500 px-4 py-1 rounded">
                <span className="text-white text-2xl font-bold">70</span>
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
                    onError={(e) => {
                      // Fallback to a golden circle if image fails to load
                      e.currentTarget.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center border-2 border-yellow-400';
                      fallback.innerHTML = '<div class="w-6 h-6 bg-yellow-300 rounded-full"></div>';
                      e.currentTarget.parentNode?.appendChild(fallback);
                    }}
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
                    onError={(e) => {
                      // Fallback to a golden circle if image fails to load
                      e.currentTarget.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center border-2 border-yellow-400';
                      fallback.innerHTML = '<div class="w-6 h-6 bg-yellow-300 rounded-full"></div>';
                      e.currentTarget.parentNode?.appendChild(fallback);
                    }}
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