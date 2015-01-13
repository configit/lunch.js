#!/bin/env node
'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var port = process.env.npm_package_config_port || 8080;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: { colors: true, timings: true, chunks: false, hash: false }
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:' + port);
});
