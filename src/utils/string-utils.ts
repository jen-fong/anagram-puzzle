export function normalizeString(str: string): string {
    return str.trim().toLowerCase();
}

export function getRandomIndexFromString(str: string): number {
    const randomIndex = Math.floor(Math.random() * str.length);
    return randomIndex;
}

export function shuffleString(str: string): string {
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
    // Regex matches any letter that is NOT a vowel, within the alphabet range.
    // The 'i' flag makes it case-insensitive.
    // The outer ^ ensures it matches only the entire single character.
    return /^[bcdfghjklmnpqrstvwxyz]$/i.test(character);
}
export function sortString(word: string): string {
    return word.split('').sort().join('');
}

export function sortAndNormalizeString(word: string): string {
    return word.split('').sort().map(normalizeString).join('');
}
