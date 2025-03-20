import { NextResponse } from 'next/server';
import { roastGenerator } from '@/utils/roastGenerator';
import { roastConfig } from '@/config/roast.config';
import type { RoastResponse } from '@/types/roast';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    
    if (!code?.trim()) {
      return NextResponse.json({
        roast: null,
        score: null,
        error: 'No code provided'
      } as RoastResponse, { status: 400 });
    }

    if (code.length > roastConfig.maxCodeLength) {
      return NextResponse.json({
        roast: null,
        score: null,
        error: `Code is too long. Please limit your code to ${roastConfig.maxCodeLength} characters.`
      } as RoastResponse, { status: 400 });
    }

    const result = await roastGenerator.generateRoast(code);
    
    if (result.error) {
      return NextResponse.json(result, { status: 400 });
    }

    if (!result.roast) {
      return NextResponse.json({
        roast: null,
        score: null,
        error: 'Failed to generate a roast. Please try again.'
      } as RoastResponse, { status: 400 });
    }

    return NextResponse.json({
      roast: result.roast,
      score: result.score,
      error: null
    } as RoastResponse);
  } catch (error) {
    console.error('Error in roast API:', error);

    return NextResponse.json({
      roast: null,
      score: null,
      error: 'Failed to analyze code. Please try again.'
    } as RoastResponse, { status: 500 });
  }
}
