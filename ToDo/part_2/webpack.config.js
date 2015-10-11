var webpack = require('webpack');

module.exports = {
      entry: __dirname + "/src/entry.js",
      output: {
            path: __dirname + "/src",
            filename: "bundle.js",
            publicPath: '/src/'
      },
      devtool: "source-map",
      module: {
            loaders: [
                  { test:/\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/ },
                  { test:/\.css$/, loader: 'style!css?sourceMap' }
            ]
      }
};
