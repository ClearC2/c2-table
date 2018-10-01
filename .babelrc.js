const presets = [
  ['@babel/env', {'modules': process.env.BABEL_ENV === 'cjs' ? 'commonjs' : false}],
  '@babel/react'
]

const plugins = [
  '@babel/plugin-proposal-class-properties'
]

if (process.env.NODE_ENV === 'development') {
  plugins.push('react-hot-loader/babel')
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(['transform-react-remove-prop-types', {'removeImport': true}])
}

module.exports = {presets, plugins}
