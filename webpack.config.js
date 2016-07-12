/**
 * Start webpack with watch:
 * webpack --progress --watch
 * or
 * npm run build
 *
 * Start the static node (hapi) server:
 * npm start
*/
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/js'
  },
  cache: true,
  debug: true,
  devtool: 'source-map',
  plugins: [
    new DotenvPlugin({
      sample: './.env.default',
      path: './.env'
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|\.c9)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    }]
  },
  node: {
    fs: 'empty'
  }
};