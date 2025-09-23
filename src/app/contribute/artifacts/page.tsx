'use client';

import React from 'react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { ArtifactSubmissionForm } from '@/components/ui/ArtifactSubmissionForm';
import { ArtifactSubmissionForm as ArtifactFormData } from '@/types/artifacts';

export default function ContributeArtifactsPage() {
  const handleSubmission = async (data: ArtifactFormData, files: File[]) => {
    const formData = new FormData();

    // Add JSON data
    formData.append('data', JSON.stringify({
      artifactId: data.artifactId,
      submitterInfo: data.submitterInfo,
      submissionData: {
        setEffects: data.setEffects,
        rollableAttributes: data.rollableAttributes.map(stat => ({
          name: stat.statName,
          minValue: stat.minValue,
          maxValue: stat.maxValue,
          type: stat.type,
          rarity: stat.rarity || 'common',
        })),
        notes: data.evidence?.notes || '',
      },
      evidence: {
        videoUrl: data.evidence?.videoUrl || '',
        notes: data.evidence?.notes || '',
      },
    }));

    // Add files
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch('/api/artifacts/submissions', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to submit');
    }

    return response.json();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto p-4">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contribute Artifact Data</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Help build the most comprehensive Destiny Rising artifact database by sharing your discoveries.
              Your contributions help the entire community understand artifact effects and optimal stat ranges.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">80</div>
              <div className="text-sm text-gray-600">Total Artifacts</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">0</div>
              <div className="text-sm text-gray-600">Verified Effects</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
              <div className="text-sm text-gray-600">Community Submissions</div>
            </div>
          </div>

          {/* Submission Form */}
          <ArtifactSubmissionForm onSubmit={handleSubmission} />

          {/* Guidelines */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Submission Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What to Submit</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Set effect descriptions for 1-5 pieces</li>
                  <li>• Rollable stat ranges you&apos;ve observed</li>
                  <li>• Screenshots of artifact details</li>
                  <li>• Any unique interactions or behaviors</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quality Standards</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Provide accurate, tested information</li>
                  <li>• Include evidence when possible</li>
                  <li>• Use clear, descriptive language</li>
                  <li>• Report exact stat ranges observed</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Community Recognition</h4>
              <p className="text-blue-800 text-sm">
                Contributors who provide high-quality, verified data will be recognized in our community
                database. Anonymous submissions are welcome and equally valued.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How long does it take for submissions to be reviewed?
                </h3>
                <p className="text-gray-600">
                  Most submissions are reviewed within 24-48 hours. Complex submissions with multiple
                  effects may take longer to verify.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What happens if my submission is rejected?
                </h3>
                <p className="text-gray-600">
                  If a submission is rejected, you&apos;ll receive feedback on why it was declined and
                  suggestions for improvement. You can always resubmit with corrections.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I edit my submission after submitting?
                </h3>
                <p className="text-gray-600">
                  Currently, you cannot edit submissions after they&apos;re sent. Please review your
                  information carefully before submitting. You can submit additional data for the same artifact.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How do I report incorrect information in the database?
                </h3>
                <p className="text-gray-600">
                  You can submit a correction by creating a new submission for the same artifact with
                  the correct information and noting the discrepancy in the evidence section.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}