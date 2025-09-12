const http = require('http');
const fs = require('fs');
const port = 2391;

const fileRequest = (req, res) => {
  let filename = "";

  switch (req.url) {
    case '/':
      filename = './index.html';
      break;
    case '/home':
      filename = './home.html';
      break;
   
  }

  fs.readFile(filename, (err, result) => {
    if (!err) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(result);
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  });
};

const server = http.createServer(fileRequest);

server.listen(port, (err) => {
  if (!err) {
    console.log(`Server started on port ${port}`);
  } else {
    console.log('Server not started');
  }
});
