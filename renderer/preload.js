const { contextBridge, ipcRenderer } = require('electron');
const http = require('http');
const { exec } = require('child_process');
const path = require('path');


function checkServerStatus() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 3000,
      path: '/',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      if (res.statusCode === 200) {
        resolve(true); 
      } else {
        reject(new Error(`Status: ${res.statusCode}`));
      }
    });

    req.on('error', (e) => {
      reject(e); 
    });

    req.end();
  });
}


async function initApp() {
  try {
    await checkServerStatus();
    
    ipcRenderer.send('server-ready');
  } catch (error) {
    console.error('Erro ao conectar ao servidor:', error);
    setTimeout(initApp, 1000); 
  }
}

contextBridge.exposeInMainWorld('api', {
  initApp,
});
