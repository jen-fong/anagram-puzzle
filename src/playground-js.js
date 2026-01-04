import { createAnagramPuzzleMaker } from './factories';
// this is playground for testing and playing around with the puzzle maker using javascript
async function createAnagramPuzzlePlayground() {
    const anagramPuzzleMaker = await createAnagramPuzzleMaker();
    const puzzle = anagramPuzzleMaker.generatePuzzle(3);
    const answers = anagramPuzzleMaker.getAnswer(puzzle);
    const solveAttempt1 = anagramPuzzleMaker.solve(puzzle, 'radio');
    const solveAttempt2 = anagramPuzzleMaker.solve('ioadr', 'rADio    ');
    const unsolveable = anagramPuzzleMaker.generateUnsolveablePuzzle(5);
    const unsolveableUndefined = anagramPuzzleMaker.generateUnsolveablePuzzle();
    console.log('generated puzzle: ', puzzle);
    console.log('get answers for puzzle: ', answers);
    console.log('solve attempt 1: ', solveAttempt1);
    console.log('solve attempt 2: ', solveAttempt2);
    console.log('generated unsolveable puzzle: ', unsolveable);
    console.log('unsolveable puzzle answers: ', anagramPuzzleMaker.getAnswer(unsolveable));
    console.log('generated unsolveable puzzle undefined difficulty: ', unsolveableUndefined);
}

createAnagramPuzzlePlayground();
