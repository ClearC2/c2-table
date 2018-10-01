const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  entry: path.join(__dirname, 'src', 'index.js'),
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist', 'umd'),
    filename: 'c2-table.js',
    library: 'C2Table',
    libraryTarget: 'umd'
  },
  externals: {
    react: 'react',
    'prop-types': 'prop-types'
  }
})
