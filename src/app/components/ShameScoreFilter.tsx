import { ShameScoreFilterProps } from '@/types/shamescore';
import { FC } from 'react';

const ShameScoreFilter: FC<ShameScoreFilterProps> = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'All Scores' },
    { value: 'low', label: 'Low Shame (0-3)' },
    { value: 'medium', label: 'Medium Shame (4-7)' },
    { value: 'high', label: 'High Shame (8-10)' }
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {filters.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all
            ${currentFilter === value
              ? 'bg-gray-900 text-white shadow-md'
              : 'bg-white/50 text-gray-600 hover:bg-gray-100'
            } backdrop-blur-sm border border-gray-200`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ShameScoreFilter;
