import { Worker } from 'worker_threads';

let readsCnt = 0;
let requestsCnt = 0;

async function main() {
  try {
    setInterval(() => {
      const timestamp = new Date().toLocaleString();
      console.log(`[${timestamp}] requests: ${requestsCnt}, reads: ${readsCnt}`);
    }, 60 * 1000);

    const workersAmount = 1;
    console.log(`👷 Spawning ${workersAmount} worker/s...`);
    for (let i = 0; i < workersAmount; i++) {
      const worker = new Worker('./worker.js');
      worker.on('message', (message) => {
        readsCnt += message.threadValue;
        requestsCnt += 1;
      });
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

main();
