module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      'test/fixtures/*.html',
      'test/fixtures/bower_components/jquery/dist/jquery.min.js',
      'test/ts/*.test.ts'
    ],

    //webpack : require("./karma.webpack.config"),
    
    // list of files to exclude
    exclude: [
      '**/*.swp'
    ],

    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },

    plugins : [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-sinon',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-html2js-preprocessor',
      'karma-mocha-reporter',
    ],

    webpack: {
      devtool : 'inline-source-map',
      externals: {
        jquery: '$'
      },
      module : {
        //noParse : /jquery/,
        loaders: [
          /*{
            test: /\.js|\.jsx$/,
            loader : 'babel-loader',
            //include : __dirname + "/src/js",
            exclude : /node_modules/
          },*/
          {
            test: /\.tsx?$/,
            loader : 'awesome-typescript-loader',
            //include : __dirname + "/src/ts",
            exclude : /node_modules/
          },
        ]
      }
    },

    webpackMiddleware: {
      stats : "errors-only" //https://webpack.js.org/configuration/stats/
    },
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/ts/**/*.test.ts' : ['webpack', 'sourcemap'],
      //'test/fixtures/*.html': ['html2js']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    //autoWatch: true,

    browserConsoleLogOptions: {level: "", terminal: true},

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    //concurrency: Infinity
  })
}