module.exports = {
    devtool: "eval-source-map",
    entry: "./server.js",
    output: {
        path: __dirname + "/dist",
        publicPath: 'dist/',
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        loaders: [
            {
                // Typescript loader
                test: /\.ts/, loaders: ['ts'], exclude: /node_modules/
            },
            {
                // ES6 loader
                test: /\.js$/,
                loader: ['babel'],
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            }
        ]

    }
};