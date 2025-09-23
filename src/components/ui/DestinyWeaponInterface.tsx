'use client';

import Image from 'next/image';
import React, { useState } from 'react';

export interface DestinyWeaponData {
  name: string;
  weaponType: string;
  gearLevel: number;
  basePowerMin: number;
  basePowerMax: number;
  imageUrl?: string;

  // Traits (the two circular icons)
  traits: WeaponTrait[];

  // Catalyst slots (4 circles)
  catalystSlots: CatalystSlot[];

  // Stats with exact names from screenshots
  stats: {
    dps: number;
    precisBonus: number;
    magazineCap: number;
    maxAmmo: number;
    rateOfFire: number;
    dmg: number;
    reloadSpeed: number;
    range: number;
    stability: number;
    handling: number;
  };

  // Sources shown in right panel
  sources: SourceOption[];

  // Synthesis section
  synthesis: {
    quantity: number;
    maxQuantity: number;
    synthesisCost: number;
  };
}

export interface WeaponTrait {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export interface CatalystSlot {
  id: string;
  isUnlocked: boolean;
  position: number;
  name?: string;
  description?: string;
  powerBonus?: number;
}

export interface SourceOption {
  name: string;
  type: 'engram' | 'activity';
  icon: string;
}

interface RightPanelContent {
  type: 'trait' | 'catalyst' | 'synthesis';
  data: WeaponTrait | CatalystSlot;
}

interface DestinyWeaponInterfaceProps {
  weapon: DestinyWeaponData;
  className?: string;
}

export function DestinyWeaponInterface({ weapon, className = '' }: DestinyWeaponInterfaceProps) {
  const [selectedContent, setSelectedContent] = useState<RightPanelContent | null>(null);

  const handleTraitClick = (trait: WeaponTrait) => {
    setSelectedContent({
      type: 'trait',
      data: trait
    });
  };

  const handleCatalystClick = (catalyst: CatalystSlot) => {
    setSelectedContent({
      type: 'catalyst',
      data: catalyst
    });
  };

  const getStatBarWidth = (value: number, maxValue: number = 100) => {
    return Math.min((value / maxValue) * 100, 100);
  };

  return (
    <div className={`flex bg-black text-white ${className}`}>
      {/* Left Panel - Main Interface */}
      <div className="w-1/2 bg-gray-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{weapon.name}</h2>
              <div className="flex items-center space-x-2 text-black">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-purple-600 rounded"></div>
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                </div>
                <span className="font-medium uppercase">{weapon.weaponType}</span>
              </div>
            </div>
            <div className="text-right text-black">
              <div className="text-2xl font-bold">
                ◆{weapon.basePowerMin}~{weapon.basePowerMax}
              </div>
              <div className="text-sm font-medium">BASE POWER</div>
            </div>
          </div>
        </div>

        {/* Weapon Image Area */}
        <div className="p-6">
          <div className="relative aspect-[4/3] bg-gray-800 rounded-lg mb-6 border border-gray-700">
            {weapon.imageUrl ? (
              <Image
                src={weapon.imageUrl}
                alt={weapon.name}
                fill
                className="object-contain p-4"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Gear Level Badge */}
            <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded">
              <span className="text-white text-sm font-bold">GEAR LEVEL</span>
              <span className="ml-2 text-white text-xl font-bold bg-gray-700 px-2 py-1 rounded ml-2">{weapon.gearLevel}</span>
            </div>
          </div>

          {/* Traits & Perks */}
          <div className="mb-6">
            <h3 className="text-white text-sm font-bold mb-3">Traits & Perks</h3>
            <div className="flex space-x-3">
              {weapon.traits.map((trait) => (
                <button
                  key={trait.id}
                  onClick={() => handleTraitClick(trait)}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all hover:scale-105 ${
                    trait.isActive
                      ? 'bg-yellow-600/30 border-yellow-500 shadow-lg shadow-yellow-500/25'
                      : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full ${trait.isActive ? 'bg-yellow-500' : 'bg-gray-600'}`}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Catalyst */}
          <div className="mb-6">
            <h3 className="text-white text-sm font-bold mb-3">Catalyst</h3>
            <div className="grid grid-cols-4 gap-3">
              {weapon.catalystSlots.map((catalyst) => (
                <button
                  key={catalyst.id}
                  onClick={() => handleCatalystClick(catalyst)}
                  className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all hover:scale-105 ${
                    catalyst.isUnlocked
                      ? 'bg-yellow-600/30 border-yellow-500 shadow-lg shadow-yellow-500/25'
                      : 'bg-gray-800 border-gray-600'
                  }`}
                >
                  <div className={`w-6 h-6 rounded ${catalyst.isUnlocked ? 'bg-yellow-500' : 'bg-gray-600'}`}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-3">
            {/* Primary Stats Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">DPS</span>
                <span className="text-white font-bold">{weapon.stats.dps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Precis. Bonus</span>
                <span className="text-white font-bold">{weapon.stats.precisBonus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Magazine Cap.</span>
                <span className="text-white font-bold">{weapon.stats.magazineCap}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Max Ammo</span>
                <span className="text-white font-bold">{weapon.stats.maxAmmo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Rate of Fire</span>
                <span className="text-white font-bold">{weapon.stats.rateOfFire}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">DMG</span>
                <span className="text-white font-bold">{weapon.stats.dmg}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Reload Speed</span>
                <span className="text-white font-bold">{weapon.stats.reloadSpeed}</span>
              </div>
            </div>

            {/* Stat Bars */}
            <div className="space-y-2 mt-4">
              {[
                { name: 'Range', value: weapon.stats.range },
                { name: 'Stability', value: weapon.stats.stability },
                { name: 'Handling', value: weapon.stats.handling }
              ].map((stat) => (
                <div key={stat.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{stat.name}</span>
                    <span className="text-white font-bold">{stat.value}</span>
                  </div>
                  <div className="w-full bg-gray-700 h-1 rounded-full">
                    <div
                      className="bg-white h-1 rounded-full"
                      style={{ width: `${getStatBarWidth(stat.value)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Eligible ×2</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                <div className="w-8 h-8 bg-orange-600 rounded-full"></div>
              </div>
            </div>
            <div className="text-center text-gray-400 text-sm mt-2">Unacquired</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Details */}
      <div className="w-1/2 bg-gray-800 p-6">
        {selectedContent ? (
          <div>
            {selectedContent.type === 'trait' && (
              <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-500/50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-yellow-400">{selectedContent.data.name}</h3>
                  <span className="text-xs text-yellow-500 font-bold uppercase tracking-wider">
                    INTRINSIC TRAIT
                  </span>
                </div>
                <p className="text-gray-300">{selectedContent.data.description}</p>
              </div>
            )}

            {selectedContent.type === 'catalyst' && 'powerBonus' in selectedContent.data && (
              <div className="bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-500/50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-yellow-400">{selectedContent.data.name}</h3>
                  <div className="text-yellow-400 font-bold">
                    <span className="text-sm">◆ Power </span>
                    <span className="text-lg">+{selectedContent.data.powerBonus}</span>
                  </div>
                </div>
                <p className="text-gray-300">{selectedContent.data.description}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Synthesis Cost */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Synthesis Cost</h3>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-yellow-400 rounded"></div>
                    </div>
                    <span className="text-white">{weapon.synthesis.synthesisCost}/30</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Controls */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Quantity: {weapon.synthesis.quantity}</span>
                <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-white font-bold">
                    -
                  </button>
                  <span className="w-12 text-center text-white font-bold">{weapon.synthesis.quantity}</span>
                  <button className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-white font-bold">
                    +
                  </button>
                  <span className="text-gray-400 text-sm ml-2">MAX</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-200">
                SYNTHESIZE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}