const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require('fs')
const { dialog } = require('electron')

// const fileList = fs.readdirSync("/Users/jun/Desktop/test")

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

    // win.loadFile('../renderer/index.html').then(() => {
    //     win.webContents.send('file-list', fileList)
    // })
    win.loadFile('../renderer/index.html')
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

//폴더 선택
async function handleFolderOpen (){
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory']
    })
    if (!canceled){
        let folderData = {
            folderPath: filePaths[0],
            // folderFiles: fs.readdir(filePaths[0], {withFileTypes: true})
            folderFiles: await exploreFolder(filePaths[0])
        }

        console.log("print total file", folderData)
        return folderData
    }
}
ipcMain.handle('dialog:openFolder', handleFolderOpen)

// 폴더 탐색 (하위 구조 만들기)
async function exploreFolder(folderPath){
    const folderData = await fs.promises.readdir(folderPath, {withFileTypes: true})
    let result = {}
    let fileArr = []

    for (const item of folderData) {
        if(item.isDirectory() == true){
            const itemPath = path.join(folderPath, item.name); // 하위 폴더의 path
            result[item.name] = await exploreFolder(itemPath)
        } else {
            fileArr.push(item)
        }
    }

    if(fileArr.length !== 0){
        result[folderPath] = {"files": fileArr}
    }

    console.log(result)

    return result
}


// 파일 선택
async function handleFileOpen () {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (!canceled){
        return filePaths[0]
    }
}
ipcMain.handle('dialog:openFile', handleFileOpen)