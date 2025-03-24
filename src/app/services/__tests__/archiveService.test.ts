import { archiveService } from '../archiveService';
import { RoastResponse } from '@/types/roast';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock crypto.randomUUID
const mockUUID = '123e4567-e89b-12d3-a456-426614174000';
Object.defineProperty(global.crypto, 'randomUUID', {
  value: () => mockUUID,
});

describe('ArchiveService', () => {
  const mockRoastResponse: RoastResponse = {
    roast: 'Test roast',
    score: 5,
    explanation: 'Test explanation',
    error: null
  };

  const mockCode = 'console.log("hello world");';

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should archive a roast and retrieve it', () => {
    archiveService.archiveRoast(mockCode, mockRoastResponse);
    const archived = archiveService.getAllRoasts();
    
    expect(archived).toHaveLength(1);
    expect(archived[0]).toMatchObject({
      ...mockRoastResponse,
      code: mockCode,
    });
    expect(archived[0].id).toBeDefined();
    expect(archived[0].timestamp).toBeDefined();
  });

  it('should add new roasts to the beginning of the archive', () => {
    const firstRoast = { ...mockRoastResponse, roast: 'First roast' };
    const secondRoast = { ...mockRoastResponse, roast: 'Second roast' };

    archiveService.archiveRoast(mockCode, firstRoast);
    archiveService.archiveRoast(mockCode, secondRoast);

    const archived = archiveService.getAllRoasts();
    expect(archived).toHaveLength(2);
    expect(archived[0].roast).toBe('Second roast');
    expect(archived[1].roast).toBe('First roast');
  });

  it('should delete a roast by id', () => {
    archiveService.archiveRoast(mockCode, mockRoastResponse);
    const archived = archiveService.getAllRoasts();
    const id = archived[0].id;

    archiveService.deleteRoast(id);
    expect(archiveService.getAllRoasts()).toHaveLength(0);
  });

  it('should handle empty archive gracefully', () => {
    const archived = archiveService.getAllRoasts();
    expect(archived).toEqual([]);
  });

  it('should persist data in localStorage', () => {
    archiveService.archiveRoast(mockCode, mockRoastResponse);
    
    const storedData = localStorage.getItem('roastMyCode_archive');
    expect(storedData).toBeDefined();
    
    const parsed = JSON.parse(storedData!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0]).toMatchObject({
      ...mockRoastResponse,
      code: mockCode,
    });
  });
});
