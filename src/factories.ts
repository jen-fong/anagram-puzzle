import { AnagramPuzzle } from '@/anagram-puzzle';
import { readTextFile } from '@/utils/file-utils';

export const DEFAULT_WORDS_FILE = 'sowpods.txt';

// I chose to move the I/O out of the actual AnagramPuzzle class to decouple it
// so all it does is handle words and the various puzzle behaviors. This will make it easier to test.
// This can also be expanded to create a puzzle using a user submitted list of words instead of a file if needed
export async function createAnagramPuzzleMakerFromFile(
    filePath: string = DEFAULT_WORDS_FILE
): Promise<AnagramPuzzle> {
    const words = await readTextFile(filePath);
    if (words.length === 0) {
        throw new Error(`File at ${filePath} is empty!`);
    }

    return new AnagramPuzzle(words);
}

export async function createAnagramPuzzleMakerFromWords(words: string[]): Promise<AnagramPuzzle> {
    if (!words || !words.length) {
        return createAnagramPuzzleMakerFromFile();
    }

    return new AnagramPuzzle(words);
}
