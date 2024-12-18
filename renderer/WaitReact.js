const http = require('http');
const { electron } = require('process');
const serverUrl = 'http://127.0.0.1:3000'; 
const interval = 1000; 

const checkServer = () => {
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

const waitForServer = async () =>{
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
}

module.exports = { waitForServer}