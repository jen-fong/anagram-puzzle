import { defaultDict } from '@/utils/default-dict-utils';
import {
    getRandomConsonant,
    getRandomIndexFromString,
    getRandomVowel,
    getRandomItemFromArray,
} from '@/utils/random-utils';
import {
    isConsonant,
    normalizeString,
    shuffleString,
    sortAndNormalizeString,
    sortString,
} from '@/utils/string-utils';

// I think this is enough times to try to get a nonword puzzle
const MAX_SHUFFLE_ATTEMPTS = 10;
// max amount of times to try to generate an unsolveable puzzle to prevent infinite loop
const MAX_GENERATE_UNSOLVEABLE_ATTEMPTS = 500;

export class AnagramPuzzle {
    private readonly data: Record<string, string[]>;
    private readonly combinationsByLength: Record<string, string[]>;
    constructor(words: string[]) {
        this.data = defaultDict(() => []);
        // Store data in separate object by length like this { '3': ['act', 'art'] }
        // so we avoid filtering constantly. We don't expect the words to change so it's fine to have
        // this separate structure to hold the words again at the expense of a bit of memory
        this.combinationsByLength = defaultDict(() => []);

        if (!words.length) {
            console.warn('No words used to initialize');
        }
        this.initWords(words);
    }

    private initWords(words: string[]) {
        words.forEach((word: string) => {
            const sortedAndNormalizedKey = sortAndNormalizeString(word);
            const normalizedWord = normalizeString(word);
            const isExistingCombination = this.hasKey(sortedAndNormalizedKey);

            // ts doesn't know about the proxy used for defaultDict but we know it should always set an array
            // so using ! to bypass the ts error
            const wordsForKey = this.data[sortedAndNormalizedKey]!;
            if (!wordsForKey.includes(normalizedWord)) {
                wordsForKey.push(normalizedWord);
            }
            if (!isExistingCombination) {
                const length = sortedAndNormalizedKey.length;
                this.combinationsByLength[length]!.push(sortedAndNormalizedKey);
            }
        });
    }

    // While we are using length for the difficulty, having this as a separate function will be helpful
    // if we change it to something else
    private getCombinationsByDifficulty(difficulty: number): string[] {
        const possibleWords = this.combinationsByLength[difficulty];
        return possibleWords || [];
    }

    private hasKey(key: string): boolean {
        return key in this.data;
    }

    // Create a dummy unsolveable puzzle in case we are not able to generate an unsolveable puzzle even though it is unlikely
    private createPlaceholderUnsolveablePuzzle(difficulty: number): string {
        const availableLetters = ['x', 'y', 'z'];
        let placeholderUnsolveablePuzzle = '';
        for (let i = 0; i < difficulty; i++) {
            placeholderUnsolveablePuzzle += getRandomItemFromArray(availableLetters);
        }
        return placeholderUnsolveablePuzzle;
    }

    public generatePuzzle(difficulty: number) {
        const possibleWords = this.getCombinationsByDifficulty(difficulty);

        if (possibleWords.length === 0) {
            console.warn(`No words found for difficulty level: ${difficulty}.`);
            return '';
        }
        // "!" for ts workaround, we know that possibleWords has a length > 0 now and random will return
        // an actual string
        const randomWord = getRandomItemFromArray(possibleWords)!;
        const validSolutions = this.data[randomWord]!;

        let shuffledPuzzle = shuffleString(randomWord);
        let attempts = 0;
        // Prevent real words from being returned from shuffle for puzzles
        while (attempts < MAX_SHUFFLE_ATTEMPTS && validSolutions.includes(shuffledPuzzle)) {
            attempts++;
            shuffledPuzzle = shuffleString(randomWord);
        }

        return shuffledPuzzle;
    }

    public solve(puzzle: string, userGuess: string) {
        const sortedNormalizedPuzzle = sortString(normalizeString(puzzle));
        const normalizeUserGuess = normalizeString(userGuess);

        if (!sortedNormalizedPuzzle || !normalizeUserGuess) {
            return false;
        }

        if (this.hasKey(sortedNormalizedPuzzle)) {
            // Again, the "!" is because of the proxy used in defaultDict
            const words = this.data[sortedNormalizedPuzzle]!;
            return words.includes(normalizeUserGuess);
        }

        return false;
    }

    public getAnswer(puzzle: string) {
        const sortedPuzzle = sortString(normalizeString(puzzle));
        if (this.hasKey(sortedPuzzle)) {
            const words = this.data[sortedPuzzle]!;

            return words;
        }

        return [];
    }

    public generateUnsolveablePuzzle(difficulty: number): string {
        const possibleWords = this.getCombinationsByDifficulty(difficulty);

        if (possibleWords.length === 0) {
            console.warn(`No words found for difficulty level: ${difficulty}.`);
            return '';
        }

        let unsolveableWord = '';
        // Depending on what the user inputs to the words, it is possible this goes into an infinite loop!
        // Adding this safeguard here. We could let the user set the maxAttempts, but I don't think it is necessary
        // to expose that logic to the user.
        let attempts = 0;
        while (!unsolveableWord && attempts < MAX_GENERATE_UNSOLVEABLE_ATTEMPTS) {
            attempts++;
            // get random word
            // change one of letters constonants | vowels and sort
            // check if it's inside possible words
            // if not -> set word and return word
            // we continue
            const randomWord = getRandomItemFromArray(possibleWords)!;
            const randomIndex = getRandomIndexFromString(randomWord);
            const wordArray = randomWord.split('');
            const letterToSwap = wordArray[randomIndex];
            const randomLetter =
                letterToSwap && isConsonant(letterToSwap) ? getRandomConsonant() : getRandomVowel();

            wordArray[randomIndex] = randomLetter;

            const newWord = sortString(wordArray.join(''));
            // faster lookup as opposed to doing possibleWords.includes(newWord)
            if (!this.hasKey(newWord)) {
                unsolveableWord = shuffleString(newWord);
            }
        }

        return unsolveableWord || this.createPlaceholderUnsolveablePuzzle(difficulty);
    }
}
