'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { ItemCard, type Item } from '@/components/ui/ItemCard';

// Extended sample data for testing
const sampleItems: Item[] = [
  {
    id: '1',
    name: 'Fatebringer',
    slug: 'fatebringer',
    description: 'A legendary hand cannon known for its precision and power. Delivers devastating damage to enemies.',
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
    description: 'An exotic rocket launcher that fires tracking rockets with explosive wolfpack rounds.',
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
    description: 'A scout rifle with solar damage capabilities and excellent range.',
    itemType: 'Scout Rifle',
    rarity: 'legendary',
    element: 'solar',
    powerLevel: 1340,
  },
  {
    id: '4',
    name: 'Thorn',
    slug: 'thorn',
    description: 'An exotic hand cannon that deals poison damage over time.',
    itemType: 'Hand Cannon',
    rarity: 'exotic',
    element: 'void',
    powerLevel: 1365,
    isCraftable: false,
  },
  {
    id: '5',
    name: 'Saint-14 Helm',
    slug: 'saint-14-helm',
    description: 'An exotic helmet that enhances Ward of Dawn abilities.',
    itemType: 'Helmet',
    rarity: 'exotic',
    powerLevel: 1360,
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
  {
    id: '8',
    name: 'Dreaming City Plate',
    slug: 'dreaming-city-plate',
    description: 'Legendary chest armor from the Dreaming City.',
    itemType: 'Chest Armor',
    rarity: 'legendary',
    powerLevel: 1340,
  },
];

export default function ItemsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [selectedElement, setSelectedElement] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedItems = useMemo(() => {
    const filtered = sampleItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.itemType.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !selectedCategory ||
                             (selectedCategory === 'weapons' && ['Hand Cannon', 'Rocket Launcher', 'Scout Rifle'].includes(item.itemType)) ||
                             (selectedCategory === 'armor' && ['Helmet', 'Chest Armor', 'Gauntlets', 'Leg Armor', 'Class Item'].includes(item.itemType));

      const matchesRarity = !selectedRarity || item.rarity === selectedRarity;
      const matchesElement = !selectedElement || item.element === selectedElement;

      return matchesSearch && matchesCategory && matchesRarity && matchesElement;
    });

    // Sort items
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
  }, [searchTerm, selectedCategory, selectedRarity, selectedElement, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedRarity('');
    setSelectedElement('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">All Items</h1>
            <p className="text-lg text-gray-300">
              Browse and discover all weapons, armor, and gear in Destiny Rising.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="destiny-card p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                  Search Items
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, description, or type..."
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-orange-400 focus:ring-orange-400"
                  />
                  <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:ring-orange-400"
                >
                  <option value="">All Categories</option>
                  <option value="weapons">Weapons</option>
                  <option value="armor">Armor</option>
                  <option value="artifacts">Artifacts</option>
                  <option value="resources">Resources</option>
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

              {/* Sort */}
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-orange-400 focus:ring-orange-400"
                >
                  <option value="name">Name</option>
                  <option value="rarity">Rarity</option>
                  <option value="power">Power Level</option>
                  <option value="type">Item Type</option>
                </select>
              </div>
            </div>

            {/* Filter actions and view mode */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={clearFilters}
                  className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
                >
                  Clear All Filters
                </button>
                <span className="text-sm text-gray-400">
                  {filteredAndSortedItems.length} items found
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">View:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Items Grid/List */}
          {filteredAndSortedItems.length > 0 ? (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredAndSortedItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  className={viewMode === 'list' ? 'flex-1' : ''}
                />
              ))}
            </div>
          ) : (
            <div className="destiny-card p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-medium text-white mb-2">No items found</h3>
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