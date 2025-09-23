'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface WeaponData {
  id: string;
  name: string;
  type: string;
  subtype: string;
  element: string;
  quote: string;
  author: string;
  weaponImage?: string;
  sourceInfo: string;
  exoticPerks: {
    name: string;
    description: string;
    icon?: string;
  }[];
  stats: {
    range: number;
    velocity: number;
    stability: number;
    handling: number;
    reloadSpeed: number;
    reloadTime: string;
    aimAssistance: number;
    ammoGeneration: number;
    zoom: number;
    airborneEffectiveness: number;
    recoil: number;
    roundsPerMinute: number;
    magazine: number;
  };
  perkIcons: string[];
}

interface WeaponBuilderProps {
  onSave: (weaponData: WeaponData) => void;
  className?: string;
}

export function WeaponBuilder({ onSave, className = '' }: WeaponBuilderProps) {
  const [weaponData, setWeaponData] = useState<WeaponData>({
    id: '',
    name: '',
    type: 'Exotic',
    subtype: 'Pulse Rifle',
    element: 'Kinetic',
    quote: '',
    author: '',
    weaponImage: '',
    sourceInfo: '',
    exoticPerks: [
      { name: '', description: '', icon: '' },
      { name: '', description: '', icon: '' }
    ],
    stats: {
      range: 0,
      velocity: 0,
      stability: 0,
      handling: 0,
      reloadSpeed: 0,
      reloadTime: '0.00s',
      aimAssistance: 0,
      ammoGeneration: 0,
      zoom: 0,
      airborneEffectiveness: 0,
      recoil: 0,
      roundsPerMinute: 0,
      magazine: 0,
    },
    perkIcons: ['', '', '', '', '', '']
  });

  const handleInputChange = (field: string, value: string | number) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (parent === 'stats') {
        setWeaponData(prev => ({
          ...prev,
          stats: {
            ...prev.stats,
            [child]: value
          }
        }));
      }
    } else {
      setWeaponData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handlePerkChange = (index: number, field: string, value: string) => {
    setWeaponData(prev => ({
      ...prev,
      exoticPerks: prev.exoticPerks.map((perk, i) =>
        i === index ? { ...perk, [field]: value } : perk
      )
    }));
  };

  const handleImageUpload = (key: string, file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      if (key === 'weaponImage') {
        handleInputChange('weaponImage', url);
      } else if (key.startsWith('perk') && key.endsWith('Icon')) {
        const perkIndex = parseInt(key.replace('perk', '').replace('Icon', '')) - 1;
        if (perkIndex < 2) {
          handlePerkChange(perkIndex, 'icon', url);
        } else {
          const perkIconIndex = perkIndex - 2;
          setWeaponData(prev => ({
            ...prev,
            perkIcons: prev.perkIcons.map((icon, i) =>
              i === perkIconIndex ? url : icon
            )
          }));
        }
      }
    }
  };

  const handleSave = () => {
    const id = weaponData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const dataToSave = { ...weaponData, id };
    onSave(dataToSave);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Weapon Builder</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weapon Name</label>
                <input
                  type="text"
                  value={weaponData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., NEW MALPAIS"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={weaponData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Exotic">Exotic</option>
                    <option value="Legendary">Legendary</option>
                    <option value="Rare">Rare</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtype</label>
                  <select
                    value={weaponData.subtype}
                    onChange={(e) => handleInputChange('subtype', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pulse Rifle">Pulse Rifle</option>
                    <option value="Auto Rifle">Auto Rifle</option>
                    <option value="Scout Rifle">Scout Rifle</option>
                    <option value="Hand Cannon">Hand Cannon</option>
                    <option value="Shotgun">Shotgun</option>
                    <option value="Sniper Rifle">Sniper Rifle</option>
                    <option value="Fusion Rifle">Fusion Rifle</option>
                    <option value="Rocket Launcher">Rocket Launcher</option>
                    <option value="Machine Gun">Machine Gun</option>
                    <option value="Sword">Sword</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Element</label>
                  <select
                    value={weaponData.element}
                    onChange={(e) => handleInputChange('element', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Kinetic">⚡ Kinetic</option>
                    <option value="Solar">🔥 Solar</option>
                    <option value="Arc">⚡ Arc</option>
                    <option value="Void">🌌 Void</option>
                    <option value="Stasis">❄️ Stasis</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
                <textarea
                  value={weaponData.quote}
                  onChange={(e) => handleInputChange('quote', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="e.g., Decide! Principles or power—you can't have both."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input
                  type="text"
                  value={weaponData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Spider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source Info</label>
                <input
                  type="text"
                  value={weaponData.sourceInfo}
                  onChange={(e) => handleInputChange('sourceInfo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Rewards Pass"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weapon Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('weaponImage', e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {weaponData.weaponImage && (
                  <div className="mt-2">
                    <Image
                      src={weaponData.weaponImage}
                      alt="Weapon Preview"
                      width={80}
                      height={80}
                      className="rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Exotic Perks */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exotic Perks</h3>

            {weaponData.exoticPerks.map((perk, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Perk {index + 1} Name</label>
                    <input
                      type="text"
                      value={perk.name}
                      onChange={(e) => handlePerkChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`e.g., ${index === 0 ? 'Atomizing Rounds' : 'Suspending Blast'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={perk.description}
                      onChange={(e) => handlePerkChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      placeholder="Perk description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Perk Icon</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(`perk${index + 1}Icon`, e.target.files?.[0] || null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {perk.icon && (
                      <div className="mt-2">
                        <Image
                          src={perk.icon}
                          alt={`Perk ${index + 1} Icon`}
                          width={48}
                          height={48}
                          className="rounded border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Stats and Perks */}
        <div className="space-y-6">
          {/* Stats */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weapon Stats</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Range</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weaponData.stats.range}
                  onChange={(e) => handleInputChange('stats.range', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Velocity</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weaponData.stats.velocity}
                  onChange={(e) => handleInputChange('stats.velocity', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stability</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weaponData.stats.stability}
                  onChange={(e) => handleInputChange('stats.stability', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Handling</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weaponData.stats.handling}
                  onChange={(e) => handleInputChange('stats.handling', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reload Speed</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weaponData.stats.reloadSpeed}
                  onChange={(e) => handleInputChange('stats.reloadSpeed', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reload Time</label>
                <input
                  type="text"
                  value={weaponData.stats.reloadTime}
                  onChange={(e) => handleInputChange('stats.reloadTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 1.79s"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aim Assistance</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weaponData.stats.aimAssistance}
                  onChange={(e) => handleInputChange('stats.aimAssistance', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ammo Generation</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weaponData.stats.ammoGeneration}
                  onChange={(e) => handleInputChange('stats.ammoGeneration', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zoom</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weaponData.stats.zoom}
                  onChange={(e) => handleInputChange('stats.zoom', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Airborne Effectiveness</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weaponData.stats.airborneEffectiveness}
                  onChange={(e) => handleInputChange('stats.airborneEffectiveness', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recoil</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weaponData.stats.recoil}
                  onChange={(e) => handleInputChange('stats.recoil', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rounds Per Minute</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={weaponData.stats.roundsPerMinute}
                  onChange={(e) => handleInputChange('stats.roundsPerMinute', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Magazine</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weaponData.stats.magazine}
                  onChange={(e) => handleInputChange('stats.magazine', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Perk Icons */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Perk Icons (6 slots)</h3>

            <div className="grid grid-cols-3 gap-4">
              {weaponData.perkIcons.map((icon, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon {index + 1}</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(`perkIcon${index + 3}`, e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  {icon && (
                    <div className="mt-2">
                      <Image
                        src={icon}
                        alt={`Perk Icon ${index + 1}`}
                        width={48}
                        height={48}
                        className="rounded border"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={!weaponData.name.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Save & Publish Weapon
        </button>
      </div>
    </div>
  );
}