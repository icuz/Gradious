const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the "public" directory
app.use(express.static('lib/html'));

app.listen(80, () => {
  console.log('Server running on http://localhost');
});