const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/page/home/index.tsx'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.js',
        globalObject: 'this',
        libraryTarget: 'umd',
        libraryExport: 'default',
        
    },
    module: {
        rules: [
            {
                test: /\.tsx/,
                use: 'babel-loader'
            },
            {
                test: /\.less/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','less-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 类似于 webpackOptions.output 中的选项
            // 所有选项都是可选的
            filename: 'static/[name].css',
            chunkFilename: 'static/[id].css'
          })
    ]
}