const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const path = require('path');


function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadURL(" http://localhost:3000/")
}

app.whenReady().then(() => {
  // Inicia o servidor Node.js a partir do executável gerado pelo pkg
  /*const serverExecutable = path.join("C:/Users/Rodrigo/Documents/Programação/ManagerShutdownNetwork/dist/", 'script.vbs');  // Altere conforme o SO
  
  exec(`wscript "${serverExecutable}"`, (err, stdout, stderr) => {
    if (err) {
      console.error('Erro ao iniciar o servidor:', err);
      return;
    }
    console.log('Servidor iniciado com sucesso:', stdout);
  });*/

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  /*exec('taskkill /IM network-manager.exe /F', (err, stdout, stderr) => {
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
