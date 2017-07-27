const fs = require("fs-extra");
const path = require('path');
const webpack = require('webpack');
const WebpackIconvPlugin = require('webpack-iconv-plugin');

const VERBOSE = process.argv.includes('--verbose');

let entry = {
  "index" : ["./src/index"],
};

fs.readdirSync("./example").map((file) => {
  const f = file.match(/(.+)\.ts$/);
  const filename = `example/${f[1]}`;
  entry[filename] = "./" + filename;
});

module.exports = {
  plugins: [new webpack.optimize.AggressiveMergingPlugin()],
  
  entry : entry,

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
    contentBase: path.join(__dirname, "dest/example"),
    compress: true,
    port: 9000
  },

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
        loader : "ts-loader",
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
