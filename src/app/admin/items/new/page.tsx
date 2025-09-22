'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ImageUpload, useImageUpload } from '@/components/admin/ImageUpload';

export default function NewItemPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    loreText: '',
    itemType: '',
    rarity: '',
    element: '',
    powerLevel: '',
    source: '',
    isCraftable: false,
    isSunset: false,
  });

  const { images, addImage, removeImage } = useImageUpload();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    console.log('Images:', images);
    // TODO: Implement form submission
  };

  return (
    <div className="px-4 sm:px-0">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Item</h1>
            <p className="mt-2 text-sm text-gray-700">
              Create a new weapon, armor piece, artifact, or other item.
            </p>
          </div>
          <Link
            href="/admin/items"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
          </div>
          <div className="px-6 py-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="e.g., Fatebringer"
                />
              </div>

              <div>
                <label htmlFor="powerLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Power Level
                </label>
                <input
                  type="number"
                  id="powerLevel"
                  name="powerLevel"
                  value={formData.powerLevel}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="1350"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Brief description of the item..."
              />
            </div>

            <div>
              <label htmlFor="loreText" className="block text-sm font-medium text-gray-700 mb-1">
                Lore Text
              </label>
              <textarea
                id="loreText"
                name="loreText"
                rows={4}
                value={formData.loreText}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Lore and background story..."
              />
            </div>

            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                Source
              </label>
              <input
                type="text"
                id="source"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="e.g., Vault of Glass, Vendor, World Drop"
              />
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Classification</h3>
          </div>
          <div className="px-6 py-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="itemType" className="block text-sm font-medium text-gray-700 mb-1">
                  Item Type *
                </label>
                <select
                  id="itemType"
                  name="itemType"
                  required
                  value={formData.itemType}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select item type</option>
                  <optgroup label="Weapons">
                    <option value="hand-cannon">Hand Cannon</option>
                    <option value="auto-rifle">Auto Rifle</option>
                    <option value="scout-rifle">Scout Rifle</option>
                    <option value="pulse-rifle">Pulse Rifle</option>
                    <option value="sniper-rifle">Sniper Rifle</option>
                    <option value="shotgun">Shotgun</option>
                    <option value="fusion-rifle">Fusion Rifle</option>
                    <option value="rocket-launcher">Rocket Launcher</option>
                    <option value="machine-gun">Machine Gun</option>
                    <option value="sword">Sword</option>
                  </optgroup>
                  <optgroup label="Armor">
                    <option value="helmet">Helmet</option>
                    <option value="gauntlets">Gauntlets</option>
                    <option value="chest-armor">Chest Armor</option>
                    <option value="leg-armor">Leg Armor</option>
                    <option value="class-item">Class Item</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label htmlFor="rarity" className="block text-sm font-medium text-gray-700 mb-1">
                  Rarity *
                </label>
                <select
                  id="rarity"
                  name="rarity"
                  required
                  value={formData.rarity}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select rarity</option>
                  <option value="common">Common</option>
                  <option value="uncommon">Uncommon</option>
                  <option value="rare">Rare</option>
                  <option value="legendary">Legendary</option>
                  <option value="exotic">Exotic</option>
                </select>
              </div>

              <div>
                <label htmlFor="element" className="block text-sm font-medium text-gray-700 mb-1">
                  Element
                </label>
                <select
                  id="element"
                  name="element"
                  value={formData.element}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">No element / Kinetic</option>
                  <option value="arc">Arc</option>
                  <option value="solar">Solar</option>
                  <option value="void">Void</option>
                  <option value="stasis">Stasis</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  id="isCraftable"
                  name="isCraftable"
                  type="checkbox"
                  checked={formData.isCraftable}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isCraftable" className="ml-2 block text-sm text-gray-900">
                  Craftable
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="isSunset"
                  name="isSunset"
                  type="checkbox"
                  checked={formData.isSunset}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isSunset" className="ml-2 block text-sm text-gray-900">
                  Sunset (Legacy item)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Images</h3>
          </div>
          <div className="px-6 py-4 space-y-6">
            <ImageUpload
              onUpload={addImage}
              folder="items"
              className="w-full"
            />

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={image.url} className="relative group">
                    <Image
                      src={image.url}
                      alt={`Upload ${index + 1}`}
                      width={200}
                      height={128}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.url)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-3">
          <Link
            href="/admin/items"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Item
          </button>
        </div>
      </form>
    </div>
  );
}