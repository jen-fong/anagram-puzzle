# Anagram Puzzle
Take home portion of the anagram puzzle live coding assessment. I've added unit tests, handled edge cases, added linting + auto formatting, and organized a bunch of files to declutter the anagram puzzle file.

## 📦 Installation
Please use node v24 and up.

`npm install`

## 🛠️ Playground
I have provided two files, `playground-ts.ts` and `playground-js.js` with some prefilled code so you can play around in there if you want. You can use the javascript file if you don't want to use typescript. The environment is all configured so everything should work.

`npm run playground-js` or `npm run playground-ts` to run the files and out the results into your terminal. It uses tsx watch mode so you can edit the file as you need and it will output to the terminal.

If you have your own playground, you can follow these steps:
1. Run `npm run build` - this will output a dist file
2. import the dist file directly in your file like so
   ```
    // Depending on how your package.json is set up, you can import the commonjs or esmodule version
    const { createAnagramPuzzleMaker } = require('path/to/anagram-puzzle/dist/index.cjs');

    import { createAnagramPuzzleMaker } from 'path/to/anagram-puzzle/dist/index.js';

    // Direct AnagramPuzzle but will only accept words array
    import { AnagramPuzzle } from 'path/to/anagram-puzzle/dist/index.js';
   ```
I recommend using the playgrounds since it's all set up in this project so you don't have to do your own setup.

## Testing
`npm run test` to run vitest suites.

## Technical Details
You can create a puzzle maker using a factory method. I chose this way so that the `AnagramPuzzleMaker` only has to worry about handling an array of words and generating and solving puzzles without file i/o. It will accept an array of words or a file path in string format.
`createAnagramPuzzleMaker`
- `createAnagramPuzzleMaker(['list', 'of', 'words']);`
- `createAnagramPuzzleMaker('path/to/word/file.txt');`

Many edge cases were handled including:
- Empty list of words
- Duplicate words in list
- Normalizing words to lowercase all letters and remove spaces
- If a real word is returned from generatePuzzle, shuffle until it is not up to a max of 10, which should be enough times
- Various inputs to public methods
- Unsolveable puzzle will not run into an infinite loop if it can't generate an unsolveable puzzle by running up to 500 times max

## Game Logic API

### Generate a Puzzle
Generates a scrambled string of a specific length. It ensures the result is not itself a valid word.

```
const puzzle = new AnagramPuzzle(['rat', 'tar', 'art', 'apple']).generatePuzzle(3); 
console.log(puzzle); // e.g., "atr"
```

### Solve and Validate
Check if a user's guess is a valid anagram for the given puzzle based on the dictionary.

```
const puzzleMaker = puzzleMaker.solve('elppa', 'apple');
console.log(isCorrect); // true
```

### Get Possible Answers
Retrieve all words from the dictionary that can be formed by the letters in the puzzle.

```
const answers = puzzleMaker.getAnswer('tca');
console.log(answers); // ['cat', 'act']
```

### Generate Unsolvable Puzzles
Creates a scrambled string that has NO valid solution in the loaded dictionary.

```
const trap = puzzleMaker.generateUnsolveablePuzzle(3);
console.log(trap); // e.g., zat
```

## ⚖️ License
ISC