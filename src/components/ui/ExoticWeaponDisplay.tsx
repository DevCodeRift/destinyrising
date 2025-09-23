import Image from 'next/image';
import React from 'react';

export interface ExoticWeaponData {
  id: string;
  name: string;
  weaponType: string;
  rarity: 'exotic';
  gearLevel: number;
  basePowerMin: number;
  basePowerMax: number;
  imageUrl?: string;

  // Traits & Perks
  traits: TraitSlot[];
  intrinsicTrait?: IntrinsicTrait;

  // Catalyst System
  catalyst?: CatalystData;
  catalystBands: CatalystBand[];

  // Detailed Stats
  stats: WeaponStats;

  // Source Information
  retrievalRecord?: string;
  sources: WeaponSource[];

  // Synthesis System
  synthesisData?: SynthesisData;
}

export interface TraitSlot {
  id: string;
  name: string;
  description: string;
  icon?: string;
  isActive: boolean;
  slot: number;
}

export interface IntrinsicTrait {
  name: string;
  description: string;
  type: 'INTRINSIC TRAIT' | 'PERK/DAMAGE';
}

export interface CatalystData {
  name: string;
  description: string;
  powerBonus: number;
  isUnlocked: boolean;
}

export interface CatalystBand {
  id: string;
  name: string;
  description: string;
  powerBonus: number;
  isUnlocked: boolean;
  position: number;
}

export interface WeaponStats {
  dps: number;
  precisionBonus: number;
  magazineCapacity: number;
  maxAmmo: number;
  rateOfFire: number;
  damage: number;
  reloadSpeed: number;
  range: number;
  stability: number;
  handling: number;
}

export interface WeaponSource {
  name: string;
  type: 'engram' | 'quest' | 'activity';
  icon?: string;
}

export interface SynthesisData {
  quantity: number;
  maxQuantity: number;
  synthesisEnabled: boolean;
  catalysisBoost?: CatalysisBoost;
}

export interface CatalysisBoost {
  tier: number;
  maxTier: number;
  slots: CatalysisSlot[];
}

export interface CatalysisSlot {
  id: string;
  isUnlocked: boolean;
  position: { row: number; col: number };
}

interface ExoticWeaponDisplayProps {
  weapon: ExoticWeaponData;
  className?: string;
}

export function ExoticWeaponDisplay({ weapon, className = '' }: ExoticWeaponDisplayProps) {
  const getStatBarWidth = (value: number, maxValue: number = 100) => {
    return Math.min((value / maxValue) * 100, 100);
  };

  const getStatColor = (statName: string) => {
    const colorMap: Record<string, string> = {
      dps: 'from-red-400 to-red-600',
      precisionBonus: 'from-yellow-400 to-yellow-600',
      damage: 'from-orange-400 to-orange-600',
      range: 'from-blue-400 to-blue-600',
      stability: 'from-green-400 to-green-600',
      handling: 'from-purple-400 to-purple-600',
      reloadSpeed: 'from-cyan-400 to-cyan-600',
      rateOfFire: 'from-pink-400 to-pink-600',
    };
    return colorMap[statName] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className={`bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl overflow-hidden border-2 border-yellow-500/30 ${className}`}>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-black/20 rounded-lg flex items-center justify-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{weapon.name}</h2>
              <div className="flex items-center space-x-2">
                <span className="text-black font-medium">{weapon.weaponType}</span>
                <span className="text-black/80">•</span>
                <span className="text-black/80 uppercase text-sm font-medium">SHOTGUN</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-black font-bold text-lg">
              ◇{weapon.basePowerMin}~{weapon.basePowerMax}
            </div>
            <div className="text-black/80 text-sm">BASE POWER</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Weapon Image & Basic Info */}
          <div className="space-y-6">
            {/* Weapon Image */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-500/20">
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
              <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-lg border border-yellow-500/50">
                <span className="text-sm font-bold">GEAR LEVEL</span>
                <span className="ml-2 text-lg font-bold">{weapon.gearLevel}</span>
              </div>
            </div>

            {/* Traits & Perks */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Traits & Perks</h3>

              {/* Trait Slots */}
              <div className="flex space-x-2">
                {weapon.traits.map((trait) => (
                  <div
                    key={trait.id}
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center ${
                      trait.isActive
                        ? 'bg-yellow-600/20 border-yellow-500'
                        : 'bg-gray-800 border-gray-600'
                    }`}
                  >
                    {trait.icon ? (
                      <Image src={trait.icon} alt={trait.name} width={32} height={32} />
                    ) : (
                      <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Catalyst System */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">Catalyst</h4>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(12)].map((_, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg border-2 border-gray-600 bg-gray-800 flex items-center justify-center"
                    >
                      <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Details */}
          <div className="space-y-6">
            {/* Intrinsic Trait */}
            {weapon.intrinsicTrait && (
              <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-yellow-400">{weapon.intrinsicTrait.name}</h3>
                  <span className="text-xs text-yellow-500 font-medium uppercase tracking-wider">
                    {weapon.intrinsicTrait.type}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{weapon.intrinsicTrait.description}</p>
              </div>
            )}

            {/* Detailed Stats */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Stats</h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Primary Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">DPS</span>
                    <span className="text-white font-bold">{weapon.stats.dps}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Precis. Bonus</span>
                    <span className="text-white font-bold">{weapon.stats.precisionBonus}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Magazine Cap.</span>
                    <span className="text-white font-bold">{weapon.stats.magazineCapacity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Max Ammo</span>
                    <span className="text-white font-bold">{weapon.stats.maxAmmo}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Rate of Fire</span>
                    <span className="text-white font-bold">{weapon.stats.rateOfFire}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">DMG</span>
                    <span className="text-white font-bold">{weapon.stats.damage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Reload Speed</span>
                    <span className="text-white font-bold">{weapon.stats.reloadSpeed}</span>
                  </div>
                </div>
              </div>

              {/* Stat Bars */}
              <div className="space-y-3 mt-6">
                {[
                  { name: 'Range', value: weapon.stats.range },
                  { name: 'Stability', value: weapon.stats.stability },
                  { name: 'Handling', value: weapon.stats.handling }
                ].map((stat) => (
                  <div key={stat.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">{stat.name}</span>
                      <span className="text-white font-bold">{stat.value}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${getStatColor(stat.name.toLowerCase())} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${getStatBarWidth(stat.value)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Source & Synthesis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Source Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Source</h3>

            {weapon.retrievalRecord && (
              <div className="text-sm text-gray-400 italic mb-4">
                {weapon.retrievalRecord}
              </div>
            )}

            <div className="space-y-2">
              {weapon.sources.map((source, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                    {source.type === 'engram' && (
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-white">{source.name}</span>
                  <div className="ml-auto">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Synthesis System */}
          {weapon.synthesisData && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Synthesis</h3>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Quantity: {weapon.synthesisData.quantity}</span>
                <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-white">
                    -
                  </button>
                  <span className="w-12 text-center text-white font-bold">{weapon.synthesisData.quantity}</span>
                  <button className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded flex items-center justify-center text-white">
                    +
                  </button>
                  <span className="text-gray-400 text-sm">MAX</span>
                </div>
              </div>

              {weapon.synthesisData.catalysisBoost && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Exotic Catalysis Boost</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {weapon.synthesisData.catalysisBoost.slots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`aspect-square rounded-lg border-2 flex items-center justify-center ${
                          slot.isUnlocked
                            ? 'bg-yellow-600/20 border-yellow-500'
                            : 'bg-gray-800 border-gray-600'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded ${slot.isUnlocked ? 'bg-yellow-500' : 'bg-gray-600'}`}></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-200"
                disabled={!weapon.synthesisData.synthesisEnabled}
              >
                SYNTHESIZE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}