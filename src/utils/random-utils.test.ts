import * as randomUtils from '@/utils/random-utils';

describe('Random Utils', () => {
    // Usually I would mock the getRandomIndex function, but this is a limitation within ESM and vitest
    // where you can't mock the fns within the same file so I mocked Math to avoid making multiple small files
    const realMathRandom = Math.random;
    let mathSpy = vi.spyOn(Math, 'random');

    afterEach(() => {
        mathSpy.mockClear();
    });
    afterAll(() => {
        mathSpy.mockRestore();
    });
    describe('getRandomIndex', () => {
        beforeAll(() => {
            mathSpy.mockImplementation(realMathRandom);
        });
        it('returns a random number between 0 and length', () => {
            const length = 10;
            const result = randomUtils.getRandomIndex(10);
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThan(length);
        });
    });

    describe('getRandomItemFromArray', () => {
        it('returns a random item at the specified index', () => {
            mathSpy.mockReturnValue(0.5);
            const items = ['apple', 'banana', 'cherry'];
            expect(randomUtils.getRandomItemFromArray(items)).toBe('banana');
        });

        it('returns undefined for an empty array', () => {
            mathSpy.mockReturnValue(0.5);
            expect(randomUtils.getRandomItemFromArray([])).toBeUndefined();
        });
    });

    describe('getRandomConsonant', () => {
        it('returns a random consonant', () => {
            mathSpy.mockReturnValue(0.75);
            expect(randomUtils.getRandomConsonant()).toBe('t');
        });
    });

    describe('getRandomVowel', () => {
        it('returns a random vowel', () => {
            mathSpy.mockReturnValue(0.5);
            expect(randomUtils.getRandomVowel()).toBe('i');
        });
    });
});
