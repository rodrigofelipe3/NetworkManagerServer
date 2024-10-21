const { app, BrowserWindow, nativeTheme, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('node:path');

let promptWindow;


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
  nativeTheme.themeSource = 'dark'
  const win = new BrowserWindow({
    width: 1366,
    height: 768,
    icon: './src/assets/imagens/logo.ico',
    resizable: false,
    //autoHideMenuBar: true, //ESCONDE A BARRA DE MENU FIlE etc..,
    //titleBarStyle: 'hidden', //"ESCONDE O TITULO DO PROGRAMA "
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  win.loadURL("http://localhost:3000/")
}

const createPrompt = (url) => {
  const father = BrowserWindow.getFocusedWindow()
  if (father) {
    promptWindow = new BrowserWindow({
      width: 900,
      height: 500,
      resizable: false,
      autoHideMenuBar: true, //ESCONDE A BARRA DE MENU FIlE etc..,
      parent: father,
      //titleBarStyle: 'hidden', //"ESCONDE O TITULO DO PROGRAMA "
      title: 'Prompt',
      icon: './src/assets/imagens/prompt-icon.png',
      minimizable: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true,
      }
    });

    promptWindow.loadURL(`http://localhost:3000/prompt/${url}`)
    
    promptWindow.setTitle('Prompt');
  }

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
  ipcMain.on('open-prompt', (event, arg) => {
    createPrompt(arg)
  })
  ipcMain.on('close-prompt', (event, arg) => {
    if (promptWindow) {
      promptWindow.close(); // Fecha a janela prompt
      promptWindow = null;  // Remove a referência
    }
  });
})

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
