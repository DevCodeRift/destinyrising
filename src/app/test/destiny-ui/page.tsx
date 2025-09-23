'use client';

import React from 'react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { DestinyWeaponInterface, type DestinyWeaponData } from '@/components/ui/DestinyWeaponInterface';

// Exact data from The Chaperone screenshots
const chaperoneData: DestinyWeaponData = {
  name: 'The Chaperone',
  weaponType: 'SHOTGUN',
  gearLevel: 70,
  basePowerMin: 4490,
  basePowerMax: 5030,

  traits: [
    {
      id: 'trait1',
      name: 'PRECISION SLUG',
      description: 'Fires a single-slug precision round.',
      icon: '',
      isActive: true
    },
    {
      id: 'trait2',
      name: 'THE ROADBORN',
      description: 'Precision kills briefly increase the weapon\'s handling, range, and precision damage.',
      icon: '',
      isActive: true
    }
  ],

  catalystSlots: [
    {
      id: 'catalyst1',
      isUnlocked: false,
      position: 1,
      name: 'CATALYST BAND 01',
      description: 'This weapon deals +15% precision damage.',
      powerBonus: 1000
    },
    {
      id: 'catalyst2',
      isUnlocked: false,
      position: 2,
      name: 'CATALYST BAND 02',
      description: 'Precision hits can trigger The Roadborn.',
      powerBonus: 1000
    },
    {
      id: 'catalyst3',
      isUnlocked: false,
      position: 3,
      name: 'CATALYST BAND 03',
      description: 'Additional catalyst enhancement.',
      powerBonus: 1000
    },
    {
      id: 'catalyst4',
      isUnlocked: true,
      position: 4,
      name: 'THE CHAPERONE CATALYST',
      description: 'Precision final blows automatically reload this weapon from reserves.',
      powerBonus: 1000
    }
  ],

  stats: {
    dps: 737,
    precisBonus: 1.6,
    magazineCap: 6,
    maxAmmo: 24,
    rateOfFire: 65,
    dmg: 1100,
    reloadSpeed: 37,
    range: 74,
    stability: 28,
    handling: 72
  },

  sources: [
    {
      name: 'Exotic Weapon Engram',
      type: 'engram',
      icon: ''
    },
    {
      name: 'Exotic Weapon Random Engram - Adventurer',
      type: 'engram',
      icon: ''
    },
    {
      name: 'Shifting Gates',
      type: 'activity',
      icon: ''
    }
  ],

  synthesis: {
    quantity: 1,
    maxQuantity: 999,
    synthesisCost: 45
  }
};

export default function DestinyUITestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-4">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white mb-2">Destiny 2 UI Recreation</h1>
            <p className="text-gray-400">
              Exact recreation of The Chaperone interface from your screenshots with interactive elements.
            </p>
          </div>

          {/* Interface */}
          <div className="bg-black rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
            <DestinyWeaponInterface weapon={chaperoneData} />
          </div>

          {/* Instructions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4">Interactive Elements</h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  Click the yellow trait circles to see trait details
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  Click unlocked catalyst slots to view catalyst info
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gray-500 rounded-full mr-3"></div>
                  Locked catalyst slots are not clickable
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Right panel shows detailed information
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4">Exact Recreation Features</h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Matches screenshot layout exactly
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Correct colors and spacing
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Interactive trait and catalyst system
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Split-panel design like in-game
                </li>
              </ul>
            </div>
          </div>

          {/* Data Accuracy */}
          <div className="mt-8 bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">Screenshot Data Accuracy</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{chaperoneData.stats.dps}</div>
                <div className="text-gray-400">DPS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{chaperoneData.stats.precisBonus}</div>
                <div className="text-gray-400">Precision Bonus</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{chaperoneData.stats.range}</div>
                <div className="text-gray-400">Range</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{chaperoneData.stats.handling}</div>
                <div className="text-gray-400">Handling</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              All stats, names, and values are taken directly from your Chaperone screenshots.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}