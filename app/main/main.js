const { contentTracing } = require('electron')
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require('fs')

const fileList = fs.readdirSync("/Users/jun/Desktop/test")

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

    win.loadFile('../renderer/index.html').then(() => {
        win.webContents.send('file-list', fileList)
    })
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})
