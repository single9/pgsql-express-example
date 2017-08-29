const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Read From CLI.
 * 
 * @param {string} [question='Input: '] question
 * @param {any}    [defaul=undefined]   default value
 * @returns Promise
 * @example
 * let name = await readFromCLI ('Name: ');
 * 
 */
module.exports.read = function readFromCLI (question='Input: ', defaul=undefined) {
  return new Promise ((resolve, reject) => {
    rl.question(question, (answer) => {
      let ans = `${answer}`;

      if (ans === '' || ans === undefined) {
        if (defaul) {
          resolve(defaul);
        } else {
          resolve('');
        }
      } else {
        resolve(`${answer}`);
      }

    });
  })
}

module.exports.close = function closeReadLine () {
  return rl.close();
}