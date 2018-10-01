const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  entry: path.join(__dirname, 'example', 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'example', 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'example', 'dist'),
    historyApiFallback: true,
    port: 8081
  },
  resolve: {
    alias: {
      'c2-table': path.join(__dirname, 'src')
    }
  }
})
