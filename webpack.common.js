const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward-optional',
          }
        }
      }, {
        test: /\.m?js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [{ loader: 'eslint-loader', options: { emitWarning: true } }]
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=10000', 'img-loader']
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }
      }, {
        test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: { loader: 'file-loader' }
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      atoms: path.resolve(__dirname, 'src/ui/atoms'),
      constants: path.resolve(__dirname, 'src/constants'),
      context: path.resolve(__dirname, 'src/context'),
      features: path.resolve(__dirname, 'src/features'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      molecules: path.resolve(__dirname, 'src/ui/molecules'),
      organisms: path.resolve(__dirname, 'src/ui/organisms'),
      src: path.resolve(__dirname, 'src'),
      templates: path.resolve(__dirname, 'src/ui/templates'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  }
};
