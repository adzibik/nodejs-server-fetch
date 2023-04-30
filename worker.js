import { fetchRequest } from './service.js';
import { parentPort } from 'worker_threads';

setInterval(fetchAndUpdate, 10);

async function fetchAndUpdate() {
  try {
    const readsCount = await fetchRequest();
    parentPort.postMessage({ threadValue: readsCount });
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

