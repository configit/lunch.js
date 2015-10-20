var webpack = require( 'webpack' );
var path = require( 'path' );

module.exports = {
  entry: './app.js',
  output: {
    path: path.join( __dirname,  'bundle' ),
    publicPath: '/bundle/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};