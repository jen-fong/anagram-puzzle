import { AnagramPuzzle } from '@/anagram-puzzle';
import { readTextFile } from '@/utils/file-utils';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Helper to get the current directory name in ESM/CJS hybrid environments
const _dirname =
    typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(import.meta.url));

export const DEFAULT_WORDS_FILE = join(_dirname, 'sowpods.txt');

export async function createAnagramPuzzleMaker(words: string[]): Promise<AnagramPuzzle>;
export async function createAnagramPuzzleMaker(filePath?: string): Promise<AnagramPuzzle>;
// I chose to move the I/O out of the actual AnagramPuzzle class to decouple it
// so all it does is handle words and the various puzzle behaviors. This will make it easier to test.
// This can also be expanded to create a puzzle using a user submitted list of words instead of a file if needed
export async function createAnagramPuzzleMaker(
    source: string | string[] = DEFAULT_WORDS_FILE
): Promise<AnagramPuzzle> {
    const words = Array.isArray(source) ? source : await readTextFile(source);

    if (words.length === 0) {
        throw new Error(`No words found for source ${source}`);
    }

    return new AnagramPuzzle(words);
}
