const { BrowserWindow } = require("electron");

/**
 * 
 * @param {Electron.IpcMainInvokeEvent} e 
 * @param {string} data 
 * @returns 
 */
module.exports.handlePrinting = async (e, data) => {
    if (!data || data === '') {
        throw { message: "Data is required" }
    }
    const l = data.split(new RegExp(/\n/,'g')).length; // Math.round(data.length/6)
    // const lines = data.split(new RegExp(/\n/,'g')).length;
    // linesHeightInMicros = lines*0.5*24*1000;
    data = data.toString().replace(new RegExp(/\n/, 'g'), '<br>')
    // console.log(data);
    const webContent = e.sender;
    const printer = supportedPrinter(webContent.getPrinters());
    if (printer) {
        return new Promise((resolve,reject)=>{
            const pWindow = new BrowserWindow({
                show: false
            });
            data = `
            <html>
            <head>
            <style>
            html,body{margin:0;padding:0}
            </style>
            </head>
            <body>
            <div style="width:60mm; font-size:14px; text-overflow:wrap; font-weight:550">
                ${data}
            </div>
            </body>
            </html>
            `;
            pWindow.webContents.on('did-fail-load',()=>{
                pWindow?.close();
                reject({message: "fail to load data for printing"});
            });
            pWindow.webContents.on('did-finish-load', () => {
                const options = {
                    silent: true,
                    color: false,
                    margin: {marginType: 'none'},
                    landscape: false,
                    pagesPerSheet: 1,
                    collate: false,
                    copies: 1,
                    deviceName: printer.name,
                    pageSize: {
                        width: 68000, //148000
                        height: l*12*1000 // 210000
                    }
                }
                pWindow.webContents.print(options, (success, failureReason) => {
                    if (!success) reject(failureReason)
                    resolve({message: "done printing"});
                    pWindow?.close()
                });
            });
            pWindow.loadURL(`data:text/html;charset=utf-8,${data}`)
        });
    }
    throw { message: "no supported printer make sure you add one e.g EPSON-TM-T series, " }
}

const filterPrinter = (x) => x && typeof x.name === 'string' && x.name.includes('EPSON_TM_T20')

function supportedPrinter(printers) {
    if (Array.isArray(printers)) {
        return printers.filter(filterPrinter)[0];
    } return null;
}