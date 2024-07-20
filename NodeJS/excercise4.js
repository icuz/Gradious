const fs = require('fs');
const readline = require('readline');

function addTimestampToLogFile(logFile) {
    const tempFile = logFile + '.tmp';
    const readStream = fs.createReadStream(logFile);
    const writeStream = fs.createWriteStream(tempFile);
    const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity
    });
    rl.on('line', (line) => {
        const timestamp = new Date().toLocaleString();
        writeStream.write(`${timestamp} ${line}\n`);
    });
    rl.on('close', () => {
        writeStream.end();
        fs.rename(tempFile, logFile, (err) => {
            if(err) console.log("Error updating the log file: ", err);
            console.log("Timestamp added successfully");
        });
    });
}

console.log("Adding timestamp to log file.....");
addTimestampToLogFile('./lib/debug.log');