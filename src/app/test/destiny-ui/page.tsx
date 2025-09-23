'use client';

import React from 'react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { ChaperoneLikeInterface } from '@/components/ui/ChaperoneLikeInterface';


export default function DestinyUITestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-4">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white mb-2">The Chaperone Interface</h1>
            <p className="text-gray-400">
              Exact recreation of The Chaperone interface from your screenshots.
            </p>
          </div>

          {/* Interface */}
          <div className="bg-black rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
            <ChaperoneLikeInterface />
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
                  Click catalyst diamond slots to view catalyst info
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gray-500 rounded-full mr-3"></div>
                  Right panel appears with detailed information
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Click again to close panels
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-bold text-white mb-4">Screenshot Recreation</h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Golden header with weapon name and power
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Gear level badge exactly as shown
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Trait circles and catalyst diamonds
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Stats layout matching screenshots
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}