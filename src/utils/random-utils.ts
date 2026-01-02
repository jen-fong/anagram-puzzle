export function getRandomIndex(length: number = 0) {
    return Math.floor(Math.random() * length);
}

export function getRandomItemFromArray<T>(arr: T[] = []) {
    return arr[getRandomIndex(arr.length)];
}

export function getRandomIndexFromString(str: string = ''): number {
    return getRandomIndex(str.length);
}

export const CONSONANTS = [
    'b',
    'c',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'v',
    'w',
    'x',
    'y',
    'z',
];
export function getRandomConsonant(): string {
    return getRandomItemFromArray(CONSONANTS)!;
}

export const VOWELS = ['a', 'e', 'i', 'o', 'u'];
export function getRandomVowel(): string {
    return getRandomItemFromArray(VOWELS)!;
}
