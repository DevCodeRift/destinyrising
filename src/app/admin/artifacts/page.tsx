'use client';

import React from 'react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { ArtifactAdmin } from '@/components/ui/ArtifactAdmin';

export default function AdminArtifactsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-4">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Artifact Database Administration</h1>
                <p className="text-gray-600 mt-1">
                  Manage artifact data and review community submissions
                </p>
              </div>

              <div className="flex space-x-3">
                <a
                  href="/contribute/artifacts"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  View Public Form
                </a>
                <a
                  href="/artifacts"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  View Public Database
                </a>
              </div>
            </div>
          </div>

          {/* Admin Interface */}
          <ArtifactAdmin />

          {/* Admin Guidelines */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Verification Process</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Review all submitted data for accuracy</li>
                  <li>• Check evidence (screenshots, videos) when provided</li>
                  <li>• Cross-reference with existing verified data</li>
                  <li>• Test effects in-game when possible</li>
                  <li>• Approve only complete and accurate submissions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quality Standards</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Set effects must be complete and clearly described</li>
                  <li>• Stat ranges should be based on multiple observations</li>
                  <li>• Reject submissions with obvious errors or spam</li>
                  <li>• Provide clear feedback when rejecting</li>
                  <li>• Update artifact verification status appropriately</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Reminders</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Always verify data before approving submissions</li>
                <li>• Keep detailed notes on verification decisions</li>
                <li>• Regularly backup the database</li>
                <li>• Monitor for spam or duplicate submissions</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}