import { RoastGenerator } from '../roastGenerator';

jest.mock('openai', () => {
  const mockCreate = jest.fn();
  return {
    OpenAI: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreate
        }
      }
    })),
    mockCreate 
  };
});

const { mockCreate } = jest.requireMock('openai');

describe('RoastGenerator', () => {
  let roastGenerator: RoastGenerator;
  let consoleErrorSpy: jest.SpyInstance;

  const mockCode = `
    function example() {
      console.log("test");
    }
  `;

  beforeEach(() => {
    roastGenerator = new RoastGenerator('test-api-key');
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('returns roast response from OpenAI', async () => {
    const mockResponse = {
      choices: [{
        message: {
          content: JSON.stringify({
            roast: "Your code could use some improvement",
            score: 6,
            explanation: "Here's why..."
          })
        }
      }]
    };
    mockCreate.mockResolvedValueOnce(mockResponse);

    const result = await roastGenerator.generateRoast(mockCode);
    
    expect(result).toEqual({
      roast: "Your code could use some improvement",
      score: 6,
      explanation: "Here's why...",
      error: null
    });
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('handles API errors gracefully', async () => {
    const expectedError = new Error('API Error');
    mockCreate.mockRejectedValueOnce(expectedError);
    
    const result = await roastGenerator.generateRoast(mockCode);
    
    expect(result).toEqual({
      roast: null,
      score: null,
      explanation: null,
      error: 'API Error'
    });
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('OpenAI API error:', expectedError);
  });

  it('handles non-JSON responses', async () => {
    const mockResponse = {
      choices: [{
        message: {
          content: `
            Roast: This code needs work
            Score: 7
          `
        }
      }]
    };
    mockCreate.mockResolvedValueOnce(mockResponse);
    
    const result = await roastGenerator.generateRoast(mockCode);
    
    expect(result).toEqual({
      roast: 'This code needs work',
      score: 7,
      explanation: null,
      error: null
    });
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('handles invalid responses', async () => {
    const mockResponse = {
      choices: [{
        message: {
          content: 'Invalid response format'
        }
      }]
    };
    mockCreate.mockResolvedValueOnce(mockResponse);
    
    const result = await roastGenerator.generateRoast(mockCode);
    
    expect(result).toEqual({
      roast: null,
      score: null,
      explanation: null,
      error: 'Failed to parse AI response'
    });
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to parse OpenAI response:',
      'Invalid response format'
    );
  });
});
