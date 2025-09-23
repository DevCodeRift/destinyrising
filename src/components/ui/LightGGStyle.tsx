'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface LightGGStyleProps {
  className?: string;
}

export function LightGGStyle({ className = '' }: LightGGStyleProps) {
  const [allSectionsExpanded, setAllSectionsExpanded] = useState(true);

  return (
    <div className={`bg-gray-900 text-white min-h-screen ${className}`}>
      <div className="max-w-5xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 relative">
              <Image
                src="/assets/exotics/exotic_weapons/The_Chaperone/167x167-ChaperoneIcon.jpg"
                alt="NEW MALPAIS"
                width={80}
                height={80}
                className="rounded"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-2xl font-bold text-white">NEW MALPAIS</h1>
                <div className="w-6 h-4 bg-red-500 border border-white rounded-sm flex items-center justify-center">
                  <div className="w-3 h-2 bg-blue-500 relative">
                    <div className="absolute inset-0 bg-white" style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, white 1px, white 2px)`
                    }}></div>
                  </div>
                </div>
              </div>
              <div className="text-gray-300 text-sm mb-2">
                Exotic / ⚡ Kinetic / Pulse Rifle
              </div>
              <div className="text-gray-400 text-sm italic mb-4">
                &quot;Decide! Principles or power—you can&apos;t have both.&quot; —Spider
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-cyan-400 text-sm hover:text-cyan-300">
                  <div className="w-4 h-4 bg-cyan-400 rounded"></div>
                  <span>View in 3D</span>
                </button>
                <div className="flex items-center space-x-1 text-green-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Source: Rewards Pass</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle All Sections Button */}
        <div className="mb-6">
          <button
            onClick={() => setAllSectionsExpanded(!allSectionsExpanded)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            Toggle All Sections
          </button>
        </div>

        {/* Exotic Perks Section */}
        {allSectionsExpanded && (
          <div className="mb-8">
            <button className="flex items-center space-x-2 mb-4 text-white">
              <span className="text-white">▼</span>
              <h2 className="text-xl font-bold">Exotic Perks</h2>
            </button>

            <div className="space-y-4 ml-6">
              {/* Atomizing Rounds */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-400 rounded" style={{
                    background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 100%)'
                  }}></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">Atomizing Rounds</h3>
                  <p className="text-gray-300 text-sm">
                    Rounds fired embed themselves in targets. [Alternate Weapon Action] to detonate embedded rounds.
                  </p>
                </div>
              </div>

              {/* Suspending Blast */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                  <div className="w-8 h-8" style={{
                    background: 'conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)',
                    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                  }}></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">Suspending Blast</h3>
                  <p className="text-gray-300 text-sm">
                    Detonating a large number of rounds embedded in a single target suspends them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {allSectionsExpanded && (
          <div className="mb-8">
            <button className="flex items-center space-x-2 mb-4 text-white">
              <span className="text-white">▼</span>
              <h2 className="text-xl font-bold">Stats</h2>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ml-6">
              {/* Left Column Stats */}
              <div className="space-y-4">
                {/* Range */}
                <div className="flex items-center">
                  <div className="w-20 text-sm text-white">Range</div>
                  <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
                  <div className="flex-1 bg-gray-700 h-2 rounded-full mr-4 relative">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: '38%' }}>
                      <div className="absolute right-0 top-0 h-full bg-green-300 rounded-full" style={{ width: '18px' }}></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-white font-bold text-sm">38</div>
                </div>

                {/* Velocity */}
                <div className="flex items-center">
                  <div className="w-20 text-sm text-white">Velocity</div>
                  <div className="w-4 h-4 bg-gray-600 rounded-sm mr-2"></div>
                  <div className="flex-1 bg-gray-700 h-2 rounded-full mr-4">
                    <div className="bg-gray-600 h-full rounded-full" style={{ width: '59%' }}></div>
                  </div>
                  <div className="w-8 text-right text-white font-bold text-sm">59</div>
                </div>

                {/* Stability */}
                <div className="flex items-center">
                  <div className="w-20 text-sm text-white">Stability</div>
                  <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
                  <div className="flex-1 bg-gray-700 h-2 rounded-full mr-4 relative">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: '57%' }}>
                      <div className="absolute right-0 top-0 h-full bg-green-300 rounded-full" style={{ width: '15px' }}></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-white font-bold text-sm">57</div>
                </div>

                {/* Handling */}
                <div className="flex items-center">
                  <div className="w-20 text-sm text-white">Handling</div>
                  <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
                  <div className="flex-1 bg-gray-700 h-2 rounded-full mr-4 relative">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: '36%' }}>
                      <div className="absolute left-0 top-0 h-full bg-red-700 rounded-full" style={{ width: '5px' }}></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-white font-bold text-sm">36</div>
                </div>

                {/* Reload Speed */}
                <div className="flex items-center">
                  <div className="w-20 text-sm text-white">Reload Speed</div>
                  <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
                  <div className="flex-1 bg-gray-700 h-2 rounded-full mr-4 relative">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: '66%' }}>
                      <div className="absolute right-0 top-0 h-full bg-green-300 rounded-full" style={{ width: '18px' }}></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-white font-bold text-sm">66</div>
                </div>

                {/* Reload Time */}
                <div className="flex items-center">
                  <div className="w-20 text-sm text-white">Reload Time</div>
                  <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
                  <div className="flex-1 bg-gray-700 h-2 rounded-full mr-4">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <div className="w-16 text-right text-white font-bold text-sm">1.79s</div>
                </div>

                {/* Additional Stats */}
                <div className="space-y-2 mt-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Aim Assistance</span>
                    <span className="text-sm text-white">74</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Ammo Generation</span>
                    <span className="text-sm text-white">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Zoom</span>
                    <span className="text-sm text-white">17</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Airborne Effectiveness</span>
                    <span className="text-sm text-white">20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Recoil</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                      <span className="text-sm text-white font-bold">80</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Rounds Per Minute</span>
                    <span className="text-sm text-white">320</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Magazine</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                      <span className="text-sm text-white font-bold">36</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Perk Playground */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-white font-semibold">Perks</span>
                  </div>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-xs">
                    Expand ▲
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-xs">
                      Curated
                    </button>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {/* Row 1 */}
                    <div className="w-12 h-12 bg-gray-800 border border-orange-500 rounded flex items-center justify-center">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full" style={{
                        background: 'radial-gradient(circle, #fbbf24 20%, #f59e0b 80%)'
                      }}></div>
                    </div>
                    <div className="w-12 h-12 bg-gray-800 border border-orange-500 rounded flex items-center justify-center">
                      <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="w-12 h-12 bg-gray-800 border border-orange-500 rounded flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded"></div>
                    </div>
                    <div className="w-12 h-12 bg-gray-800 border border-orange-500 rounded flex items-center justify-center">
                      <div className="w-8 h-8" style={{
                        background: 'conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)',
                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                      }}></div>
                    </div>
                    <div className="w-12 h-12 bg-gray-800 border border-gray-600 rounded flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full opacity-50"></div>
                    </div>
                    <div className="w-12 h-12 bg-gray-800 border border-gray-600 rounded flex items-center justify-center">
                      <div className="w-6 h-8 bg-yellow-600 rounded"></div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-xs">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Credits */}
        <div className="mt-12 pt-4 border-t border-gray-700">
          <a href="#" className="text-cyan-400 text-sm hover:text-cyan-300">Credits</a>
        </div>
      </div>
    </div>
  );
}