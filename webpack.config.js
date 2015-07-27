/* jshint node:true */
var path = require('path');
var webpack = require('webpack');

var publicPath = 'http://localhost:3000/';


module.exports = {
    devtool: 'eval-source-map',
    entry: [
      'webpack-dev-server/client?'+publicPath,
      'webpack/hot/only-dev-server',
      './app/entry.jsx'
    ],
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
      publicPath: publicPath,
      libraryTarget: 'commonjs2'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
              test   : /\.jsx?$/,
              exclude: /(node_modules)/,
              loaders: ['react-hot', 'babel']
            }
        ]
    },
    externals: {
      ipc: 'ipc'
    }
};
