const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const POST = 3000;
const mainPage = path.join(__dirname, 'pages');

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET') {
    const site = await fs.readFile(path.join(mainPage, 'index.html'));
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(site);
  } else if (req.method === 'POST') {
    const body = [];

    req.on('data', (data) => {
      body.push(Buffer.from(data));
    });

    req.on('end', () => {
      const title = body.toString().split('=')[1].replaceAll('+', ' ');
    });

    res.end('post');
  }
});

server.listen(POST, () => {
  console.log('SERVER STARTED');
});
