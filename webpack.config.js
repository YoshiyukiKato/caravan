const path = require('path');
const webpack = require('webpack');
const WebpackIconvPlugin = require('webpack-iconv-plugin');

const VERBOSE = process.argv.includes('--verbose');

module.exports = {
  plugins: [new webpack.optimize.AggressiveMergingPlugin()],
  
  entry : {
    "index" : ["./src/index"],
    "web" : ["./src/web"],
  },

  output: {
    publicPath: '/',
    sourcePrefix: '',
    path: __dirname + "/dest/",
    filename: '[name].js',
    libraryTarget: "umd"
  },

  target: "web",

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  
  devtool : 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, "dest"),
    compress: true,
    port: 9000
  },

  module : {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        loader : 'babel-loader',
        exclude : /node_modules/,
        include : __dirname + "/src/js"
      },
      
      {
        test: /\.(ts|tsx)?$/,
        loader : "ts-loader",
        exclude : /node_modules/,
        include : __dirname + "/src"
      },
      
      {
        test : /\.scss$/,
        loaders : ["style-loader", "css-loader", "sass-loader"],
        include : __dirname + "/src/scss"
      }
    ]
  }
};
