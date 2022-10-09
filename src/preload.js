const {contextBridge, ipcRenderer} = require('electron');

const _prefix = 'smartstock';

contextBridge.exposeInMainWorld(`${_prefix}`, {
    print: (data, printer) => ipcRenderer.invoke(`${_prefix}.print`, data, printer),
    printers: () => ipcRenderer.invoke(`${_prefix}.printers`)
});
