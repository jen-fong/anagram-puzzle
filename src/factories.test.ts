import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAnagramPuzzleMaker } from '@/factories';
import * as fileUtils from '@/utils/file-utils';
import { AnagramPuzzle } from '@/anagram-puzzle';

vi.mock('@/utils/file-utils');

describe('Puzzle Factory', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    afterAll(() => {
        vi.restoreAllMocks();
    });

    describe('createAnagramPuzzleMaker', () => {
        it('should return an AnagramPuzzle instance when file source has words', async () => {
            vi.mocked(fileUtils.readTextFile).mockResolvedValue(['apple', 'banana']);

            const result = await createAnagramPuzzleMaker('test.txt');

            expect(result).toBeInstanceOf(AnagramPuzzle);
            expect(fileUtils.readTextFile).toHaveBeenCalledWith('test.txt');
        });

        it('should throw an error if the file is empty', async () => {
            vi.mocked(fileUtils.readTextFile).mockResolvedValue([]);

            await expect(createAnagramPuzzleMaker('empty.txt')).rejects.toThrow(
                'No words found for source empty.txt'
            );
        });

        it('should create puzzle from provided words', async () => {
            const words = ['cat', 'act'];
            const result = await createAnagramPuzzleMaker(words);

            expect(result).toBeInstanceOf(AnagramPuzzle);
            expect(fileUtils.readTextFile).not.toHaveBeenCalled();
        });
    });
});
