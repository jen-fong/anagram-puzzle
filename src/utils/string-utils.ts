import { CONSONANTS } from '@/utils/random-utils';

export function normalizeString(str: string = ''): string {
    return str.trim().toLowerCase();
}

export function shuffleString(str: string = ''): string {
    const arr = str.split('');

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = arr[i]!;
        arr[i] = arr[j]!;
        arr[j] = tmp;
    }

    return arr.join('');
}

export function isConsonant(character: string): boolean {
    return CONSONANTS.includes(normalizeString(character));
}
export function sortString(word: string = ''): string {
    return word.split('').sort().join('');
}

export function sortAndNormalizeString(word: string = ''): string {
    return word.split('').map(normalizeString).sort().join('');
}
