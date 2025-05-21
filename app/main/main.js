const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const fs = require('fs')
const { dialog } = require('electron')


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
            folderFiles: await exploreFolder(filePaths[0])
        }

        return folderData
    }
}
ipcMain.handle('dialog:openFolder', handleFolderOpen)

// 폴더 탐색 (트리 구조 만들기)
async function exploreFolder(folderPath) {
    try {
        const items = await fs.promises.readdir(folderPath, {withFileTypes: true});
        const result = {};

        for (const item of items) {
            const itemPath = path.join(folderPath, item.name);

            if (item.isDirectory()) {
                result[item.name] = await exploreFolder(itemPath); // 하위 폴더도 탐색
            }
        }

        // 현재 폴더의 파일들을 찾아서 해당 폴더 키 아래의 배열에 추가
        const files = items.filter(item => !item.isDirectory());

        if (Object.keys(result).length > 0 || files.length > 0) { // 하위 폴더가 있거나, 파일이 있는 경우

            const folderResult = {};

            if (Object.keys(result).length > 0) { // 하위 폴더가 있는 경우
                folderResult.folders = result;
            }

            if (files.length > 0) { // 파일이 있는 경우
                folderResult.files = files;
            }

            return folderResult;
        } else {
            return null; // 빈 폴더인 경우 null 반환
        }
    } catch (error) {
        console.error('폴더 탐색 중 오류 발생:', error);
        return null;
    }
    }


// 파일 선택
async function handleFileOpen () {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (!canceled){
        return filePaths[0]
    }
}
ipcMain.handle('dialog:openFile', handleFileOpen)