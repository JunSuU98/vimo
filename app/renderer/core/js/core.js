const addFolderBtn = document.getElementById('add-folder-btn')
const folderTree = document.getElementById('folder-tree')

addFolderBtn.addEventListener('click', async () => {
    const folderData = await fileAPI.selectFolder();
    // console.log(folderData.folderPath)
    console.log(folderData.folderFiles)

    // 폴더의 파일들을 사이드바에 표시
    // folderData.folderFiles.forEach(file => {
    //     let node = document.createElement('li')
    //     node.innerText = file
    //     folderTree.appendChild(node)
    // });
})