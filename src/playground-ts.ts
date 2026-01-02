import { createAnagramPuzzleMakerFromFile } from '@/factories';
// this is playground for testing and playing around with the puzzle maker using typescript
async function createAnagramPuzzlePlayground() {
    const anagramPuzzle = await createAnagramPuzzleMakerFromFile();
    const puzzle = anagramPuzzle.generatePuzzle(5);
    const answers = anagramPuzzle.getAnswer(puzzle);
    const solveAttempt1 = anagramPuzzle.solve(puzzle, 'radio');
    const solveAttempt2 = anagramPuzzle.solve('ioadr', 'radio');
    const unsolveable = anagramPuzzle.generateUnsolveablePuzzle(5);
    console.log('generated puzzle: ', puzzle);
    console.log('get answers for puzzle: ', answers);
    console.log('solve attempt 1: ', solveAttempt1);
    console.log('solve attempt 2: ', solveAttempt2);
    console.log('generated unsolveable puzzle: ', unsolveable);
}

createAnagramPuzzlePlayground();
