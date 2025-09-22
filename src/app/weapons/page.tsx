'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { ItemCard, type Item } from '@/components/ui/ItemCard';

// Sample weapon data
const weaponItems: Item[] = [
  {
    id: '1',
    name: 'Fatebringer',
    slug: 'fatebringer',
    description: 'A legendary hand cannon known for its precision and power.',
    itemType: 'Hand Cannon',
    rarity: 'legendary',
    element: 'arc',
    powerLevel: 1350,
    isCraftable: true,
  },
  {
    id: '2',
    name: 'Gjallarhorn',
    slug: 'gjallarhorn',
    description: 'An exotic rocket launcher that fires tracking rockets.',
    itemType: 'Rocket Launcher',
    rarity: 'exotic',
    element: 'solar',
    powerLevel: 1370,
    isCraftable: false,
  },
  {
    id: '3',
    name: 'Vision of Confluence',
    slug: 'vision-of-confluence',
    description: 'A scout rifle with solar damage capabilities.',
    itemType: 'Scout Rifle',
    rarity: 'legendary',
    element: 'solar',
    powerLevel: 1340,
  },
  {
    id: '4',
    name: 'Thorn',
    slug: 'thorn',
    description: 'An exotic hand cannon that deals poison damage.',
    itemType: 'Hand Cannon',
    rarity: 'exotic',
    element: 'void',
    powerLevel: 1365,
    isCraftable: false,
  },
  {
    id: '6',
    name: 'Palindrome',
    slug: 'palindrome',
    description: 'A reliable hand cannon with excellent stability.',
    itemType: 'Hand Cannon',
    rarity: 'legendary',
    element: 'kinetic',
    powerLevel: 1345,
    isCraftable: true,
  },
  {
    id: '7',
    name: 'The Last Word',
    slug: 'the-last-word',
    description: 'An exotic hand cannon optimized for hip firing.',
    itemType: 'Hand Cannon',
    rarity: 'exotic',
    element: 'solar',
    powerLevel: 1355,
  },
];

const weaponTypes = [
  'Hand Cannon',
  'Auto Rifle',
  'Scout Rifle',
  'Pulse Rifle',
  'Sniper Rifle',
  'Shotgun',
  'Fusion Rifle',
  'Rocket Launcher',
  'Machine Gun',
  'Sword',
];

export default function WeaponsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [selectedElement, setSelectedElement] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedWeapons = useMemo(() => {
    const filtered = weaponItems.filter(weapon => {
      const matchesSearch = weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           weapon.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || weapon.itemType === selectedType;
      const matchesRarity = !selectedRarity || weapon.rarity === selectedRarity;
      const matchesElement = !selectedElement || weapon.element === selectedElement;

      return matchesSearch && matchesType && matchesRarity && matchesElement;
    });

    // Sort weapons
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rarity':
          const rarityOrder = { 'common': 1, 'uncommon': 2, 'rare': 3, 'legendary': 4, 'exotic': 5 };
          return (rarityOrder[b.rarity as keyof typeof rarityOrder] || 0) - (rarityOrder[a.rarity as keyof typeof rarityOrder] || 0);
        case 'power':
          return (b.powerLevel || 0) - (a.powerLevel || 0);
        case 'type':
          return a.itemType.localeCompare(b.itemType);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedType, selectedRarity, selectedElement, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedRarity('');
    setSelectedElement('');
  };

  // Group weapons by type for the overview section
  const weaponsByType = useMemo(() => {
    return weaponTypes.reduce((acc, type) => {
      acc[type] = weaponItems.filter(weapon => weapon.itemType === type);
      return acc;
    }, {} as Record<string, Item[]>);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Weapons</h1>
            <p className="text-lg text-gray-300">
              Discover and master the most powerful weapons in Destiny Rising.
            </p>
          </div>

          {/* Weapon Type Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Weapon Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {weaponTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? '' : type)}
                  className={`destiny-card p-4 text-center transition-all duration-200 ${
                    selectedType === type
                      ? 'border-orange-400 bg-orange-500/10'
                      : 'hover:border-orange-400/50'
                  }`}
                >
                  <div className="text-2xl font-bold text-white mb-1">
                    {weaponsByType[type]?.length || 0}
                  </div>
                  <div className="text-sm text-gray-300">{type}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="destiny-card p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                  Search Weapons
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or description..."
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400"
                  />
                  <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Weapon Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                  Weapon Type
                </label>
                <select
                  id="type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:ring-orange-400"
                >
                  <option value="">All Types</option>
                  {weaponTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Rarity */}
              <div>
                <label htmlFor="rarity" className="block text-sm font-medium text-gray-300 mb-2">
                  Rarity
                </label>
                <select
                  id="rarity"
                  value={selectedRarity}
                  onChange={(e) => setSelectedRarity(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:ring-orange-400"
                >
                  <option value="">All Rarities</option>
                  <option value="common">Common</option>
                  <option value="uncommon">Uncommon</option>
                  <option value="rare">Rare</option>
                  <option value="legendary">Legendary</option>
                  <option value="exotic">Exotic</option>
                </select>
              </div>

              {/* Element */}
              <div>
                <label htmlFor="element" className="block text-sm font-medium text-gray-300 mb-2">
                  Element
                </label>
                <select
                  id="element"
                  value={selectedElement}
                  onChange={(e) => setSelectedElement(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:ring-orange-400"
                >
                  <option value="">All Elements</option>
                  <option value="kinetic">Kinetic</option>
                  <option value="arc">Arc</option>
                  <option value="solar">Solar</option>
                  <option value="void">Void</option>
                  <option value="stasis">Stasis</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={clearFilters}
                  className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
                >
                  Clear All Filters
                </button>
                <span className="text-sm text-gray-400">
                  {filteredAndSortedWeapons.length} weapons found
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <label htmlFor="sort" className="text-sm text-gray-300">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white text-sm focus:border-orange-400 focus:ring-orange-400"
                >
                  <option value="name">Name</option>
                  <option value="rarity">Rarity</option>
                  <option value="power">Power Level</option>
                  <option value="type">Weapon Type</option>
                </select>
              </div>
            </div>
          </div>

          {/* Weapons Grid */}
          {filteredAndSortedWeapons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedWeapons.map((weapon) => (
                <ItemCard key={weapon.id} item={weapon} />
              ))}
            </div>
          ) : (
            <div className="destiny-card p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-white mb-2">No weapons found</h3>
              <p className="text-gray-400 mb-4">
                Try adjusting your search terms or filters to find what you&apos;re looking for.
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}