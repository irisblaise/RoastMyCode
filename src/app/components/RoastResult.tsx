import { type FC } from 'react';
import type { RoastResponse } from '@/types/roast';
import ShameScore from './ShameScore';

interface RoastResultProps {
  result: RoastResponse;
  isLoading: boolean;
}

const RoastResult: FC<RoastResultProps> = ({ 
  result: { roast, score, explanation, error },
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="text-center p-8 backdrop-blur-sm bg-white/30 rounded-lg border border-gray-200 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 backdrop-blur-sm bg-white/30 rounded-lg border border-red-200 shadow-lg">
        <p className="text-red-500 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
          {error}
        </p>
      </div>
    );
  }

  if (!roast || score === null) {
    return null;
  }

  return (
    <div className="space-y-6 p-8 mt-4 backdrop-blur-sm bg-white/30 rounded-lg border border-gray-200 shadow-lg">
      <div className="flex items-start gap-8">
        <div className="flex-1">
          <p className="text-xl font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
            {roast}
          </p>
          {explanation && (
            <p className="text-gray-600 mt-2">
              {explanation}
            </p>
          )}
        </div>
        <div className="w-32 flex-shrink-0">
          <ShameScore score={score} />
        </div>
      </div>
    </div>
  );
};

export default RoastResult;
