const { app, BrowserWindow, nativeTheme, ipcMain } = require('electron');
const path = require('node:path');
const axios = require('axios');

let mainWindow;
let loadWindow;

function createWindow() {
  nativeTheme.themeSource = 'dark';
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    icon: './src/assets/imagens/logo.ico',
    resizable: false,
    autoHideMenuBar: true, // Esconde a barra de menu File etc.
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL('http://localhost:3000/');
}

const createLoading = () => {
  loadWindow = new BrowserWindow({
    width: 400,
    height: 300,
    resizable: false,
    autoHideMenuBar: true,
    frame: false, // Remove a barra superior
    title: 'Loading',
    icon: './src/assets/imagens/loading-icon.png',
    minimizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  loadWindow.loadFile('./build/loading.html'); // Certifique-se de ter o arquivo de loading.
  loadWindow.setTitle('Loading');
};

// Função para verificar o servidor
const waitForServer = async () => {
  const MAX_ATTEMPTS = 10; // Número máximo de tentativas
  const INTERVAL = 1000; // Intervalo entre tentativas (1s)

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await axios.get('http://localhost:3000');
      if (response.status === 200) {
        return true; // Servidor está ativo
      }
    } catch (error) {
      console.log(`Tentativa ${attempt} falhou. Servidor não disponível.`);
    }
    await new Promise((resolve) => setTimeout(resolve, INTERVAL));
  }

  return false; // Servidor não respondeu
};

app.whenReady().then(async () => {
  createLoading(); // Mostra a tela de loading inicialmente

  const serverReady = await waitForServer();
  if (serverReady) {
    if (loadWindow) {
      loadWindow.close(); // Fecha a janela de loading
      loadWindow = null;
    }
    createWindow(); // Cria a janela principal
  } else {
    console.log('Servidor não respondeu após múltiplas tentativas.');
    if (loadWindow) {
      loadWindow.close();
      loadWindow = null;
    }
    app.quit(); // Fecha o aplicativo se o servidor não iniciar
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
