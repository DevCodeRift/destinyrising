'use client';

import React, { useState, useEffect } from 'react';
import { Artifact, ArtifactSubmissionForm as ArtifactFormData, RollableStat } from '@/types/artifacts';

interface ArtifactSubmissionFormProps {
  onSubmit: (data: ArtifactFormData, files: File[]) => Promise<void>;
  className?: string;
}

export function ArtifactSubmissionForm({ onSubmit, className = '' }: ArtifactSubmissionFormProps) {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState<string>('');

  const [formData, setFormData] = useState<ArtifactFormData>({
    artifactId: '',
    submitterInfo: {
      username: '',
      email: '',
      anonymous: true,
    },
    setEffects: {
      effect1: '',
      effect2: '',
      effect3: '',
      effect4: '',
      effect5: '',
    },
    rollableAttributes: [],
    evidence: {
      screenshots: [],
      videoUrl: '',
      notes: '',
    },
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Load artifacts on component mount
  useEffect(() => {
    fetchArtifacts();
  }, []);

  const fetchArtifacts = async () => {
    try {
      const response = await fetch('/api/artifacts?limit=100');
      const data = await response.json();
      setArtifacts(data.artifacts || []);
    } catch (error) {
      console.error('Error fetching artifacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof FormData],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArtifactSelect = (artifactId: string) => {
    setSelectedArtifact(artifactId);
    setFormData(prev => ({
      ...prev,
      artifactId
    }));
  };

  const addRollableStat = () => {
    setFormData(prev => ({
      ...prev,
      rollableAttributes: [
        ...prev.rollableAttributes,
        {
          statName: '',
          minValue: 0,
          maxValue: 0,
          type: 'flat',
          rarity: 'common'
        }
      ]
    }));
  };

  const updateRollableStat = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      rollableAttributes: prev.rollableAttributes.map((stat, i) =>
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  const removeRollableStat = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rollableAttributes: prev.rollableAttributes.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        evidence: {
          ...prev.evidence!,
          screenshots: [...(prev.evidence?.screenshots || []), ...fileArray]
        }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.artifactId) {
      alert('Please select an artifact');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(formData, selectedFiles);
      // Reset form
      setFormData({
        artifactId: '',
        submitterInfo: {
          username: '',
          email: '',
          anonymous: true,
        },
        setEffects: {
          effect1: '',
          effect2: '',
          effect3: '',
          effect4: '',
          effect5: '',
        },
        rollableAttributes: [],
        evidence: {
          screenshots: [],
          videoUrl: '',
          notes: '',
        },
      });
      setSelectedArtifact('');
      setSelectedFiles([]);
      alert('Submission successful! Thank you for contributing.');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-lg text-gray-600">Loading artifacts...</div>
      </div>
    );
  }

  const selectedArtifactData = artifacts.find(a => a.id === selectedArtifact);
  const artifactsBySlot = artifacts.reduce((acc, artifact) => {
    if (!acc[artifact.slot]) acc[artifact.slot] = [];
    acc[artifact.slot].push(artifact);
    return acc;
  }, {} as Record<number, Artifact[]>);

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
        <h2 className="text-2xl font-bold">Contribute Artifact Data</h2>
        <p className="text-blue-100 mt-1">Help build the community database by sharing artifact effects and stats</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Artifact Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Artifact *
          </label>
          <select
            value={selectedArtifact}
            onChange={(e) => handleArtifactSelect(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Choose an artifact...</option>
            {Object.entries(artifactsBySlot).map(([slot, slotArtifacts]) => (
              <optgroup key={slot} label={`Slot ${slot}`}>
                {slotArtifacts.map(artifact => (
                  <option key={artifact.id} value={artifact.id}>
                    {artifact.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {selectedArtifactData && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{selectedArtifactData.name}</span>
                <span className="text-sm text-gray-500">Slot {selectedArtifactData.slot}</span>
                {selectedArtifactData.metadata.verified && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Verified</span>
                )}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Submissions: {selectedArtifactData.metadata.submissionCount}
              </div>
            </div>
          )}
        </div>

        {/* Submitter Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Submitter Information</h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.submitterInfo.anonymous}
                onChange={(e) => handleInputChange('submitterInfo.anonymous', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700">
                Submit anonymously
              </label>
            </div>

            {!formData.submitterInfo.anonymous && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.submitterInfo.username || ''}
                    onChange={(e) => handleInputChange('submitterInfo.username', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={formData.submitterInfo.email || ''}
                    onChange={(e) => handleInputChange('submitterInfo.email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Set Effects */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Set Effects</h3>
          <p className="text-sm text-gray-600 mb-4">
            Enter the effects that activate when wearing multiple pieces of this artifact set.
          </p>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(level => (
              <div key={level}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {level} Piece Effect
                </label>
                <textarea
                  value={formData.setEffects[`effect${level}` as keyof typeof formData.setEffects] || ''}
                  onChange={(e) => handleInputChange(`setEffects.effect${level}`, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder={`Effect when wearing ${level} piece${level > 1 ? 's' : ''} of this set...`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Rollable Attributes */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rollable Attributes</h3>
          <p className="text-sm text-gray-600 mb-4">
            Add stats that can be rolled on this artifact, including their possible ranges.
          </p>

          <div className="space-y-4">
            {formData.rollableAttributes.map((stat, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stat Name</label>
                    <input
                      type="text"
                      value={stat.statName}
                      onChange={(e) => updateRollableStat(index, 'statName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Attack"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Value</label>
                    <input
                      type="number"
                      value={stat.minValue}
                      onChange={(e) => updateRollableStat(index, 'minValue', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Value</label>
                    <input
                      type="number"
                      value={stat.maxValue}
                      onChange={(e) => updateRollableStat(index, 'maxValue', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={stat.type}
                      onChange={(e) => updateRollableStat(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="flat">Flat</option>
                      <option value="percentage">Percentage</option>
                      <option value="multiplier">Multiplier</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeRollableStat(index)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-md text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addRollableStat}
              className="w-full border-2 border-dashed border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600 py-3 px-4 rounded-lg transition-colors"
            >
              + Add Rollable Stat
            </button>
          </div>
        </div>

        {/* Evidence */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Evidence (Optional)</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Screenshots
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {selectedFiles.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  {selectedFiles.length} file(s) selected: {selectedFiles.map(f => f.name).join(', ')}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL (optional)
              </label>
              <input
                type="url"
                value={formData.evidence?.videoUrl || ''}
                onChange={(e) => handleInputChange('evidence.videoUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.evidence?.notes || ''}
                onChange={(e) => handleInputChange('evidence.notes', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Any additional information about this artifact..."
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="border-t pt-6">
          <button
            type="submit"
            disabled={submitting || !formData.artifactId}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {submitting ? 'Submitting...' : 'Submit Artifact Data'}
          </button>

          <p className="text-xs text-gray-500 mt-2 text-center">
            Your submission will be reviewed by our team before being added to the database.
          </p>
        </div>
      </form>
    </div>
  );
}