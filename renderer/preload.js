const { contextBridge, ipcRenderer } = require('electron');

// Expor algumas funcionalidades ao processo de renderização de forma segura
contextBridge.exposeInMainWorld('api', {
  OpenPrompt: (url)=> ipcRenderer.send("open-prompt", url),
  ClosePrompt: ()=> ipcRenderer.send('close-prompt'),
  sendURL: (url) => ipcRenderer.send('set-url', url),
  OpenLoading: ()=> ipcRenderer.send('open-loading'),
  CloseLoading: ()=> ipcRenderer.send('close-loading'),
  CloseMainWindow: ()=> ipcRenderer.send('close-main-window'),
  receive: (channel, callback) => {
    if (channel === 'update-message') {
      ipcRenderer.on(channel, (_, message) => callback(message));
    }
  },
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  GetAddressIP: ()=> ipcRenderer.invoke('serverip'),
  NavigateTo: (page)=> ipcRenderer.send('navigate-to', page)
});