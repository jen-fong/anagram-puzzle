import {
    AnagramPuzzleMaker,
    MAX_GENERATE_UNSOLVEABLE_ATTEMPTS,
    MAX_SHUFFLE_ATTEMPTS,
} from '@/anagram-puzzle-maker';
import * as randomUtils from '@/utils/random-utils';
import * as stringUtils from '@/utils/string-utils';

describe('AnagramPuzzle', () => {
    const mockWords = ['apple', 'pale', 'leap', 'plea', 'plea', 'leap', 'cat', 'act'];
    let anagramPuzzleMaker: AnagramPuzzleMaker;

    beforeEach(() => {
        vi.restoreAllMocks();
        anagramPuzzleMaker = new AnagramPuzzleMaker(mockWords);
    });

    describe('Initialization', () => {
        it('should group words by their sorted characters and duplicates are removed', () => {
            const answers = anagramPuzzleMaker.getAnswer('aelp');
            expect(answers).toEqual(['pale', 'leap', 'plea']);
        });

        it('should warn when initialized with an empty array', () => {
            const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            new AnagramPuzzleMaker([]);
            expect(spy).toHaveBeenCalledWith(expect.stringContaining('No words used'));
        });
    });

    describe('generatePuzzle', () => {
        it('should return a shuffled version of a word for a given difficulty', () => {
            vi.spyOn(randomUtils, 'getRandomItemFromArray').mockReturnValue('act');
            vi.spyOn(stringUtils, 'shuffleString').mockReturnValue('tca');

            const result = anagramPuzzleMaker.generatePuzzle(3);
            expect(result).toBe('tca');
        });

        it('should re-shuffle if the first shuffle results in a real word', () => {
            vi.spyOn(randomUtils, 'getRandomItemFromArray').mockReturnValue('act');
            const shuffleSpy = vi
                .spyOn(stringUtils, 'shuffleString')
                .mockReturnValueOnce('cat')
                .mockReturnValueOnce('tca');

            const result = anagramPuzzleMaker.generatePuzzle(3);
            expect(result).toBe('tca');
            expect(shuffleSpy).toHaveBeenCalledTimes(2);
        });

        it('should return the word even if it is real if the max shuffle has already been done', () => {
            vi.spyOn(randomUtils, 'getRandomItemFromArray').mockReturnValue('act');
            const shuffleSpy = vi.spyOn(stringUtils, 'shuffleString').mockReturnValue('act');

            const result = anagramPuzzleMaker.generatePuzzle(3);
            expect(result).toBe('act');
            expect(shuffleSpy.mock.calls.length).toBeGreaterThanOrEqual(MAX_SHUFFLE_ATTEMPTS);
        });

        it('should return empty string when difficulty is not passed', () => {
            // @ts-expect-error testing undefined input
            const result = anagramPuzzleMaker.generatePuzzle();
            expect(result).toBe('');
        });

        it('should return empty string when there is no associated difficulty', () => {
            const result = anagramPuzzleMaker.generatePuzzle(0);
            expect(result).toBe('');
        });
    });

    describe('solve', () => {
        it('should return true for when it is a real word for the anagram', () => {
            expect(anagramPuzzleMaker.solve('tCa', 'caT')).toBe(true);
        });

        it('should return false for an incorrect guess', () => {
            expect(anagramPuzzleMaker.solve('tca', 'tca')).toBe(false);
        });

        it('should return false when either puzzle or guess is missing', () => {
            expect(anagramPuzzleMaker.solve('', '')).toBe(false);
        });

        it('should return false when puzzle does not exist inside our game words', () => {
            expect(anagramPuzzleMaker.solve('qwerty', 'qwerty')).toBe(false);
        });
    });

    describe('getAnswer', () => {
        it('should return all possible answers for an anagram', () => {
            expect(anagramPuzzleMaker.getAnswer('tCa  ')).toEqual(['cat', 'act']);
        });

        it('should return empty array for nonexisting puzzle', () => {
            expect(anagramPuzzleMaker.getAnswer('foo')).toEqual([]);
        });

        it('should return empty array for invalid input', () => {
            // @ts-expect-error testing invalid input
            expect(anagramPuzzleMaker.getAnswer()).toEqual([]);
        });
    });

    describe('generateUnsolveablePuzzle', () => {
        it('should attempt to create a puzzle that does not exist in the dictionary', () => {
            vi.spyOn(randomUtils, 'getRandomItemFromArray').mockReturnValue('act');
            vi.spyOn(randomUtils, 'getRandomIndex').mockReturnValue(0);
            vi.spyOn(randomUtils, 'getRandomVowel').mockReturnValue('i');
            vi.spyOn(stringUtils, 'shuffleString').mockReturnValue('ict');

            const result = anagramPuzzleMaker.generateUnsolveablePuzzle(3);
            expect(result).toBe('ict');
            expect(anagramPuzzleMaker.getAnswer('ict')).toEqual([]);
        });

        it('should return a placeholder after max attempts have been reached', () => {
            const impossibleAnagramPuzzleMaker = new AnagramPuzzleMaker(randomUtils.VOWELS);
            vi.spyOn(randomUtils, 'getRandomIndex').mockReturnValue(0);
            vi.spyOn(randomUtils, 'getRandomVowel').mockReturnValue('a');

            const result = impossibleAnagramPuzzleMaker.generateUnsolveablePuzzle(1);

            expect(['x', 'y', 'z']).toContain(result);
            expect(randomUtils.getRandomIndex).toHaveBeenCalledTimes(
                MAX_GENERATE_UNSOLVEABLE_ATTEMPTS
            );
        });

        it('should return empty string when difficulty is not passed', () => {
            // @ts-expect-error testing undefined input
            const result = anagramPuzzleMaker.generateUnsolveablePuzzle();
            expect(result).toBe('');
        });
    });
});
