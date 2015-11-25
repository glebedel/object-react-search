/**
 * Created by Guillaume on 23/11/2015.
 */
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = __dirname + '/src/client/public';
var APP_DIR = __dirname + '/src/client/app';
console.log(BUILD_DIR);
var config = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        APP_DIR + '/index.jsx'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: APP_DIR,
                loaders: ['react-hot', 'babel']
            }
        ],
    }
}

module.exports = config;