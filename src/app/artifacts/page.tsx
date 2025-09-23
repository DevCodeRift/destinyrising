'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { ArtifactCard } from '@/components/ui/ArtifactCard';
import { Artifact, ArtifactSearchFilters } from '@/types/artifacts';

export default function ArtifactsPage() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState<ArtifactSearchFilters>({
    slot: undefined,
    verified: undefined,
    search: '',
    hasSetEffects: undefined,
    hasRollableStats: undefined,
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    withSetEffects: 0,
    withStats: 0,
  });

  useEffect(() => {
    fetchArtifacts();
  }, [filters]);

  const fetchArtifacts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.slot) params.append('slot', filters.slot.toString());
      if (filters.verified !== undefined) params.append('verified', filters.verified.toString());
      if (filters.search) params.append('search', filters.search);
      if (filters.hasSetEffects !== undefined) params.append('hasSetEffects', filters.hasSetEffects.toString());
      if (filters.hasRollableStats !== undefined) params.append('hasRollableStats', filters.hasRollableStats.toString());
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
      params.append('limit', '100');

      const response = await fetch(`/api/artifacts?${params.toString()}`);
      const data = await response.json();

      setArtifacts(data.artifacts || []);

      // Calculate stats
      const allArtifacts = data.artifacts || [];
      const verified = allArtifacts.filter((a: Artifact) => a.metadata.verified);
      const withSetEffects = allArtifacts.filter((a: Artifact) =>
        Object.values(a.setEffects).some(effect => effect && effect.trim().length > 0)
      );
      const withStats = allArtifacts.filter((a: Artifact) =>
        a.rollableAttributes.primaryStats.length > 0 || a.rollableAttributes.secondaryStats.length > 0
      );

      setStats({
        total: allArtifacts.length,
        verified: verified.length,
        withSetEffects: withSetEffects.length,
        withStats: withStats.length,
      });

    } catch (error) {
      console.error('Error fetching artifacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field: keyof ArtifactSearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArtifactClick = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedArtifact(null);
  };

  const hasSetEffects = (artifact: Artifact) =>
    Object.values(artifact.setEffects).some(effect => effect && effect.trim().length > 0);

  const hasRollableStats = (artifact: Artifact) =>
    artifact.rollableAttributes.primaryStats.length > 0 || artifact.rollableAttributes.secondaryStats.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto p-4">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Artifact Database</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse the complete collection of Destiny Rising artifacts. Discover set effects, rollable stats, and community-verified data.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Artifacts</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{stats.verified}</div>
              <div className="text-sm text-gray-600">Verified</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{stats.withSetEffects}</div>
              <div className="text-sm text-gray-600">With Set Effects</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{stats.withStats}</div>
              <div className="text-sm text-gray-600">With Rollable Stats</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Artifacts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slot</label>
                <select
                  value={filters.slot || ''}
                  onChange={(e) => handleFilterChange('slot', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Slots</option>
                  <option value="1">Slot 1</option>
                  <option value="2">Slot 2</option>
                  <option value="3">Slot 3</option>
                  <option value="4">Slot 4</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filters.verified?.toString() || ''}
                  onChange={(e) => handleFilterChange('verified', e.target.value === '' ? undefined : e.target.value === 'true')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="true">Verified Only</option>
                  <option value="false">Unverified Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
                <select
                  value={filters.hasSetEffects?.toString() || ''}
                  onChange={(e) => handleFilterChange('hasSetEffects', e.target.value === '' ? undefined : e.target.value === 'true')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Data</option>
                  <option value="true">With Set Effects</option>
                  <option value="false">Missing Set Effects</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy || 'name'}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Name</option>
                  <option value="slot">Slot</option>
                  <option value="updated">Recently Updated</option>
                  <option value="submissions">Most Submissions</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={filters.search || ''}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search artifact names..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contribute CTA */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Help Build the Database</h3>
                <p className="text-blue-800">
                  Missing data for your favorite artifacts? Contribute set effects and stat ranges to help the community.
                </p>
              </div>
              <a
                href="/contribute/artifacts"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex-shrink-0 ml-4"
              >
                Contribute Data
              </a>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-lg text-gray-600">Loading artifacts...</div>
            </div>
          )}

          {/* Artifacts Grid */}
          {!loading && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {artifacts.length} Artifact{artifacts.length !== 1 ? 's' : ''} Found
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1"
                  >
                    <span>{filters.sortOrder === 'asc' ? '↑' : '↓'}</span>
                    <span>{filters.sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artifacts.map(artifact => (
                  <ArtifactCard
                    key={artifact.id}
                    artifact={artifact}
                    onClick={handleArtifactClick}
                  />
                ))}
              </div>

              {artifacts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg mb-2">No artifacts found</div>
                  <p className="text-gray-400">Try adjusting your filters to see more results.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Artifact Detail Modal */}
      {showModal && selectedArtifact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedArtifact.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-sm px-2 py-1 rounded font-medium ${
                    selectedArtifact.slot === 1 ? 'bg-red-100 text-red-800' :
                    selectedArtifact.slot === 2 ? 'bg-blue-100 text-blue-800' :
                    selectedArtifact.slot === 3 ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    Slot {selectedArtifact.slot}
                  </span>
                  {selectedArtifact.metadata.verified && (
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              {selectedArtifact.description && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedArtifact.description}</p>
                </div>
              )}

              {/* Set Effects */}
              {hasSetEffects(selectedArtifact) && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Set Effects</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedArtifact.setEffects).map(([level, effect]) => {
                      if (!effect) return null;
                      const pieceCount = level.replace('effect', '');
                      return (
                        <div key={level} className="border border-gray-200 rounded-lg p-3">
                          <div className="font-medium text-gray-900 mb-1">
                            {pieceCount} Piece{pieceCount !== '1' ? 's' : ''}
                          </div>
                          <div className="text-gray-600">{effect}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Rollable Stats */}
              {hasRollableStats(selectedArtifact) && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Rollable Stats</h4>

                  {selectedArtifact.rollableAttributes.primaryStats.length > 0 && (
                    <div className="mb-4">
                      <h5 className="font-medium text-gray-800 mb-2">Primary Stats</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedArtifact.rollableAttributes.primaryStats.map((stat, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3">
                            <div className="font-medium text-gray-900">{stat.name}</div>
                            <div className="text-sm text-gray-600">
                              Range: {stat.minValue}-{stat.maxValue} ({stat.type})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedArtifact.rollableAttributes.secondaryStats.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Secondary Stats</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedArtifact.rollableAttributes.secondaryStats.map((stat, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3">
                            <div className="font-medium text-gray-900">{stat.name}</div>
                            <div className="text-sm text-gray-600">
                              Range: {stat.minValue}-{stat.maxValue} ({stat.type})
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Missing Data Notice */}
              {!hasSetEffects(selectedArtifact) && !hasRollableStats(selectedArtifact) && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Missing Data</h4>
                  <p className="text-yellow-700 text-sm mb-3">
                    This artifact doesn&apos;t have complete set effect or rollable stat information yet.
                  </p>
                  <a
                    href="/contribute/artifacts"
                    className="text-yellow-800 hover:text-yellow-900 font-medium text-sm underline"
                  >
                    Help contribute data for this artifact →
                  </a>
                </div>
              )}

              {/* Metadata */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Artifact Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Community Submissions:</span>
                    <span className="ml-2 font-medium">{selectedArtifact.metadata.submissionCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="ml-2 font-medium">
                      {new Date(selectedArtifact.metadata.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}