const { contextBridge, ipcRenderer } = require('electron');

const _prefix = 'smartstock';

contextBridge.exposeInMainWorld(`${_prefix}`, {
    print: (data) => ipcRenderer.invoke(`${_prefix}.print`, data)
});