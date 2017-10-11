const path = require('path');
const nodeExternals = require('webpack-node-externals');
const APP_DIR = path.resolve(__dirname, 'js');

module.exports = {
    entry: {
        app: "./app/javascript/app-one.js",
    },
    output: {
        path: path.resolve("./app/temp/scripts"),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                test: /\.js$/,
                exclude: /node_modules/,
                include : [
                    APP_DIR,
                    path.resolve(__dirname, 'node_modules/jquery')
                ]
            }
        ]
    },
    node: {
        fs: "empty"
    }
};
