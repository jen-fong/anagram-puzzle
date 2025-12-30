import { readFileSync } from 'fs';

export function isNodeError(err: unknown) {
    return err instanceof Error && 'code' in err;
}

export function readTextFile(filePath: string): string[] {
    try {
        const data = readFileSync(filePath, 'utf8');
        return data.split('\n').filter((word: string) => !!word);
    } catch (err) {
        if (isNodeError(err)) {
            // Two common errors related to opening files. I throw a generic error for all other errors
            if (err.code === 'ENOENT') {
                throw new Error(
                    `[WordManager] Resource not found: Could not find the file at "${filePath}".`
                );
            }

            if (err.code === 'EACCES') {
                throw new Error(
                    `[WordManager] Permission denied: Cannot read the file at "${filePath}".`
                );
            }
        }
    }
    throw new Error(`[WordManager] Unexpected error reading "${filePath}"`);
}
