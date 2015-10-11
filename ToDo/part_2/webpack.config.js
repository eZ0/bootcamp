var webpack = require('webpack');

module.exports = {
      entry: __dirname + "/src/scripts/app.js",
      output: {
            path: __dirname + "/src",
            filename: "bundle.js",
            publicPath: '/src/'
      },
      module: {
            loaders: [
                  { test:/\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/ }
            ]
      }
};
