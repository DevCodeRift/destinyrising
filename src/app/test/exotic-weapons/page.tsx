'use client';

import React, { useState } from 'react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { ExoticWeaponDisplay, type ExoticWeaponData } from '@/components/ui/ExoticWeaponDisplay';

// Sample data based on The Chaperone screenshots
const chaperoneData: ExoticWeaponData = {
  id: 'the-chaperone',
  name: 'The Chaperone',
  weaponType: 'Shotgun',
  rarity: 'exotic',
  gearLevel: 70,
  basePowerMin: 4490,
  basePowerMax: 5030,
  imageUrl: '/assets/exotics/exotic_weapons/The_Chaperone/Screenshot_20250923_093618_Destiny Rising.jpg',

  traits: [
    {
      id: 'trait1',
      name: 'Precision Frame',
      description: 'Fires a single-slug precision round.',
      slot: 1,
      isActive: true
    },
    {
      id: 'trait2',
      name: 'Catalyst Slot',
      description: 'Available catalyst slot',
      slot: 2,
      isActive: false
    }
  ],

  intrinsicTrait: {
    name: 'PRECISION SLUG',
    description: 'Fires a single-slug precision round.',
    type: 'INTRINSIC TRAIT'
  },

  catalyst: {
    name: 'The Chaperone Catalyst',
    description: 'Precision final blows automatically reload this weapon from reserves.',
    powerBonus: 1000,
    isUnlocked: true
  },

  catalystBands: [
    {
      id: 'band1',
      name: 'Catalyst Band 01',
      description: 'This weapon deals +15% precision damage.',
      powerBonus: 1000,
      isUnlocked: true,
      position: 1
    },
    {
      id: 'band2',
      name: 'Catalyst Band 02',
      description: 'Precision hits can trigger The Roadborn.',
      powerBonus: 1000,
      isUnlocked: false,
      position: 2
    }
  ],

  stats: {
    dps: 737,
    precisionBonus: 1.6,
    magazineCapacity: 6,
    maxAmmo: 24,
    rateOfFire: 65,
    damage: 1100,
    reloadSpeed: 37,
    range: 74,
    stability: 28,
    handling: 72
  },

  retrievalRecord: 'Retrieval Record 0006: 199th Solar Day — Sunchales, Corrientes, South America',

  sources: [
    {
      name: 'Exotic Weapon Engram',
      type: 'engram'
    },
    {
      name: 'Exotic Weapon Random Engram - Adventurer',
      type: 'engram'
    },
    {
      name: 'Shifting Gates',
      type: 'activity'
    }
  ],

  synthesisData: {
    quantity: 1,
    maxQuantity: 999,
    synthesisEnabled: true,
    catalysisBoost: {
      tier: 1,
      maxTier: 7,
      slots: [
        { id: 'slot1', isUnlocked: false, position: { row: 0, col: 0 } },
        { id: 'slot2', isUnlocked: false, position: { row: 0, col: 1 } },
        { id: 'slot3', isUnlocked: true, position: { row: 0, col: 2 } },
        { id: 'slot4', isUnlocked: false, position: { row: 1, col: 0 } },
        { id: 'slot5', isUnlocked: false, position: { row: 1, col: 1 } },
        { id: 'slot6', isUnlocked: true, position: { row: 1, col: 2 } },
        { id: 'slot7', isUnlocked: false, position: { row: 2, col: 0 } },
        { id: 'slot8', isUnlocked: false, position: { row: 2, col: 1 } },
        { id: 'slot9', isUnlocked: false, position: { row: 2, col: 2 } }
      ]
    }
  }
};

// Additional sample weapons for testing
const gjallarhornData: ExoticWeaponData = {
  id: 'gjallarhorn',
  name: 'Gjallarhorn',
  weaponType: 'Rocket Launcher',
  rarity: 'exotic',
  gearLevel: 75,
  basePowerMin: 5200,
  basePowerMax: 5800,

  traits: [
    {
      id: 'trait1',
      name: 'Aggressive Frame',
      description: 'High damage, high recoil.',
      slot: 1,
      isActive: true
    },
    {
      id: 'trait2',
      name: 'Wolfpack Rounds',
      description: 'Rounds track enemies and split into cluster bombs.',
      slot: 2,
      isActive: true
    }
  ],

  intrinsicTrait: {
    name: 'WOLFPACK ROUNDS',
    description: 'Rounds fired split into tracking cluster missiles upon detonation.',
    type: 'INTRINSIC TRAIT'
  },

  catalystBands: [
    {
      id: 'ghorn-band1',
      name: 'Gjallarhorn Catalyst',
      description: 'Wolfpack rounds do increased damage.',
      powerBonus: 800,
      isUnlocked: true,
      position: 1
    }
  ],

  stats: {
    dps: 890,
    precisionBonus: 1.0,
    magazineCapacity: 1,
    maxAmmo: 7,
    rateOfFire: 15,
    damage: 2400,
    reloadSpeed: 25,
    range: 60,
    stability: 45,
    handling: 38
  },

  sources: [
    {
      name: 'Exotic Quest: And Out Fly the Wolves',
      type: 'quest'
    }
  ],

  synthesisData: {
    quantity: 1,
    maxQuantity: 1,
    synthesisEnabled: false
  }
};

export default function ExoticWeaponsTestPage() {
  const [selectedWeapon, setSelectedWeapon] = useState<'chaperone' | 'gjallarhorn'>('chaperone');

  const currentWeapon = selectedWeapon === 'chaperone' ? chaperoneData : gjallarhornData;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Exotic Weapon UI Testing</h1>
            <p className="text-gray-400">
              Preview and test the comprehensive exotic weapon display component based on The Chaperone UI reference.
            </p>
          </div>

          {/* Weapon Selector */}
          <div className="mb-8 flex space-x-4">
            <button
              onClick={() => setSelectedWeapon('chaperone')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedWeapon === 'chaperone'
                  ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              The Chaperone
            </button>
            <button
              onClick={() => setSelectedWeapon('gjallarhorn')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedWeapon === 'gjallarhorn'
                  ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Gjallarhorn
            </button>
          </div>

          {/* Features List */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">✓ Complete UI Recreation</h3>
              <p className="text-gray-400 text-sm">Matches all visual elements from the game screenshots</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">✓ Comprehensive Stats</h3>
              <p className="text-gray-400 text-sm">DPS, precision, magazine, ammo, and detailed stat bars</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">✓ Catalyst System</h3>
              <p className="text-gray-400 text-sm">Multi-tier catalyst progression and boost visualization</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">✓ Source Information</h3>
              <p className="text-gray-400 text-sm">Acquisition methods and retrieval records</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">✓ Synthesis System</h3>
              <p className="text-gray-400 text-sm">Interactive quantity controls and synthesis options</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">✓ Responsive Design</h3>
              <p className="text-gray-400 text-sm">Adapts to different screen sizes and devices</p>
            </div>
          </div>

          {/* Weapon Display */}
          <div className="mb-8">
            <ExoticWeaponDisplay weapon={currentWeapon} />
          </div>

          {/* Implementation Notes */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Implementation Notes</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Component Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Fully typed TypeScript interfaces for all weapon data</li>
                  <li>Responsive grid layout that adapts to screen sizes</li>
                  <li>Dynamic stat bars with customizable colors</li>
                  <li>Interactive catalyst and synthesis systems</li>
                  <li>Gradient backgrounds and borders matching game aesthetics</li>
                  <li>Modular design for easy customization and extension</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Ready for Integration:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Can be integrated into existing item detail pages</li>
                  <li>Supports database-driven content through the defined interfaces</li>
                  <li>Compatible with existing ItemCard component structure</li>
                  <li>Includes all fields visible in The Chaperone screenshots</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Usage:</h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`import { ExoticWeaponDisplay } from '@/components/ui/ExoticWeaponDisplay';

<ExoticWeaponDisplay weapon={weaponData} className="max-w-4xl" />`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}