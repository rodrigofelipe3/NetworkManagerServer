const http = require('http');

const serverUrl = 'http://127.0.0.1:3000'; // URL do seu servidor React
const interval = 1000; // Intervalo para tentar novamente (1 segundo)

function checkServer() {
  return new Promise((resolve, reject) => {
    http.get(serverUrl, (res) => {
      if (res.statusCode === 200) {
        resolve(true);
      } else {
        reject(new Error('Servidor não está pronto ainda'));
      }
    }).on('error', () => {
      reject(new Error('Servidor não está pronto ainda'));
    });
  });
}

async function waitForServer() {
  console.log(`Aguardando o servidor React em ${serverUrl}...`);
  let serverReady = false;
  while (!serverReady) {
    try {
      await checkServer();
      serverReady = true;
    } catch (err) {
      console.log(err.message);
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }
  console.log('Servidor React está pronto!');
  process.exit(0); 
}

waitForServer();
