const path = require('path')

module.exports = {
    mode: 'production',
    entry: './app/renderer/render.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './app/renderer')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    target: 'electron-renderer'
}