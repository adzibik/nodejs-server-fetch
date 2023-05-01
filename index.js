import { Worker } from 'worker_threads';
import express from 'express';

let readsCnt = 0;
let requestsCnt = 0;

async function main() {
  try {
    setInterval(() => {
      const timestamp = new Date().toLocaleString();
      console.log(`[${timestamp}] requests: ${requestsCnt}, reads: ${readsCnt}`);
    }, 10 * 1000);


      const worker = new Worker('./worker.js');
      worker.on('message', (message) => {
        readsCnt += message.threadValue;
        requestsCnt += 1;
      });
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();

const server = express();

server.all('/', (req, res) => {
    res.send('<h2>Server is ready!</h2>');
});

server.listen(4000, () => {
      console.log('Server Ready.');
});
