'use client';

import React, { useState, useEffect } from 'react';
import { Artifact, ArtifactSubmission } from '@/types/artifacts';

interface ArtifactAdminProps {
  className?: string;
}

interface AdminStats {
  totalArtifacts: number;
  verifiedArtifacts: number;
  pendingSubmissions: number;
  totalSubmissions: number;
  recentActivity: {
    newSubmissions: number;
    verifiedToday: number;
    lastWeek: number;
  };
}

export function ArtifactAdmin({ className = '' }: ArtifactAdminProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'artifacts' | 'submissions'>('overview');
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [submissions, setSubmissions] = useState<ArtifactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalArtifacts: 0,
    verifiedArtifacts: 0,
    pendingSubmissions: 0,
    totalSubmissions: 0,
    recentActivity: {
      newSubmissions: 0,
      verifiedToday: 0,
      lastWeek: 0,
    }
  });

  // Filters
  const [artifactFilters, setArtifactFilters] = useState({
    slot: '',
    verified: '',
    search: '',
  });

  const [submissionFilters, setSubmissionFilters] = useState({
    status: 'pending',
    artifactId: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load artifacts
      const artifactsResponse = await fetch('/api/artifacts?limit=100');
      const artifactsData = await artifactsResponse.json();
      setArtifacts(artifactsData.artifacts || []);

      // Load submissions
      const submissionsResponse = await fetch('/api/artifacts/submissions?limit=50');
      const submissionsData = await submissionsResponse.json();
      setSubmissions(submissionsData.submissions || []);

      // Calculate stats
      const totalArtifacts = artifactsData.artifacts?.length || 0;
      const verifiedArtifacts = artifactsData.artifacts?.filter((a: Artifact) => a.metadata.verified).length || 0;
      const pendingSubmissions = submissionsData.submissions?.filter((s: ArtifactSubmission) => s.status === 'pending').length || 0;
      const totalSubmissions = submissionsData.submissions?.length || 0;

      setStats({
        totalArtifacts,
        verifiedArtifacts,
        pendingSubmissions,
        totalSubmissions,
        recentActivity: {
          newSubmissions: pendingSubmissions,
          verifiedToday: 0, // Would calculate from timestamps
          lastWeek: totalSubmissions,
        }
      });

    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveSubmission = async (submissionId: string) => {
    try {
      const response = await fetch(`/api/artifacts/submissions/${submissionId}/approve`, {
        method: 'PUT',
      });

      if (response.ok) {
        await loadData(); // Reload data
        alert('Submission approved successfully');
      } else {
        alert('Failed to approve submission');
      }
    } catch (error) {
      console.error('Error approving submission:', error);
      alert('Error approving submission');
    }
  };

  const rejectSubmission = async (submissionId: string) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    try {
      const response = await fetch(`/api/artifacts/submissions/${submissionId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });

      if (response.ok) {
        await loadData(); // Reload data
        alert('Submission rejected');
      } else {
        alert('Failed to reject submission');
      }
    } catch (error) {
      console.error('Error rejecting submission:', error);
      alert('Error rejecting submission');
    }
  };

  const updateArtifact = async (artifactId: string, updates: Partial<Artifact>) => {
    try {
      const response = await fetch('/api/artifacts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artifactId, updates }),
      });

      if (response.ok) {
        await loadData(); // Reload data
        alert('Artifact updated successfully');
      } else {
        alert('Failed to update artifact');
      }
    } catch (error) {
      console.error('Error updating artifact:', error);
      alert('Error updating artifact');
    }
  };

  const filteredArtifacts = artifacts.filter(artifact => {
    if (artifactFilters.slot && artifact.slot.toString() !== artifactFilters.slot) return false;
    if (artifactFilters.verified && artifact.metadata.verified.toString() !== artifactFilters.verified) return false;
    if (artifactFilters.search && !artifact.name.toLowerCase().includes(artifactFilters.search.toLowerCase())) return false;
    return true;
  });

  const filteredSubmissions = submissions.filter(submission => {
    if (submissionFilters.status && submission.status !== submissionFilters.status) return false;
    if (submissionFilters.artifactId && submission.artifactId !== submissionFilters.artifactId) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-lg text-gray-600">Loading admin data...</div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="bg-gray-800 text-white px-6 py-4 rounded-t-lg">
        <h2 className="text-2xl font-bold">Artifact Database Admin</h2>
        <p className="text-gray-300 mt-1">Manage artifacts and review community submissions</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'artifacts', label: 'Artifacts' },
            { id: 'submissions', label: `Submissions (${stats.pendingSubmissions})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalArtifacts}</div>
                <div className="text-sm text-gray-600">Total Artifacts</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.verifiedArtifacts}</div>
                <div className="text-sm text-gray-600">Verified Artifacts</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.pendingSubmissions}</div>
                <div className="text-sm text-gray-600">Pending Reviews</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalSubmissions}</div>
                <div className="text-sm text-gray-600">Total Submissions</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">New submissions today:</span>
                  <span className="font-medium">{stats.recentActivity.newSubmissions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Artifacts verified today:</span>
                  <span className="font-medium">{stats.recentActivity.verifiedToday}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Submissions this week:</span>
                  <span className="font-medium">{stats.recentActivity.lastWeek}</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-800 mb-2">Action Required</h4>
              <p className="text-red-700 text-sm">
                {stats.pendingSubmissions > 0
                  ? `${stats.pendingSubmissions} submissions are waiting for review.`
                  : 'All submissions have been reviewed!'}
              </p>
            </div>
          </div>
        )}

        {/* Artifacts Tab */}
        {activeTab === 'artifacts' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slot</label>
                  <select
                    value={artifactFilters.slot}
                    onChange={(e) => setArtifactFilters(prev => ({ ...prev, slot: e.target.value }))}
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
                    value={artifactFilters.verified}
                    onChange={(e) => setArtifactFilters(prev => ({ ...prev, verified: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Status</option>
                    <option value="true">Verified</option>
                    <option value="false">Unverified</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <input
                    type="text"
                    value={artifactFilters.search}
                    onChange={(e) => setArtifactFilters(prev => ({ ...prev, search: e.target.value }))}
                    placeholder="Search artifacts..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Artifacts List */}
            <div className="space-y-4">
              {filteredArtifacts.map(artifact => (
                <div key={artifact.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{artifact.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-500">Slot {artifact.slot}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">
                            {artifact.metadata.submissionCount} submissions
                          </span>
                          {artifact.metadata.verified && (
                            <>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Verified
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          const verified = !artifact.metadata.verified;
                          updateArtifact(artifact.id, {
                            metadata: { ...artifact.metadata, verified }
                          });
                        }}
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          artifact.metadata.verified
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        {artifact.metadata.verified ? 'Unverify' : 'Verify'}
                      </button>
                    </div>
                  </div>

                  {/* Show set effects if any */}
                  {Object.values(artifact.setEffects).some(effect => effect) && (
                    <div className="mt-3 p-3 bg-gray-50 rounded">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Set Effects:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        {Object.entries(artifact.setEffects).map(([level, effect]) => {
                          if (!effect) return null;
                          const pieceCount = level.replace('effect', '');
                          return (
                            <div key={level}>
                              <span className="font-medium">{pieceCount} piece:</span> {effect}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={submissionFilters.status}
                    onChange={(e) => setSubmissionFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Artifact</label>
                  <select
                    value={submissionFilters.artifactId}
                    onChange={(e) => setSubmissionFilters(prev => ({ ...prev, artifactId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Artifacts</option>
                    {artifacts.map(artifact => (
                      <option key={artifact.id} value={artifact.id}>
                        {artifact.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submissions List */}
            <div className="space-y-4">
              {filteredSubmissions.map(submission => {
                const artifact = artifacts.find(a => a.id === submission.artifactId);
                return (
                  <div key={submission.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {artifact?.name || 'Unknown Artifact'}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded ${
                            submission.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : submission.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {submission.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="text-sm text-gray-600 mb-3">
                          Submitted {new Date(submission.metadata.submittedAt).toLocaleDateString()} by{' '}
                          {submission.submitterInfo.anonymous
                            ? 'Anonymous'
                            : submission.submitterInfo.username || 'Unknown User'}
                        </div>

                        {/* Set Effects */}
                        {Object.values(submission.submissionData.setEffects).some(effect => effect) && (
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Set Effects:</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              {Object.entries(submission.submissionData.setEffects).map(([level, effect]) => {
                                if (!effect) return null;
                                const pieceCount = level.replace('effect', '');
                                return (
                                  <div key={level} className="pl-2">
                                    <span className="font-medium">{pieceCount} piece:</span> {effect}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Rollable Stats */}
                        {submission.submissionData.rollableAttributes.length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Rollable Stats:</h4>
                            <div className="text-sm text-gray-600">
                              {submission.submissionData.rollableAttributes.map((stat, index) => (
                                <div key={index} className="pl-2">
                                  {stat.name}: {stat.minValue}-{stat.maxValue} ({stat.type})
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        {submission.submissionData.notes && (
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Notes:</h4>
                            <p className="text-sm text-gray-600 pl-2">{submission.submissionData.notes}</p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      {submission.status === 'pending' && (
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => approveSubmission(submission.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectSubmission(submission.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredSubmissions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No submissions found matching the current filters.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}