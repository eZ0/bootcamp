var webpack = require('webpack');

module.exports = {
    context: __dirname + "/app",
    entry: "./app.jsx",

    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: '/public/'
    },

    module: {
        loaders:[
            {test: /\.jsx$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader']}
        ]
    }
};
