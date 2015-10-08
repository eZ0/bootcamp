var webpack = require('webpack');
var BowerWebpackPlugin = require('bower-webpack-plugin')

module.exports = {
    entry: __dirname + '/src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    devtool: "source-map",
    module: {
        preLoaders: [
            // { test:/\.js$/, loader: 'eslint-loader', exclude: /(node_modules|bower_components)/},
        ],
        loaders:[
            { test:/\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/ },
            { test:/\.scss$/, loader: 'style!css?sourceMap!sass?sourceMap' },
            { test:/\.(png|jpg|jpeg)$/, loader: 'url-loader?limit=4000' }

        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery'
        }),
        new BowerWebpackPlugin({
            excludes: /.*\.less/
        }),
    ]
}
