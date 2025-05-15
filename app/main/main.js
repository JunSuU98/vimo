const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Vimo',
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, '../preload/preload.js'),
        }
    })

    win.loadFile('../renderer/index.html')
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

    // app.on('activate', () => {
    //     if(BrowserWindow.getAllWindows().length === 0){
    //         createWindow()
    //     }
    // })
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})
