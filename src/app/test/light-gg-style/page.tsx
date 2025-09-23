'use client';

import React from 'react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { LightGGStyle } from '@/components/ui/LightGGStyle';

export default function LightGGStyleTestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-4">
          {/* Page Header */}
          <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Light.gg Style Interface</h1>
            <p className="text-gray-600">
              Clean, modern weapon display inspired by light.gg&apos;s design patterns with card-based layout and professional styling.
            </p>
          </div>

          {/* Interface */}
          <LightGGStyle />

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Clean Design</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Light background with card-based layout
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Professional typography and spacing
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Subtle shadows and modern aesthetics
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Tabbed navigation for content organization
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Interactive Features</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Overview, Perks, and Lore tabs
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Animated stat bars with colors
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Responsive grid layout
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Organized information hierarchy
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Content Organization</h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Detailed stats with visual progress bars
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Perk cards with authentic icons
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Sidebar with quick stats and sources
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Lore section with readable formatting
                </li>
              </ul>
            </div>
          </div>

          {/* Comparison */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Light.gg Inspired Design</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Design Principles</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Clean, minimalist aesthetic</li>
                  <li>• Light background for readability</li>
                  <li>• Card-based information organization</li>
                  <li>• Professional color scheme</li>
                  <li>• Clear visual hierarchy</li>
                  <li>• Responsive and accessible</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Tabbed content navigation</li>
                  <li>• Color-coded stat visualization</li>
                  <li>• Authentic weapon icons and assets</li>
                  <li>• Organized perk display</li>
                  <li>• Quick stats sidebar</li>
                  <li>• Source information display</li>
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