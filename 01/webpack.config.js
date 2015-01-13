'use strict';

var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './app.js'
  ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    // Allow to omit extensions when requiring these files
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      // Pass *.jsx files through jsx-loader transform
      { test: /\.js$/, loaders: ['react-hot', 'jsx-loader?harmony'] },
      { test: /\.woff$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf$/, loader: "file-loader" },
      { test: /\.eot$/, loader: "file-loader" },
      { test: /\.svg$/, loader: "file-loader" },
      { test: /\.otf$/, loader: "file-loader" },
    ]
  }
};
