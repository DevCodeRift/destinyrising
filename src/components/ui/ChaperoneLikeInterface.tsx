'use client';

import React, { useState } from 'react';

interface ChaperoneLikeInterfaceProps {
  className?: string;
}

export function ChaperoneLikeInterface({ className = '' }: ChaperoneLikeInterfaceProps) {
  const [selectedPanel, setSelectedPanel] = useState<'trait1' | 'trait2' | 'catalyst' | null>(null);

  return (
    <div className={`bg-black text-white relative ${className}`}>
      {/* Main Interface */}
      <div className="flex">
        {/* Left Panel - Weapon Details */}
        <div className="w-1/2 min-h-[600px]">
          {/* Golden Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-4 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Weapon Type Icons */}
                <div className="w-16 h-16 bg-black/20 rounded-lg flex items-center justify-center">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">The Chaperone</h1>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-purple-600 rounded-sm"></div>
                      <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                      <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                    </div>
                    <span className="text-black font-bold text-sm">SHOTGUN</span>
                  </div>
                </div>
              </div>
              <div className="text-right text-black">
                <div className="text-2xl font-bold">
                  ◇4490~5030
                </div>
                <div className="text-sm font-bold">BASE POWER</div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="bg-gray-900 p-6">
            {/* Weapon Image */}
            <div className="relative bg-gray-800 rounded-lg mb-6 h-48 flex items-center justify-center border border-gray-700">
              <div className="text-6xl text-gray-600">🔫</div>

              {/* Gear Level Badge */}
              <div className="absolute top-4 right-4 bg-black text-white px-3 py-2 rounded">
                <div className="text-xs font-bold">GEAR LEVEL</div>
                <div className="text-xl font-bold text-center bg-gray-700 px-2 py-1 rounded mt-1">70</div>
              </div>
            </div>

            {/* Traits & Perks */}
            <div className="mb-6">
              <h3 className="text-white text-sm font-bold mb-3">Traits & Perks</h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedPanel(selectedPanel === 'trait1' ? null : 'trait1')}
                  className="w-12 h-12 bg-yellow-600 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all border-2 border-yellow-400"
                >
                  <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
                </button>
                <button
                  onClick={() => setSelectedPanel(selectedPanel === 'trait2' ? null : 'trait2')}
                  className="w-12 h-12 bg-yellow-600 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all border-2 border-yellow-400"
                >
                  <div className="w-6 h-6 bg-yellow-300 rounded-full"></div>
                </button>
              </div>
            </div>

            {/* Catalyst */}
            <div className="mb-6">
              <h3 className="text-white text-sm font-bold mb-3">Catalyst</h3>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPanel(selectedPanel === 'catalyst' ? null : 'catalyst')}
                    className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all hover:scale-105 ${
                      i === 4
                        ? 'bg-yellow-600/30 border-yellow-500 shadow-lg shadow-yellow-500/25'
                        : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <div className={`w-4 h-4 transform rotate-45 ${i === 4 ? 'bg-yellow-500' : 'bg-gray-600'}`}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2">
              {[
                { label: 'DPS', value: '737' },
                { label: 'Precis. Bonus', value: '1.6' },
                { label: 'Magazine Cap.', value: '6' },
                { label: 'Max Ammo', value: '24' },
                { label: 'Rate of Fire', value: '65' },
                { label: 'DMG', value: '1100' },
                { label: 'Reload Speed', value: '37' }
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{stat.label}</span>
                  <span className="text-white font-bold">{stat.value}</span>
                </div>
              ))}

              {/* Stat Bars */}
              <div className="space-y-2 mt-4">
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
                    <div className="w-full bg-gray-700 h-1 rounded-full">
                      <div
                        className="bg-white h-1 rounded-full"
                        style={{ width: `${stat.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Eligible ×2</span>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                  <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
                </div>
              </div>
              <div className="text-center text-gray-400 text-sm mt-2">Unacquired</div>
            </div>
          </div>
        </div>

        {/* Right Panel Overlays */}
        {selectedPanel && (
          <div className="w-1/2 bg-gray-800 border-l border-gray-700">
            {selectedPanel === 'trait1' && (
              <div className="p-6">
                <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-500/50 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-yellow-400">PRECISION SLUG</h3>
                    <span className="text-xs text-yellow-500 font-bold uppercase tracking-wider">
                      INTRINSIC TRAIT
                    </span>
                  </div>
                  <p className="text-gray-300">Fires a single-slug precision round.</p>
                </div>
              </div>
            )}

            {selectedPanel === 'trait2' && (
              <div className="p-6">
                <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-500/50 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-yellow-400">THE ROADBORN</h3>
                    <span className="text-xs text-yellow-500 font-bold uppercase tracking-wider">
                      PERK/DAMAGE
                    </span>
                  </div>
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-400 font-bold text-lg mr-2">◇ Power +800</span>
                  </div>
                  <p className="text-gray-300">Precision kills briefly increase the weapon&apos;s handling, range, and precision damage.</p>
                </div>
              </div>
            )}

            {selectedPanel === 'catalyst' && (
              <div className="p-6">
                <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-500/50 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-yellow-400">THE CHAPERONE CATALYST</h3>
                    <span className="text-xs text-yellow-500 font-bold uppercase tracking-wider">
                      ATTACHMENT/CATALYST
                    </span>
                  </div>
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-400 font-bold text-lg mr-2">◇ Power +1000</span>
                  </div>
                  <p className="text-gray-300">Precision final blows automatically reload this weapon from reserves.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}