import cluster from 'cluster';
import os from 'os';
import http from 'http';
import { createServer } from './server.js';

const PORT = parseInt(process.env.PORT, 10) || 4000;
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master process is running on PID: ${process.pid}`);

  // Fork workers
  for (let i = 1; i < numCPUs; i++) {
    cluster.fork({ WORKER_PORT: PORT + i });
  }

  // Load balancer
  const loadBalancer = http.createServer((req, res) => {
    const workerIndex = (req.socket.remotePort % (numCPUs - 1)) + 1; // Round-robin
    const workerPort = PORT + workerIndex;

    const options = {
      hostname: 'localhost',
      port: workerPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxy = http.request(options, (workerRes) => {
      res.writeHead(workerRes.statusCode, workerRes.headers);
      workerRes.pipe(res, { end: true });
    });

    req.pipe(proxy, { end: true });
  });

  loadBalancer.listen(PORT, () => {
    console.log(`Load balancer is running on http://localhost:${PORT}`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const workerPort = process.env.WORKER_PORT;
  const server = createServer();
  server.listen(workerPort, () => {
    console.log(`Worker process is running on http://localhost:${workerPort}`);
  });
}