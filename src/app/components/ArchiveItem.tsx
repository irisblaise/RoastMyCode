import { FC } from 'react';
import { ArchiveItemProps } from '@/types/archive';
import ShameScore from './ShameScore';

const ArchiveItem: FC<ArchiveItemProps> = ({ item }) => {
  return (
    <div className="space-y-6 p-8 backdrop-blur-sm bg-white/30 rounded-lg border border-gray-200 shadow-lg">
      <div className="flex items-start gap-8">
        <div className="flex-1">
          <time className="block text-sm text-gray-500 mb-4" dateTime={item.timestamp}>
            {new Date(item.timestamp).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </time>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Code Snippet</h3>
            <pre className="bg-gray-50/80 backdrop-blur-sm rounded-lg p-4 overflow-x-auto border border-gray-100">
              <code className="text-sm text-gray-800 font-mono">{item.code}</code>
            </pre>
          </div>

          {item.roast && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">The Roast</h3>
              <p className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
                {item.roast}
              </p>
            </div>
          )}

          {item.explanation && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Explanation</h3>
              <p className="text-gray-600">
                {item.explanation}
              </p>
            </div>
          )}
        </div>
        
        {item.score !== null && (
          <div className="w-32 flex-shrink-0">
            <ShameScore score={item.score} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchiveItem;
