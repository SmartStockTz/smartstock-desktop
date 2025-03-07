const {app, BrowserWindow, Menu, shell} = require('electron');
const path = require('path');

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    let mainWindow = null;
    let splashScreen = null;

    const menuTemplateDev = [
        {
            label: 'Help',
            click() {
                require('electron').shell.openExternal('https://tawk.to/chat/5fe973abdf060f156a90dd77/1eqjunn83').catch(_ => {
                });
            },
        },
        {
            label: 'Privacy',
            click() {
                require('electron').shell.openExternal('https://smartstock-faas.bfast.mraba.co.tz/privacy').catch(_ => {
                });
            },
        },
        {
            label: 'Options',
            submenu: [
                {
                    label: 'Dev Tools',
                    click() {
                        mainWindow.openDevTools();
                    },
                },
            ],
        },
    ];

    async function createWindow() {

        splashScreen = new BrowserWindow({
            show: false,
            width: 400,
            maxWidth: 400,
            height: 400,
            maxHeight: 400,
            center: true,
            modal: true,
            frame: false
        });
        mainWindow = new BrowserWindow({
            height: 700,
            width: 1200,
            show: false,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        });
        Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplateDev));
        if (splashScreen) {
            await splashScreen.loadFile(__dirname + `/../splash_assets/ic_launcher_foreground.png`);
            splashScreen.show();
        }

        mainWindow.webContents.on('dom-ready', () => {
            mainWindow.show();
            if (splashScreen) {
                try {
                    splashScreen.close();
                } catch (e) {
                    console.log(e);
                }
            }
        });
        mainWindow.webContents.setWindowOpenHandler((handler) => {
            if (handler.disposition === 'new-window') {
                shell.openExternal(handler.url).catch(_ => ({}));
            }
        });
        await mainWindow.loadURL('https://kanida.web.app');
    }

    app.whenReady().then(createWindow);

    app.on('window-all-closed', app.quit);

    app.on("second-instance", (event, commandLine, workingDirectory) => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        }
    });

    app.on('activate', function () {
        if (mainWindow === null) {
            createWindow().catch(console.log);
        }
    });

}
