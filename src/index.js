const {app, ipcMain} = require('electron');
const { handlePrinting,handlePrinters } = require('./printer.js');

app.commandLine.appendSwitch('allow-insecure-localhost', 'true');
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    // console.log(url);
    event.preventDefault();
    callback(true);
});
process.env.IS_DESKTOP_SSM = '1';
ipcMain.handle('smartstock.print',handlePrinting);
ipcMain.handle('smartstock.printers',handlePrinters);
require("./app");
