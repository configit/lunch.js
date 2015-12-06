'use strict';

var webpack = require('webpack');

module.exports = {
  cache: true,
  context: __dirname,
  devtool: 'eval-source-map',
  entry: {
    'quote-list' : ['./quote-list/app.js'],
    're-render' : ['./re-render/app.js']
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js",
    publicPath: '/scripts/'
  },
  plugins: [ ],
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
      { test: /\.json$/, loader: "json-loader" }
    ]
  }
};
