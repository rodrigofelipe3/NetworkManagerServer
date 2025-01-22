const { contextBridge, ipcRenderer } = require('electron');

// Expor algumas funcionalidades ao processo de renderização de forma segura
contextBridge.exposeInMainWorld('api', {
  OpenPrompt: (url)=> ipcRenderer.send("open-prompt", url),
  ClosePrompt: ()=> ipcRenderer.send('close-prompt'),
  sendURL: (url) => ipcRenderer.send('set-url', url),
  OpenLoading: ()=> ipcRenderer.send('open-loading'),
  CloseLoading: ()=> ipcRenderer.send('close-loading'),
  receive: (channel, callback) => {
    if (channel === 'update-message') {
      ipcRenderer.on(channel, (_, message) => callback(message));
    }
  },
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  }
});