export interface RoastConfig {
  maxCodeLength: number;
  maxTokens: number;
  temperature: number;
  model: string;
}

export interface RoastPrompt {
  systemMessage: string;
  userMessageTemplate: string;
}

export interface RoastResponse {
  roast: string | null;
  score: number | null;
  explanation: string | null;
  error: string | null;
}
