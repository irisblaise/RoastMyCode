'use client';

import type { RoastResponse } from '@/types/roast';
import { type FC, useState } from 'react';
import { roastService } from '@/app/services/roastService';
import { archiveService } from '@/app/services/archiveService';
import CodeEditor from '@/app/components/CodeEditor';
import RoastResult from '@/app/components/RoastResult';

const Home: FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [roastResult, setRoastResult] = useState<RoastResponse>({
    roast: null,
    score: null,
    explanation: null,
    error: null
  });

  const handleSubmit = async (code: string): Promise<void> => {
    setIsAnalyzing(true);
    setRoastResult({
      roast: null,
      score: null,
      explanation: null,
      error: null
    });

    try {
      const result = await roastService.getRoast(code);
      setRoastResult(result);
      if (result.roast && result.score !== null) {
        archiveService.archiveRoast(code, result);
      }
    } catch (error) {
      setRoastResult({
        roast: null,
        score: null,
        explanation: null,
        error: error instanceof Error ? error.message : 'Failed to get roast'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl uppercase font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Roast my code
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get your code roasted by AI. Prepare for brutal honesty and a dash of humor!
        </p>
      </header>

      <CodeEditor onSubmit={handleSubmit} isLoading={isAnalyzing} />

      {(roastResult.roast || roastResult.error) && (
        <RoastResult 
          result={roastResult} 
          isLoading={isAnalyzing}
        />
      )}
    </main>
  );
};

export default Home;
