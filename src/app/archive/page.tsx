'use client'

import { FC, useEffect, useState } from 'react';
import { ArchivedRoast } from '@/types/archive';
import { archiveService } from '@/app/services/archiveService';
import ArchiveItem from '@/app/components/ArchiveItem';
import ShameScoreFilter from '@/app/components/ShameScoreFilter';

const Archive: FC = () => {
  const [archivedRoasts, setArchivedRoasts] = useState<ArchivedRoast[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setArchivedRoasts(archiveService.getAllRoasts());
  }, []);

  const filteredRoasts = archivedRoasts.filter(roast => {
    if (!roast.score) return false;
    switch (filter) {
      case 'low':
        return roast.score >= 0 && roast.score <= 3;
      case 'medium':
        return roast.score >= 4 && roast.score <= 7;
      case 'high':
        return roast.score >= 8 && roast.score <= 10;
      default:
        return true;
    }
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl uppercase font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Code Roast Archive
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your collection of brutal honesty and programming wisdom
        </p>
      </header>

      <ShameScoreFilter currentFilter={filter} onFilterChange={setFilter} />

      <div className="space-y-8">
        {filteredRoasts.length === 0 ? (
          <div className="text-center p-12 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm">
            <div className="max-w-md mx-auto">
              <p className="text-2xl font-semibold text-gray-800 mb-2">
                {archivedRoasts.length === 0 ? 'No roasts yet!' : 'No roasts match the selected filter'}
              </p>
              <p className="text-gray-600">
                {archivedRoasts.length === 0
                  ? 'Submit some code to get roasted and build your collection of programming wisdom.'
                  : 'Try selecting a different filter to see more roasts.'}
              </p>
            </div>
          </div>
        ) : (
          filteredRoasts.map(roast => (
            <ArchiveItem key={roast.id} item={roast} />
          ))
        )}
      </div>
    </main>
  );
};

export default Archive;
