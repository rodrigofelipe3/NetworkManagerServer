const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const path = require('path');


const OpenExpressServer = () => {

  const filePath = 'C:/Program Files/TI Administration/Server/server.exe';
  return new Promise((resolve, reject) => {
    const command = `powershell -Command "Start-Process -FilePath '${filePath}' -Verb RunAs -WindowStyle Hidden `;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro: ${error.message}`);
        resolve({ ok: false, error: error });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        resolve({ ok: false, error: stderr });
      }
      resolve({ ok: true, msg: "Servidor express iniciado" });
    });
  })
}

const OpenReactServer = async () => {

  const filePath = 'C:/Program Files/TI Administration/build/webserver.exe';
  return new Promise((resolve, reject) => {
    const command = `powershell -Command "Start-Process -FilePath '${filePath}' -Verb RunAs -WindowStyle Hidden `;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro: ${error.message}`);
        resolve({ ok: false, error: error });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        resolve({ ok: false, error: stderr });
      }
      resolve({ ok: true, msg: "Servidor express iniciado" });
    });
  })
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: './preload.js',
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadURL("http://localhost:3000/")
}

app.whenReady().then(async () => {

  /*const response = await OpenExpressServer()
  if(response.ok == true) { 
      const response = await OpenReactServer()
      if(response.ok == true) { 
          createWindow();
      }
  }else { 
    alert("Erro " + response.error)
  }
*/
  createWindow()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
 /* exec('taskkill /F /IM server.exe /IM webserver.exe ', (err, stdout, stderr) => {
    if (err) {
      console.error('Erro ao fechar network-manager.exe:', err);
      return;
    }
    console.log('network-manager.exe finalizado com sucesso');
  });*/
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
