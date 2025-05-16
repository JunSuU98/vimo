const { vim } = require('@replit/codemirror-vim')
const { basicSetup } = require('codemirror')
const { EditorView, keymap } = require('@codemirror/view')
const { indentWithTab } = require('@codemirror/commands')

// 내가 만든 기능 (함수)
const sayHelloCommand = (view) => {
    alert('안녕하세요, CodeMirror 확장 기능입니다!');
    // true를 반환하면 이벤트 전파를 중단하여 CodeMirror의 기본 동작을 막습니다.
    // false를 반환하면 다른 키맵이나 기본 동작이 계속 실행될 수 있습니다.
    return true;
};

// Extension 객체 생성: keymap.of() 함수를 호출하여 키맵 확장을 만듭니다.
const myCustomKeymap = keymap.of([
    { key: 'Mod-h', run: sayHelloCommand }, // Ctrl/Cmd + H 키에 연결
    { key: 'F5', run: (view) => {
        console.log('F5 키가 눌렸습니다. 현재 문서 내용:', view.state.doc.toString());
        return true;
    }},
]);

const view = new EditorView({
    doc: "",
    parent: document.getElementById('textarea'),
    extensions: [
        basicSetup,
        vim(),
        myCustomKeymap
    ]
})
