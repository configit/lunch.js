#!/bin/env node
'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var port = process.env.npm_package_config_port || 8080;

new WebpackDevServer( webpack( webpackDebugConfig( config ) ), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: { colors: true, timings: true, chunks: false, hash: false }
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:' + port);
});

function webpackDebugConfig( config ) {
  var debugConfig = Object.keys( config )
    .reduce( function( obj, k ) { obj[k] = config[k]; return obj; }, {} );

  Object.keys( debugConfig.entry ).forEach( function( k ) {
    debugConfig.entry[k].unshift( 'webpack/hot/dev-server' );
    debugConfig.entry[k].unshift( 'webpack-dev-server/client?http://localhost:8080' );
  } );

  debugConfig.plugins.unshift( new webpack.HotModuleReplacementPlugin() );

  return debugConfig;
}