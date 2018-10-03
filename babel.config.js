const {BABEL_ENV, NODE_ENV} = process.env

const useCommonJS = BABEL_ENV === 'cjs' || NODE_ENV === 'test'

const presets = [
  ['@babel/env', {'modules': useCommonJS ? 'commonjs' : false}],
  '@babel/react'
]

const plugins = [
  '@babel/plugin-proposal-class-properties',
  'react-hot-loader/babel'
]

const ignore = []

if (NODE_ENV === 'production') {
  ignore.push('**/*.test.js')
}

module.exports = {
  presets,
  plugins,
  ignore
}
