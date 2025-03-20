import { RoastResponse } from '@/types/roast';
import { roastConfig } from '@/config/roast.config';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class RoastService {
  private static instance: RoastService;

  private constructor() {}

  public static getInstance(): RoastService {
    if (!RoastService.instance) {
      RoastService.instance = new RoastService();
    }
    return RoastService.instance;
  }

  private validateCode(code: string): void {
    if (!code.trim()) {
      throw new ValidationError('Please provide some code to roast.');
    }

    if (code.length > roastConfig.maxCodeLength) {
      throw new ValidationError(
        `Code is too long. Please limit your code to ${roastConfig.maxCodeLength} characters.`
      );
    }
  }

  async getRoast(code: string): Promise<RoastResponse> {
    try {
      this.validateCode(code);

      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
        return {
          roast: null,
          score: null,
          explanation: null,
          error: error.error || 'Failed to roast the code'
        };
      }

      const result = await response.json();
      return {
        roast: result.roast,
        score: result.score,
        explanation: result.explanation || null,
        error: null
      };
    } catch (err) {
      return {
        roast: null,
        score: null,
        explanation: null,
        error: err instanceof Error ? err.message : 'An unexpected error occurred'
      };
    }
  }
}

export const roastService = RoastService.getInstance();
