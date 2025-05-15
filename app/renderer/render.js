const { vim } = require('@replit/codemirror-vim')
const { basicSetup } = require('codemirror')
const { EditorView } = require('codemirror')


const view = new EditorView({
    doc: "start doc",
    parent: document.body,
    extensions: [
        vim(),
        basicSetup
    ]
})