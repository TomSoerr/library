const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    renderer: './src/renderer/index.js',
  },
  target: 'web',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Kiara's Bücher",
      template: './src/renderer/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  externals: {
    electron: 'require("electron")',
    fs: 'require("fs")',
    path: 'require("path")',
    sequelize: 'require("sequelize")',
    sqlite3: 'require("sqlite3")',
  },
};
