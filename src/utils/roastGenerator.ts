import { OpenAI } from 'openai';
import { RoastResponse } from '@/types/roast';
import { roastConfig, roastPrompt } from '@/config/roast.config';

export class RoastGenerator {
  private openai: OpenAI;

  constructor(apiKey?: string) {
    this.openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
    });
  }

  private parseResponse(content: string): RoastResponse {
    try {
      const parsed = JSON.parse(content);
      if (parsed.roast && typeof parsed.score === 'number') {
        return {
          roast: parsed.roast,
          score: Math.min(10, Math.max(0, parsed.score)),
          explanation: parsed.explanation || null,
          error: null
        };
      }
      console.error('Invalid JSON format from OpenAI response:', content);
      return {
        roast: null,
        score: null,
        explanation: null,
        error: 'Invalid response format from AI'
      };
    } catch {
      const scoreMatch = content.match(/Score:\s*(\d+(?:\.\d+)?)/i);
      const roastMatch = content.match(/Roast:\s*([^\n]*)/i);

      if (!scoreMatch || !roastMatch) {
        console.error('Failed to parse OpenAI response:', content);
        return {
          roast: null,
          score: null,
          explanation: null,
          error: 'Failed to parse AI response'
        };
      }

      const parsedScore = parseFloat(scoreMatch[1]);
      const score = Number.isNaN(parsedScore) ? null : Math.min(10, Math.max(0, Math.round(parsedScore)));

      return {
        roast: roastMatch[1].trim(),
        score,
        explanation: null,
        error: null
      };
    }
  }

  async generateRoast(code: string): Promise<RoastResponse> {
    try {
      const response = await this.openai.chat.completions.create({
        model: roastConfig.model,
        messages: [
          {
            role: 'system',
            content: roastPrompt.systemMessage
          },
          {
            role: 'user',
            content: roastPrompt.userMessageTemplate.replace('{code}', code)
          }
        ],
        max_tokens: roastConfig.maxTokens,
        temperature: roastConfig.temperature,
      });

      const content = response.choices[0]?.message?.content?.trim() || '';
      return this.parseResponse(content);
    } catch (error) {
      console.error('OpenAI API error:', error);
      return {
        roast: null,
        score: null,
        explanation: null,
        error: error instanceof Error ? error.message : 'Failed to generate code roast. Please try again.'
      };
    }
  }
}

export const roastGenerator = new RoastGenerator();