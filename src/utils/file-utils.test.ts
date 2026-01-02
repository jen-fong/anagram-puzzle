import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFile } from 'node:fs/promises';
import { readTextFile } from '@/utils/file-utils';

vi.mock('node:fs/promises');

describe('File Utils', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('readTextFile', () => {
        it('should return an array of words and filter out empty lines/values', async () => {
            // Mock a successful file read with mixed whitespace and newlines
            vi.mocked(readFile).mockResolvedValue('apple\n\nbanana\ncherry\n');

            const result = await readTextFile('test.txt');

            expect(result).toEqual(['apple', 'banana', 'cherry']);
            expect(vi.mocked(readFile)).toHaveBeenCalledWith('test.txt', 'utf8');
        });

        it('should throw a specific error if the file is not found (ENOENT)', async () => {
            const error = new Error();
            (error as NodeJS.ErrnoException).code = 'ENOENT';
            vi.mocked(readFile).mockRejectedValue(error);

            await expect(readTextFile('missing.txt')).rejects.toThrow('Resource not found');
        });

        it('should throw a specific error for permission issues (EACCES)', async () => {
            const error = new Error();
            (error as NodeJS.ErrnoException).code = 'EACCES';
            vi.mocked(readFile).mockRejectedValue(error);

            await expect(readTextFile('locked.txt')).rejects.toThrow('Permission denied');
        });

        it('should throw an "Unexpected error" for any other error code', async () => {
            const error = new Error();
            (error as NodeJS.ErrnoException).code = 'EISDIR';
            vi.mocked(readFile).mockRejectedValue(error);

            await expect(readTextFile('dir/')).rejects.toThrow('Unexpected error');
        });
    });
});
