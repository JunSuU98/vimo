const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping')
})

// contextBridge 에 test 객체 노출
contextBridge.exposeInMainWorld('test', {
    hello: () => {
        console.log("hello world from preload")
    }
})

// contextBridge.exposeInMainWorld('fileList', {
//     getFile: () => ipcRenderer.on('file-list', (event, value) => {
//         console.log(value)
//     })
// })

contextBridge.exposeInMainWorld('fileAPI', {
    selectFolder: () => ipcRenderer.invoke('dialog:openFolder'),
    selectFile: () => ipcRenderer.invoke('dialog:openFile')
})