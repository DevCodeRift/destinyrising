'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface LightGGStyleProps {
  className?: string;
}

export function LightGGStyle({ className = '' }: LightGGStyleProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'perks' | 'lore'>('overview');

  const stats = [
    { name: 'Impact', value: 33, maxValue: 100, color: 'bg-orange-500' },
    { name: 'Range', value: 74, maxValue: 100, color: 'bg-blue-500' },
    { name: 'Stability', value: 53, maxValue: 100, color: 'bg-green-500' },
    { name: 'Handling', value: 72, maxValue: 100, color: 'bg-purple-500' },
    { name: 'Reload Speed', value: 37, maxValue: 100, color: 'bg-yellow-500' },
    { name: 'Rounds Per Minute', value: 65, maxValue: 120, color: 'bg-red-500' },
  ];

  const getStatWidth = (value: number, maxValue: number) => {
    return (value / maxValue) * 100;
  };

  return (
    <div className={`bg-gray-50 min-h-screen ${className}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Image
                src="/assets/exotics/exotic_weapons/The_Chaperone/167x167-ChaperoneIcon.jpg"
                alt="The Chaperone"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">The Chaperone</h1>
              <div className="flex items-center space-x-2 mt-1">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Exotic
                </span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  Shotgun
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Kinetic
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-lg max-w-3xl">
            &quot;My father had a saying: &apos;If you&apos;re gonna play cards with the devil, you&apos;d better know whose deal it is.&apos;&quot;
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'perks', label: 'Perks & Traits' },
              { id: 'lore', label: 'Lore' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as 'overview' | 'perks' | 'lore')}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {selectedTab === 'overview' && (
              <>
                {/* Stats Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Stats</h2>
                  <div className="space-y-4">
                    {stats.map((stat) => (
                      <div key={stat.name} className="flex items-center">
                        <div className="w-24 text-sm font-medium text-gray-700 flex-shrink-0">
                          {stat.name}
                        </div>
                        <div className="flex-1 mx-4">
                          <div className="bg-gray-200 rounded-full h-3 relative overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${stat.color}`}
                              style={{ width: `${getStatWidth(stat.value, stat.maxValue)}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-12 text-right text-sm font-bold text-gray-900">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Information</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Power Level</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">4490-5030</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Gear Level</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">70</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Magazine Size</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">6</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Max Ammo</dt>
                      <dd className="mt-1 text-lg font-semibold text-gray-900">24</dd>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedTab === 'perks' && (
              <div className="space-y-4">
                {/* Intrinsic Trait */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="/assets/exotics/exotic_weapons/The_Chaperone/IntrinsicTrait.png"
                        alt="Precision Slug"
                        width={48}
                        height={48}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">Precision Slug</h3>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          Intrinsic
                        </span>
                      </div>
                      <p className="text-gray-600">
                        Fires a single-slug precision round.
                      </p>
                    </div>
                  </div>
                </div>

                {/* The Roadborn */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src="/assets/exotics/exotic_weapons/The_Chaperone/Perk1.png"
                        alt="The Roadborn"
                        width={48}
                        height={48}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">The Roadborn</h3>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          Exotic Perk
                        </span>
                      </div>
                      <p className="text-gray-600">
                        Precision kills briefly increase the weapon&apos;s handling, range, and precision damage.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Catalyst */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-yellow-500 rounded transform rotate-45"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">The Chaperone Catalyst</h3>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                          Catalyst
                        </span>
                      </div>
                      <p className="text-gray-600">
                        Precision final blows automatically reload this weapon from reserves.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'lore' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Lore</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    &quot;My father had a saying: &apos;If you&apos;re gonna play cards with the devil, you&apos;d better know whose deal it is.&apos;&quot;
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The Chaperone represents more than just firepower - it&apos;s a symbol of precision, discipline, and the fine line between order and chaos. Every Guardian who wields this weapon carries forward a legacy of calculated risk and unwavering determination.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    In the hands of a skilled marksman, The Chaperone becomes an extension of will itself, turning each precise shot into a statement of intent that echoes across the battlefield.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Weapon Image */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Image
                  src="/assets/exotics/exotic_weapons/The_Chaperone/167x167-ChaperoneIcon.jpg"
                  alt="The Chaperone"
                  width={200}
                  height={200}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">The Chaperone</h3>
                <p className="text-sm text-gray-500">Exotic Shotgun</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">DPS</span>
                  <span className="text-sm font-medium text-gray-900">737</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Precision Bonus</span>
                  <span className="text-sm font-medium text-gray-900">1.6x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Damage</span>
                  <span className="text-sm font-medium text-gray-900">1100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Rate of Fire</span>
                  <span className="text-sm font-medium text-gray-900">65 RPM</span>
                </div>
              </div>
            </div>

            {/* Sources */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Exotic Engram</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Random Drop</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Shifting Gates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}