const fs = require('fs');

const exe1 = './lib/mingw-get-setup.exe';
const exe2 = './lib/gradious-assignment.exe';

const readStream = fs.createReadStream(exe1);

readStream.on('error', (error) => {
    console.error('Error reading the file:', error);
});

const writeStream = fs.createWriteStream(exe2);

writeStream.on('error', (error) => {
    console.error('Error writing the file:', error);
});

readStream.pipe(writeStream);
writeStream.on('finish', () => {
    console.log('File has been written successfully.');
});



