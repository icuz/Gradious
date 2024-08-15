const fs = require('fs');
const pathModule = require('path');

function getFileContent(fileName){
  const fullPath = pathModule.join(__dirname,'lib', fileName);

  const reader = fs.createReadStream(fullPath, { encoding: 'utf8' });

  reader.on('data', (chunk) => {
    console.log(chunk);
  });

  reader.on('error', (err) => {
    console.error(`Error reading file ${fileName}: ${err.message}.`);
  });
  reader.on('end', () => {
    console.log(`Finished reading ${fileName}.`);
  });
}

console.log("Reading...");
getFileContent('readme.txt');
getFileContent('student.csv');
getFileContent('index.html');

