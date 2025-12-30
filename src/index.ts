import { AnagramPuzzle } from '@/anagram-puzzle';
import { readTextFile } from '@/utils/file-utils';

// I chose to move the I/O out of the actual AnagramPuzzle class to decouple it
// so all it does is handle words and the various puzzle behaviors. This will make it easier to test.
// This can also be expanded to create a puzzle using a user submitted list of words instead of a file if needed
export function createAnagramPuzzleMakerFromFile(filePath: string = 'sowpods.txt'): AnagramPuzzle {
    const words = readTextFile(filePath);
    if (words.length === 0) {
        throw new Error(`File at ${filePath} is empty!`);
    }

    return new AnagramPuzzle(words);
}

export function createAnagramPuzzleMakerFromWords(words: string[]): AnagramPuzzle {
    if (!words || !words.length) {
        return createAnagramPuzzleMakerFromFile();
    }

    return new AnagramPuzzle(words);
}

const anagramMaker = createAnagramPuzzleMakerFromWords(['cat', 'tar', 'rat']);
const puzzle = anagramMaker.generateUnsolveablePuzzle(3);
console.log(puzzle);
