const path = require('path');
const webpack = require('webpack');

let entry = {
  "index" : ["./src/index"],
  //"web" : ["./src/web"],
};

module.exports = {
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  
  entry : entry,

  output: {
    publicPath: '/',
    sourcePrefix: '',
    path: __dirname + "/dist",
    filename: '[name].js',
    libraryTarget: "umd",
    libraryExport: "Gimmickry"
  },

  target: "web",

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  
  devtool : 'inline-source-map',

  module : {
    rules: [
      /*{
        test: /\.(js|jsx)?$/,
        use : [
          { loader : 'babel-loader' },
        ],
        exclude : /node_modules/,
        include : __dirname + "/src/js"
      },*/
      
      {
        test: /\.(ts|tsx)?$/,
        use : [
          { loader : "babel-loader" },
          { loader : "ts-loader" }
        ],
        exclude : /node_modules/,
        include : __dirname + "/src"
      }
    ]
  }
};