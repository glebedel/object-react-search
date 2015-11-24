/**
 * Created by Guillaume on 23/11/2015.
 */
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        APP_DIR + '/index.js'
    ],
    output: {
        path: BUILD_DIR,
        filename: '/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: APP_DIR,
                loaders: ['react-hot', 'babel']
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = config;