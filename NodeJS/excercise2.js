const fs = require('fs');

function generateRandomChar() {
  const charPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randomIndex = Math.floor(Math.random() * charPool.length);
  return charPool[randomIndex];
}

function generateWord(wordLength) { 
  let word = '';
  for (let i = 0; i < wordLength; i++) {
    word += generateRandomChar();
  }
  return word;
}

const wordCount = 100; 
const words = Array.from({ length: wordCount }, () => generateWord(10)) 
  .join('\n');

fs.writeFile('./lib/random_words.txt', words, (err) => { 
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('Random words written successfully to lib/random_words.txt');
});
