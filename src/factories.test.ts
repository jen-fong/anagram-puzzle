import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    createAnagramPuzzleMakerFromFile,
    createAnagramPuzzleMakerFromWords,
    DEFAULT_WORDS_FILE,
} from '@/factories';
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

    describe('createAnagramPuzzleMakerFromFile', () => {
        it('should return an AnagramPuzzle instance when file has words', async () => {
            vi.mocked(fileUtils.readTextFile).mockResolvedValue(['apple', 'banana']);

            const result = await createAnagramPuzzleMakerFromFile('test.txt');

            expect(result).toBeInstanceOf(AnagramPuzzle);
            expect(fileUtils.readTextFile).toHaveBeenCalledWith('test.txt');
        });

        it('should throw an error if the file is empty', async () => {
            vi.mocked(fileUtils.readTextFile).mockResolvedValue([]);

            await expect(createAnagramPuzzleMakerFromFile('empty.txt')).rejects.toThrow(
                'File at empty.txt is empty!'
            );
        });
    });

    describe('createAnagramPuzzleMakerFromWords', () => {
        it('should create puzzle from provided words', async () => {
            const words = ['cat', 'act'];
            const result = await createAnagramPuzzleMakerFromWords(words);

            expect(result).toBeInstanceOf(AnagramPuzzle);
            expect(fileUtils.readTextFile).not.toHaveBeenCalled();
        });

        it('should fallback to file if words array is empty', async () => {
            vi.mocked(fileUtils.readTextFile).mockResolvedValue(['apple', 'banana']);

            const result = await createAnagramPuzzleMakerFromWords([]);

            expect(fileUtils.readTextFile).toHaveBeenCalledWith(DEFAULT_WORDS_FILE);
            expect(result).toBeInstanceOf(AnagramPuzzle);
        });
    });
});
