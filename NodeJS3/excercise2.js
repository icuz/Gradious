const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, '/lib/users.txt'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error reading users.txt');
      } else {
        const users = data.split('\n').map(line => line.split('|').map(value => value.trim()));
        let tableContent = users.map(user => `<tr>${user.map(detail => `<td>${detail}</td>`).join('')}</tr>`).join('');
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Users</title>
            <style>
              table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
              }
              th, td {
                padding: 10px;
                text-align: left;
              }
            </style>
          </head>
          <body>
            <table>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>City</th>
              </tr>
              ${tableContent}
            </table>
          </body>
          </html>
        `;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      }
    });
  }
});

server.listen(80, () => {
  console.log('Server is running on http://localhost');
});