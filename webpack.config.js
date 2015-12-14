/**
 * Created by Guillaume on 23/11/2015.
 */

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = __dirname + '/src/public';
var APP_DIR = __dirname + '\\src\\SearchApp';
var STYLES_DIR = __dirname + '/src/SearchApp/styles';

console.log(BUILD_DIR);
var config = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        APP_DIR + '/index.jsx',
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: APP_DIR,
                loaders: ['react-hot', 'babel']
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg.*$|\.woff.*$|\.ttf.*$|\.wav$|\.mp3$|\.eot.*$/,
                loader: "url-loader"
            }

        ]
    }
}
module.exports = config;
