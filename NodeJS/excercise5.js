const fs = require('fs');

function convertTextToJSON(filePath) { 
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    processData(data); 
  });
}

function processData(data) {
  const lines = data.trim().split('\n');
  const headers = lines[0].trim().split('|').map(header => header.trim());
  const jsonData = lines.slice(1).map(line => {
    const values = line.split('|').map(value => value.trim());
    const obj = {};
    headers.forEach((header, index) => (obj[header] = values[index]));
    return obj; 
  });

  console.log('Converted data to JSON:', JSON.stringify(jsonData, null, 2)); 
}

console.log('Reading data from text file and converting it to JSON...');
convertTextToJSON('./lib/exercise5.txt');
