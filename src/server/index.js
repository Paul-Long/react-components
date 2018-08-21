const express = require('express');
const app = express();
const http = require('http').Server(app);
const render = require('./render');
const fs = require('fs');
const config = require('../../webpack.config');
const path = require('path');
const socket = require('./socket');

let chunks = [];
const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  const webpack = require('webpack');
  const webpackDevMiddleWare = require('webpack-dev-middleware');
  const webpackHotMiddleWare = require('webpack-hot-middleware');
  const compiler = webpack(config);
  app.use(webpackDevMiddleWare(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    serverSideRender: true,
    aggregateTimeout: 300,
    poll: true,
    stats: {
      chunks: false,
      colors: true
    }
  }));
  app.use(webpackHotMiddleWare(compiler));
} else {
  const compression = require('compression');
  app.use(compression());
  chunks = JSON.parse(fs.readFileSync(config.output.path + '/chunkNames.json')).assetsByChunkName;
}

app.use(express.static(config.output.path));

app.get('/**', function (req, res) {
  isDev && (chunks = res.locals.webpackStats.toJson().assetsByChunkName || {});
  res.send(render(req, chunks));
});

const server = http.listen(4000, function () {
  console.log('listening on http://localhost:4000/');
});

socket(server);
