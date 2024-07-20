const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
	fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
	  if (err) {
		res.writeHead(500);
		res.end('Error loading index.html');
	  } else {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(data);
	  }
	});
  }
});

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});