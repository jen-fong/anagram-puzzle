import * as stringUtils from './string-utils';

describe('string-utils', () => {
    describe('normalizeString', () => {
        it('should trim whitespace and convert to lowercase', () => {
            expect(stringUtils.normalizeString('  Apple  ')).toBe('apple');
            expect(stringUtils.normalizeString('CAT')).toBe('cat');
        });
    });

    describe('shuffleString', () => {
        const mathSpy = vi.spyOn(Math, 'random');

        afterEach(() => {
            mathSpy.mockClear();
        });

        afterAll(() => {
            mathSpy.mockRestore();
        });
        it('should shuffle the string with mocked random', () => {
            mathSpy.mockReturnValue(0);

            const result = stringUtils.shuffleString('abc');
            expect(result).toBe('bca');
        });

        it('should return an empty string when input is empty', () => {
            expect(stringUtils.shuffleString('')).toBe('');
        });
    });

    describe('isConsonant', () => {
        it('returns true for consonants regardless of case', () => {
            expect(stringUtils.isConsonant('b')).toBe(true);
            expect(stringUtils.isConsonant('Z')).toBe(true);
        });

        it('returns false for vowels', () => {
            expect(stringUtils.isConsonant('a')).toBe(false);
            expect(stringUtils.isConsonant('E')).toBe(false);
        });

        it('returns false for symbols', () => {
            expect(stringUtils.isConsonant('!')).toBe(false);
        });
    });

    describe('sortString', () => {
        it('should sort characters alphabetically', () => {
            expect(stringUtils.sortString('bac')).toBe('abc');
            expect(stringUtils.sortString('apple')).toBe('aelpp');
        });
    });

    describe('sortAndNormalizeString', () => {
        it('should normalize then sort the string', () => {
            expect(stringUtils.sortAndNormalizeString('B a t')).toBe('abt');
        });
    });
});
