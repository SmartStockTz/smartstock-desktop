const {app, ipcMain} = require('electron');
const { handlePrinting,handlePrinters } = require('./printer.js');

app.commandLine.appendSwitch('allow-insecure-localhost', 'true');
app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
process.env.IS_DESKTOP_SSM = '1';
ipcMain.handle('smartstock.print',handlePrinting);
ipcMain.handle('smartstock.printers',handlePrinters);
require("./app");