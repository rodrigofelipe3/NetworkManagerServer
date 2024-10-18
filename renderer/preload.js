const { contextBridge, ipcRenderer } = require('electron');

// Expor algumas funcionalidades ao processo de renderização de forma segura
contextBridge.exposeInMainWorld('api', {
  OpenPrompt: ()=> ipcRenderer.send("open-prompt"),
  ClosePrompt: ()=> ipcRenderer.send('close-prompt')
});