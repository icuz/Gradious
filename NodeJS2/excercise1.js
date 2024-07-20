const express = require('express');
const fs = require('fs');

const app = express();

const file = './lib/txtfile.txt';

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    const readStream = fs.createReadStream(file);
    readStream.pipe(res);
});
const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server is running on port 8080');
});