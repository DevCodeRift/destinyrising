'use client';

import React from 'react';
import { Artifact } from '@/types/artifacts';

interface ArtifactCardProps {
  artifact: Artifact;
  onClick?: (artifact: Artifact) => void;
  className?: string;
}

export function ArtifactCard({ artifact, onClick, className = '' }: ArtifactCardProps) {
  const hasSetEffects = Object.values(artifact.setEffects).some(effect => effect && effect.trim().length > 0);
  const hasRollableStats = artifact.rollableAttributes.primaryStats.length > 0 || artifact.rollableAttributes.secondaryStats.length > 0;

  const getSlotColor = (slot: number) => {
    switch (slot) {
      case 1: return 'bg-red-100 text-red-800';
      case 2: return 'bg-blue-100 text-blue-800';
      case 3: return 'bg-green-100 text-green-800';
      case 4: return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={() => onClick?.(artifact)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-1">{artifact.name}</h3>
          <div className="flex items-center space-x-2">
            <span className={`text-xs px-2 py-1 rounded font-medium ${getSlotColor(artifact.slot)}`}>
              Slot {artifact.slot}
            </span>
            {artifact.metadata.verified && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                ✓ Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {artifact.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{artifact.description}</p>
      )}

      {/* Data Status */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Set Effects:</span>
          <span className={`font-medium ${hasSetEffects ? 'text-green-600' : 'text-gray-400'}`}>
            {hasSetEffects ? 'Available' : 'Missing'}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Rollable Stats:</span>
          <span className={`font-medium ${hasRollableStats ? 'text-green-600' : 'text-gray-400'}`}>
            {hasRollableStats ? 'Available' : 'Missing'}
          </span>
        </div>
      </div>

      {/* Set Effects Preview */}
      {hasSetEffects && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Set Effects:</h4>
          <div className="space-y-1">
            {Object.entries(artifact.setEffects).map(([level, effect]) => {
              if (!effect) return null;
              const pieceCount = level.replace('effect', '');
              return (
                <div key={level} className="text-xs text-gray-600">
                  <span className="font-medium">{pieceCount}pc:</span> {effect.length > 50 ? `${effect.substring(0, 50)}...` : effect}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stats Preview */}
      {hasRollableStats && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Available Stats:</h4>
          <div className="flex flex-wrap gap-1">
            {[...artifact.rollableAttributes.primaryStats, ...artifact.rollableAttributes.secondaryStats]
              .slice(0, 3)
              .map((stat, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {stat.name}
              </span>
            ))}
            {(artifact.rollableAttributes.primaryStats.length + artifact.rollableAttributes.secondaryStats.length) > 3 && (
              <span className="text-xs text-gray-500">
                +{(artifact.rollableAttributes.primaryStats.length + artifact.rollableAttributes.secondaryStats.length) - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          {artifact.metadata.submissionCount} submission{artifact.metadata.submissionCount !== 1 ? 's' : ''}
        </div>
        <div className="text-xs text-gray-500">
          Updated {new Date(artifact.metadata.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}