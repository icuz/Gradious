const fs = require('fs');

function copyFile(sourcePath, targetPath) { 
  fs.copyFile(sourcePath, targetPath, (err) => {
    if (err) {
      console.error('Error copying file:', err);
      return;
    }
    console.log(`File ${sourcePath} copied successfully to ${targetPath}`); 
  });
}

console.log('Copying file from lib/readme.txt to lib/new-file.txt...'); 
copyFile('./lib/readme.txt', './lib/new-file.txt'); 
