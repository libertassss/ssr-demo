const express = require('express')
const webpack = require('webpack')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./config/webpack.dev')
const compiler = webpack(webpackConfig)
const SSR_HTML = require('./dist/main')
const { renderToString } = require('react-dom/server');
const template = fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8');
if (typeof window === 'undefined') {
    global.window = {};
}


app.get('/home', (req, res, next) => {
    const SSR = renderToString(SSR_HTML)
    res.send(template.replace('<!--HTML_PLACEHOLDER-->', SSR).replace('<!--CSS_PLACEHOLDER-->', '<link rel="stylesheet" href="./static/main.css"/>'))
})

app.use(webpackDevMiddleware(compiler, {}))
app.use(express.static(path.join(__dirname, './dist')));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})