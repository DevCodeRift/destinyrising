'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { WeaponBuilder, WeaponData } from '@/components/ui/WeaponBuilder';
import { DynamicWeaponDisplay } from '@/components/ui/DynamicWeaponDisplay';

export default function WeaponBuilderPage() {
  const [savedWeapons, setSavedWeapons] = useState<WeaponData[]>([]);
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponData | null>(null);
  const [showBuilder, setShowBuilder] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  // Load saved weapons from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('destinyrising-weapons');
    if (saved) {
      try {
        setSavedWeapons(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse saved weapons:', error);
      }
    }
  }, []);

  const handleSaveWeapon = (weaponData: WeaponData) => {
    const newWeapons = [...savedWeapons];
    const existingIndex = newWeapons.findIndex(w => w.id === weaponData.id);

    if (existingIndex >= 0) {
      newWeapons[existingIndex] = weaponData;
    } else {
      newWeapons.push(weaponData);
    }

    setSavedWeapons(newWeapons);
    localStorage.setItem('destinyrising-weapons', JSON.stringify(newWeapons));

    // Show success message
    alert(`Weapon "${weaponData.name}" has been saved and published to the testing area!`);

    // Set as selected weapon for preview
    setSelectedWeapon(weaponData);
    setShowPreview(true);
  };

  const handleDeleteWeapon = (weaponId: string) => {
    if (confirm('Are you sure you want to delete this weapon?')) {
      const newWeapons = savedWeapons.filter(w => w.id !== weaponId);
      setSavedWeapons(newWeapons);
      localStorage.setItem('destinyrising-weapons', JSON.stringify(newWeapons));

      if (selectedWeapon?.id === weaponId) {
        setSelectedWeapon(null);
        setShowPreview(false);
      }
    }
  };

  const handleEditWeapon = (weapon: WeaponData) => {
    setSelectedWeapon(weapon);
    setShowBuilder(true);
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-4">
          {/* Page Header */}
          <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Weapon Builder</h1>
                <p className="text-gray-600">
                  Create custom weapon displays with exact Light.gg styling. Upload images, set stats, and publish to the testing area.
                </p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => { setShowBuilder(true); setShowPreview(false); }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showBuilder
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Builder
                </button>
                <button
                  onClick={() => { setShowBuilder(false); setShowPreview(true); }}
                  disabled={!selectedWeapon}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showPreview && selectedWeapon
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>
          </div>

          {/* Saved Weapons List */}
          {savedWeapons.length > 0 && (
            <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Saved Weapons ({savedWeapons.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedWeapons.map((weapon) => (
                  <div key={weapon.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        {weapon.weaponImage ? (
                          <Image
                            src={weapon.weaponImage}
                            alt={weapon.name}
                            width={40}
                            height={40}
                            className="object-contain rounded"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">No Image</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{weapon.name}</h3>
                        <p className="text-sm text-gray-500">{weapon.type} {weapon.subtype}</p>
                        <p className="text-xs text-gray-400 truncate">{weapon.element}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => { setSelectedWeapon(weapon); setShowPreview(true); setShowBuilder(false); }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded transition-colors"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => handleEditWeapon(weapon)}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-xs py-1 px-2 rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteWeapon(weapon.id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-2 rounded transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Builder */}
          {showBuilder && (
            <WeaponBuilder
              onSave={handleSaveWeapon}
              initialData={selectedWeapon || undefined}
            />
          )}

          {/* Preview */}
          {showPreview && selectedWeapon && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Preview: {selectedWeapon.name}</h2>
                <div className="flex space-x-2">
                  <a
                    href={`/test/light-gg-style?weapon=${selectedWeapon.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded transition-colors"
                  >
                    Open in New Tab
                  </a>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white text-sm py-1 px-3 rounded transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
              <DynamicWeaponDisplay weaponData={selectedWeapon} />
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Creating a Weapon</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Fill in the weapon name, type, and basic information</li>
                  <li>• Upload weapon image and perk icons (optional)</li>
                  <li>• Set all weapon stats (0-100 scale)</li>
                  <li>• Add exotic perk names and descriptions</li>
                  <li>• Upload up to 6 perk icons for the perk grid</li>
                  <li>• Click &quot;Save &amp; Publish&quot; to create the weapon</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Managing Weapons</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Saved weapons appear in the list above</li>
                  <li>• Preview any weapon with the Preview button</li>
                  <li>• Edit existing weapons to make changes</li>
                  <li>• Delete weapons you no longer need</li>
                  <li>• Access weapons at /test/light-gg-style</li>
                  <li>• All data is saved locally in your browser</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}