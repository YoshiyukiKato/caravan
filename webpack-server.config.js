const fs = require("fs");
const path = require('path');
const webpack = require('webpack');

const VERBOSE = process.argv.includes('--verbose');

let entry = {};

fs.readdirSync("./example/src").map((file) => {
  const f = file.match(/(.+)\.ts$/);
  if(f){
    const filename = `${f[1]}`;
    entry[filename] = "./example/src/" + filename;
  }
});

module.exports = {
  plugins: [new webpack.optimize.AggressiveMergingPlugin()],
  
  entry : entry,

  output: {
    publicPath: '/',
    sourcePrefix: '',
    path: __dirname + "/example/dest",
    filename: '[name].js',
    libraryTarget: "umd"
  },

  target: "web",

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  
  devtool : 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, "example/dest"),
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