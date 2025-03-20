'use client';

import { type FC } from 'react';

interface ShameScoreProps {
  score: number;
}

const ShameScore: FC<ShameScoreProps> = ({ score }) => {
  const normalizedScore = Math.min(10, Math.max(0, score));
  const percentage = (normalizedScore / 10) * 100;

  const getGradient = (score: number) => {
    if (score <= 3) return {
      bg: 'from-emerald-400/80 to-emerald-600/80',
      text: 'from-emerald-700 to-emerald-900'
    };
    if (score <= 6) return {
      bg: 'from-yellow-400/80 to-yellow-600/80',
      text: 'from-yellow-700 to-yellow-900'
    };
    return {
      bg: 'from-red-400/80 to-red-600/80',
      text: 'from-red-700 to-red-900'
    };
  };

  const getMessage = (score: number) => {
    if (score <= 2) return '✨ Code Ninja! ✨';
    if (score <= 4) return '👍 Pretty Decent!';
    if (score <= 6) return '🤔 Needs Some Love...';
    if (score <= 8) return '😅 Yikes!';
    return '🔥 Code Emergency! 🚨';
  };

  const getEmoji = (score: number) => {
    if (score <= 2) return '🏆';
    if (score <= 4) return '🌟';
    if (score <= 6) return '🛠️';
    if (score <= 8) return '😰';
    return '💩';
  };

  const gradient = getGradient(score);

  return (
    <div className="flex items-center space-x-6 bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Shame Score
        </div>
        <div className="text-4xl mb-3">{getEmoji(score)}</div>
        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
          {normalizedScore.toFixed(1)}
        </div>
        <div data-testid="message" className="text-sm font-medium text-gray-600 mt-2 text-center">
          {getMessage(score)}
        </div>
      </div>

      <div className="relative w-8 h-36 bg-gray-50 rounded-full overflow-hidden shadow-inner border border-gray-200">
        <div 
          data-testid="thermometer"
          className={`absolute bottom-0 w-full transition-all duration-1000 ease-out bg-gradient-to-t ${gradient.bg}`}
          style={{ 
            height: `${percentage}%`,
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-between py-1">
          {[...Array(11)].map((_, index) => (
            <div 
              key={index} 
              className="w-full h-[1px] bg-gray-200/50"
              style={{ opacity: index % 5 === 0 ? 1 : 0.5 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShameScore;
