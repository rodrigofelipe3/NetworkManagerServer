const { contextBridge, ipcRenderer } = require('electron');

// Expor algumas funcionalidades ao processo de renderização de forma segura
contextBridge.exposeInMainWorld('api', {
  OpenPrompt: (url)=> ipcRenderer.send("open-prompt", url),
  ClosePrompt: ()=> ipcRenderer.send('close-prompt'),
  sendURL: (url) => ipcRenderer.send('set-url', url)
});