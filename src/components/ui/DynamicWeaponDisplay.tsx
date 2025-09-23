'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { WeaponData } from './WeaponBuilder';

interface DynamicWeaponDisplayProps {
  weaponData: WeaponData;
  className?: string;
}

export function DynamicWeaponDisplay({ weaponData, className = '' }: DynamicWeaponDisplayProps) {
  const [allSectionsExpanded, setAllSectionsExpanded] = useState(true);

  const getStatColor = (value: number) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatColorLight = (value: number) => {
    if (value >= 70) return 'bg-green-300';
    if (value >= 40) return 'bg-yellow-300';
    return 'bg-red-300';
  };

  const hasBoost = (value: number) => value >= 50;

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'Solar': return '🔥';
      case 'Arc': return '⚡';
      case 'Void': return '🌌';
      case 'Stasis': return '❄️';
      default: return '⚡';
    }
  };

  return (
    <div className={`bg-gray-900 text-white min-h-screen ${className}`}>
      <div className="max-w-5xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 relative">
              {weaponData.weaponImage ? (
                <Image
                  src={weaponData.weaponImage}
                  alt={weaponData.name}
                  width={80}
                  height={80}
                  className="rounded"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-400">No Image</span>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-2xl font-bold text-white">{weaponData.name || 'Unnamed Weapon'}</h1>
                <div className="w-6 h-4 bg-red-500 border border-white rounded-sm flex items-center justify-center">
                  <div className="w-3 h-2 bg-blue-500 relative">
                    <div className="absolute inset-0 bg-white" style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, white 1px, white 2px)`
                    }}></div>
                  </div>
                </div>
              </div>
              <div className="text-gray-300 text-sm mb-2">
                {weaponData.type} / {getElementIcon(weaponData.element)} {weaponData.element} / {weaponData.subtype}
              </div>
              <div className="text-gray-400 text-sm italic mb-4">
                &quot;{weaponData.quote}&quot; {weaponData.author && `—${weaponData.author}`}
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-cyan-400 text-sm hover:text-cyan-300">
                  <div className="w-4 h-4 bg-cyan-400 rounded"></div>
                  <span>View in 3D</span>
                </button>
                {weaponData.sourceInfo && (
                  <div className="flex items-center space-x-1 text-green-400 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Source: {weaponData.sourceInfo}</span>
                  </div>
                )}
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
        {allSectionsExpanded && weaponData.exoticPerks.some(perk => perk.name.trim()) && (
          <div className="mb-8">
            <button className="flex items-center space-x-2 mb-4 text-white">
              <span className="text-white">▼</span>
              <h2 className="text-xl font-bold">Exotic Perks</h2>
            </button>

            <div className="space-y-4 ml-6">
              {weaponData.exoticPerks.map((perk, index) => {
                if (!perk.name.trim()) return null;

                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                      {perk.icon ? (
                        <Image
                          src={perk.icon}
                          alt={perk.name}
                          width={48}
                          height={48}
                          className="rounded"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-yellow-400 rounded" style={{
                          background: index === 0
                            ? 'radial-gradient(circle, #fbbf24 0%, #f59e0b 100%)'
                            : 'conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)',
                          clipPath: index === 1
                            ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                            : 'none'
                        }}></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">{perk.name}</h3>
                      <p className="text-gray-300 text-sm">
                        {perk.description}
                      </p>
                    </div>
                  </div>
                );
              })}
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
                  <div className={`w-4 h-4 ${getStatColor(weaponData.stats.range)} rounded-sm mr-2`}></div>
                  <div className="flex-1 bg-gray-700 h-2 rounded-full mr-4 relative">
                    <div className={`${getStatColor(weaponData.stats.range)} h-full rounded-full`} style={{ width: `${weaponData.stats.range}%` }}>
                      {hasBoost(weaponData.stats.range) && (
                        <div className={`absolute right-0 top-0 h-full ${getStatColorLight(weaponData.stats.range)} rounded-full`} style={{ width: '18px' }}></div>
                      )}
                    </div>
                  </div>
                  <div className="w-8 text-right text-white font-bold text-sm">{weaponData.stats.range}</div>
                </div>

                {/* Reload Speed */}
                <div className="flex items-center">
                  <div className="w-20 text-sm text-white">Reload Speed</div>
                  <div className={`w-4 h-4 ${getStatColor(weaponData.stats.reloadSpeed)} rounded-sm mr-2`}></div>
                  <div className="flex-1 bg-gray-700 h-2 rounded-full mr-4 relative">
                    <div className={`${getStatColor(weaponData.stats.reloadSpeed)} h-full rounded-full`} style={{ width: `${weaponData.stats.reloadSpeed}%` }}>
                      {hasBoost(weaponData.stats.reloadSpeed) && (
                        <div className={`absolute right-0 top-0 h-full ${getStatColorLight(weaponData.stats.reloadSpeed)} rounded-full`} style={{ width: '18px' }}></div>
                      )}
                    </div>
                  </div>
                  <div className="w-8 text-right text-white font-bold text-sm">{weaponData.stats.reloadSpeed}</div>
                </div>

                {/* Stability */}
                <div className="flex items-center">
                  <div className="w-20 text-sm text-white">Stability</div>
                  <div className={`w-4 h-4 ${getStatColor(weaponData.stats.stability)} rounded-sm mr-2`}></div>
                  <div className="flex-1 bg-gray-700 h-2 rounded-full mr-4 relative">
                    <div className={`${getStatColor(weaponData.stats.stability)} h-full rounded-full`} style={{ width: `${weaponData.stats.stability}%` }}>
                      {hasBoost(weaponData.stats.stability) && (
                        <div className={`absolute right-0 top-0 h-full ${getStatColorLight(weaponData.stats.stability)} rounded-full`} style={{ width: '15px' }}></div>
                      )}
                    </div>
                  </div>
                  <div className="w-8 text-right text-white font-bold text-sm">{weaponData.stats.stability}</div>
                </div>

                {/* Handling */}
                <div className="flex items-center">
                  <div className="w-20 text-sm text-white">Handling</div>
                  <div className={`w-4 h-4 ${getStatColor(weaponData.stats.handling)} rounded-sm mr-2`}></div>
                  <div className="flex-1 bg-gray-700 h-2 rounded-full mr-4 relative">
                    <div className={`${getStatColor(weaponData.stats.handling)} h-full rounded-full`} style={{ width: `${weaponData.stats.handling}%` }}>
                      {weaponData.stats.handling < 40 && (
                        <div className="absolute left-0 top-0 h-full bg-red-700 rounded-full" style={{ width: '5px' }}></div>
                      )}
                    </div>
                  </div>
                  <div className="w-8 text-right text-white font-bold text-sm">{weaponData.stats.handling}</div>
                </div>

                {/* Simple Stats List */}
                <div className="space-y-2 mt-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">DPS</span>
                    <span className="text-sm text-white">{weaponData.stats.dps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Precision Bonus</span>
                    <span className="text-sm text-white">{weaponData.stats.precisionBonus}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Damage</span>
                    <span className="text-sm text-white">{weaponData.stats.damage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Rate of Fire</span>
                    <span className="text-sm text-white">{weaponData.stats.rateOfFire} RPM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Magazine Cap</span>
                    <span className="text-sm text-white">{weaponData.stats.magazineCap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Max Ammo</span>
                    <span className="text-sm text-white">{weaponData.stats.maxAmmo}</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Perks */}
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
                    {weaponData.perkIcons.slice(0, 5).map((icon, index) => (
                      <div key={index} className="w-12 h-12 bg-gray-800 border border-orange-500 rounded flex items-center justify-center">
                        {icon ? (
                          <Image
                            src={icon}
                            alt={`Perk ${index + 1}`}
                            width={32}
                            height={32}
                            className="rounded"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-600 rounded opacity-50"></div>
                        )}
                      </div>
                    ))}
                    {weaponData.perkIcons[5] && (
                      <div className="w-12 h-12 bg-gray-800 border border-gray-600 rounded flex items-center justify-center">
                        <Image
                          src={weaponData.perkIcons[5]}
                          alt="Perk 6"
                          width={24}
                          height={32}
                          className="rounded"
                        />
                      </div>
                    )}
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