export function random<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomConsonant(): string {
    return random([
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
    ])!;
}
export function getRandomVowel(): string {
    return random(['a', 'e', 'i', 'o', 'u'])!;
}
