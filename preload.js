const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  notify: (item) => ipcRenderer.invoke('show-notification', item),
})