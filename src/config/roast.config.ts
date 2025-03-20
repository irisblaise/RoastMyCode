import { RoastConfig, RoastPrompt } from '@/types/roast';

export const roastConfig: RoastConfig = {
  maxCodeLength: 2000,
  maxTokens: 100,
  temperature: 0.8,
  model: 'gpt-3.5-turbo'
};

export const roastPrompt: RoastPrompt = {
  systemMessage: 'You are a witty code reviewer who gives funny, sarcastic but constructive roasts of code. Keep responses short and punchy. Always return both a score and a roast in the exact format specified. The score must be a number between 0 and 10.',
  userMessageTemplate: `Analyze this code and provide:
1. A concise, witty roast (max 2-3 sentences)
2. A "shame score" from 0-10 (where 10 is the most shameful) based on code quality

Format your response exactly like this:
Score: [number]
Roast: [your roast here]

The score MUST be a number between 0 and 10, where:
0-2: Excellent code
3-4: Good code
5-6: Average code
7-8: Poor code
9-10: Terrible code

Example:
Score: 8
Roast: This code is so messy, it makes a teenager's bedroom look organized.

Here's the code to roast:

{code}`
};
