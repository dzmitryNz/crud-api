import * as http from 'node:http';

import { PORT } from './env.js';
import { usersController } from './users/users.contorller.js';

const server = http.createServer((req, res) => {
  const path = req.url;
  const method = req.method;
  console.log(`Server Request method: ${method}, Request path: ${path}`);
  if (path.match(/\/api\/users(\/\w+)?/)) {
    return usersController(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Requested URL not have on this server\n');
    return;
  }
});

export const createServer = () => server;

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
