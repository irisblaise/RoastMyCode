import { ArchivedRoast } from '@/types/archive';
import { RoastResponse } from '@/types/roast';

const STORAGE_KEY = 'roastMyCode_archive';

class ArchiveService {
  private getArchive(): ArchivedRoast[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveArchive(archive: ArchivedRoast[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(archive));
  }

  archiveRoast(code: string, roastResult: RoastResponse): void {
    const archive = this.getArchive();
    const newArchiveItem: ArchivedRoast = {
      ...roastResult,
      id: crypto.randomUUID(),
      code,
      timestamp: new Date().toISOString()
    };
    archive.unshift(newArchiveItem);
    this.saveArchive(archive);
  }

  getAllRoasts(): ArchivedRoast[] {
    return this.getArchive();
  }

  deleteRoast(id: string): void {
    const archive = this.getArchive();
    const filtered = archive.filter(item => item.id !== id);
    this.saveArchive(filtered);
  }
}

export const archiveService = new ArchiveService();
