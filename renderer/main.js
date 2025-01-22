const { app, BrowserWindow, nativeTheme, ipcMain } = require("electron");
const path = require("node:path");
const axios = require("axios");
const { loadConfig, findIpResponse } = require("./loadConfig");

let mainWindow;
let promptWindow;
let loadWindow;

async function createWindow() {
  nativeTheme.themeSource = "dark";
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    icon: "./src/assets/imagens/logo.ico",
    resizable: false,
    autoHideMenuBar: true, // Esconde a barra de menu File etc.
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  const { serverIP } = await loadConfig();
  if (serverIP == "") {
    findIpResponse();
  }
  mainWindow.loadURL(`http://${serverIP}:3000/`);
}

const createLoading = () => {
  loadWindow = new BrowserWindow({
    width: 400,
    height: 300,
    resizable: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden', //"ESCONDE O TITULO DO PROGRAMA "
    frame: true, // Remove a barra superior
    title: "Loading",
    icon: "./src/assets/imagens/loading-icon.png",
    minimizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  loadWindow.loadFile( "C:/Program Files/AdminNetwork Power Manager/win-unpacked/build/loading.html"); // Certifique-se de ter o arquivo de loading.
  loadWindow.setTitle("Loading");
};

const createPrompt = async (url) => {
  const father = BrowserWindow.getFocusedWindow();
  if (father) {
    promptWindow = new BrowserWindow({
      width: 900,
      height: 500,
      resizable: false,
      autoHideMenuBar: true, //ESCONDE A BARRA DE MENU FIlE etc..,
      titleBarStyle: 'hidden', //"ESCONDE O TITULO DO PROGRAMA "
      title: "Prompt",
      icon: "./src/assets/imagens/prompt-icon.png",
      minimizable: false,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: false,
        contextIsolation: true,
      },
    });
    const { serverIP } = await loadConfig();
    if (serverIP == "") {
      findIpResponse();
    }
    promptWindow.loadURL(`http://${serverIP}:3000/prompt/${url}`);

    promptWindow.setTitle("Prompt");
  }
};

const waitForServer = async () => {
  createLoading();

  const MAX_ATTEMPTS = 30;
  const INTERVAL = 1300;

  const { serverIP } = await loadConfig();
  if (serverIP == "") {
    findIpResponse();
  }

  loadWindow.webContents.send(
    "update-message",
    "Testando conexão com servidor..."
  );
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await axios.get(`http://${serverIP}:3000`);
      if (response.status === 200) {
        loadWindow.webContents.send("update-message", "Servidor iniciado!");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        loadWindow.close();
        loadWindow = null;

        return true;
      }
    } catch (error) {
      alert(`Tentativa ${attempt} falhou. Servidor não disponível.`);
    }
    await new Promise((resolve) => setTimeout(resolve, INTERVAL));
  }
  alert(`Tentativa de Conexão falhou. Servidor não disponível.`);
  loadWindow.close();
  loadWindow = null;
  return false;
};

app.whenReady().then(async () => {
  const serverReady = await waitForServer();
  if (serverReady) {
    createWindow();
  } else {
    console.log("Servidor não respondeu após múltiplas tentativas.");
    if (loadWindow) {
      loadWindow.close();
      loadWindow = null;
    }
    app.quit();
  }
  ipcMain.on("open-prompt", (event, arg) => {
    createPrompt(arg);
  });
  ipcMain.on("close-prompt", (event, arg) => {
    if (promptWindow) {
      if (promptWindow === true) {
        promptWindow.close();
        promptWindow = null;
      }
    }
  });

  ipcMain.on('close-main-window', (event, arg)=> { 
    app.quit()
  })
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
