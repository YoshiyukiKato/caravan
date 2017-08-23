const fs = require("fs-extra");
const path = require('path');
const webpack = require('webpack');
const WebpackIconvPlugin = require('webpack-iconv-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")

const VERBOSE = process.argv.includes('--verbose');

let entry = {
  "index" : ["./src/index"],
  "web" : ["./src/web"],
};

module.exports = {
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new UglifyJSPlugin()
  ],
  
  entry : entry,

  output: {
    publicPath: '/',
    sourcePrefix: '',
    path: __dirname + "/",
    filename: '[name].js',
    libraryTarget: "umd"
  },

  target: "web",

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  
  devtool : 'inline-source-map',

  module : {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader : 'babel-loader',
        exclude : /node_modules/,
        include : __dirname + "/src/js"
      },
      
      {
        test: /\.(ts|tsx)?$/,
        loader : ["babel-loader", "ts-loader"],
        exclude : /node_modules/,
        include : [__dirname + "/src", __dirname + "/example"]
      },
      
      {
        test : /\.scss$/,
        loaders : ["style-loader", "css-loader", "sass-loader"],
        include : __dirname + "/src/scss"
      }
    ]
  }
};