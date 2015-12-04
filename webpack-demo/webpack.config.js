var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './app.js',

  output: {
    path: './bundle',
    publicPath: '/bundle/',
    filename: 'app.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?presets[]=es2015' },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract( 'style-loader', '!css!autoprefixer' ) },
      { test: /\.png$/, loader: 'url?limit=2500' },
    ]
  },

  plugins: [
    new ExtractTextPlugin( 'style.css' )
  ]
}