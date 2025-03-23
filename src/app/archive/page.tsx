'use client'

import { FC, useEffect, useState } from 'react';
import { ArchivedRoast } from '@/types/archive';
import { archiveService } from '@/app/services/archiveService';
import ArchiveItem from '@/app/components/ArchiveItem';

const Archive: FC = () => {
  const [archivedRoasts, setArchivedRoasts] = useState<ArchivedRoast[]>([]);

  useEffect(() => {
    setArchivedRoasts(archiveService.getAllRoasts());
  }, []);

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

      <div className="space-y-8">
        {archivedRoasts.length === 0 ? (
          <div className="text-center p-12 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm">
            <div className="max-w-md mx-auto">
              <p className="text-2xl font-semibold text-gray-800 mb-2">No roasts yet!</p>
              <p className="text-gray-600">
                Submit some code to get roasted and build your collection of programming wisdom.
              </p>
            </div>
          </div>
        ) : (
          archivedRoasts.map(roast => (
            <ArchiveItem key={roast.id} item={roast} />
          ))
        )}
      </div>
    </main>
  );
};

export default Archive;
