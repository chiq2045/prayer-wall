const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('path');

const mode = process.env.NODE_ENV;
const devMode = mode === 'development';
const plugins = [
  new HtmlWebpackPlugin({
    template: resolve(__dirname, 'src', 'index.html')
  }),
  new MiniCssExtractPlugin({
    filename: devMode ? '[id].css' : '[id].[contenthash].css'
  })
];

module.exports = {
  mode,
  entry: resolve(__dirname, 'src', 'index.js'),
  output: {
    path: devMode ? resolve(__dirname, 'devDist') : resolve(__dirname, 'dist'),
    filename: devMode ? '[name].bundle.js' : '[name].[contenthash].js',
    publicPath: '/assets'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
              plugins: [
                '@pabel/plugin-transform-runtime'
              ]
            }
          }
        ]
      },
      {
        test: /\\.css$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader(),
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.css'
    ]
  },
  devServer: {
    proxy: {
      api: 'http://localhost:3000/pwall',
      auth: 'http://localhost:3000/auth'
    },
    publicPath: '/assets/',
    lazy: true

  },
  plugins
};
