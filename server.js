var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
if (process.env.NODE_ENV === 'production') {
  var config = require('./webpack.prod.config')
} else {
  var config = require('./webpack.config')
}
var express = require('express')

var app = new express()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use('/images', express.static('images'))

app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html')
})


app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
