const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Define a route to serve the Buddy list JSON
app.get('/buddylist', (req, res) => {
  fs.readFile(path.join(__dirname, './data/buddy-list.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});