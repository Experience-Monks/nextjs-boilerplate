const escape = require('shell-quote').quote;
const isWin = process.platform === 'win32';

module.exports = {
  '**/*.{js,jsx,ts,tsx}': (filenames) => {
    const escapedFileNames = filenames.map((filename) => `"${isWin ? filename : escape([filename])}"`).join(' ');
    return [
      `prettier --with-node-modules --ignore-path .prettierignore --write ${escapedFileNames}`,
      `next lint --ignore-path .eslintignore --max-warnings=0 --fix --file ${filenames
        .map((filename) => `"${isWin ? filename : escape([filename])}"`)
        .join(' --file ')}`,
      `git add ${escapedFileNames}`
    ];
  },
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  '**/*.{json,md,mdx,css,html,yml,yaml,scss}': (filenames) => {
    const escapedFileNames = filenames.map((filename) => `"${isWin ? filename : escape([filename])}"`).join(' ');
    return [
      `prettier --with-node-modules --ignore-path .prettierignore --write ${escapedFileNames}`,
      `git add ${escapedFileNames}`
    ];
  }
};
