"use strict";
var path = require('path');
var webpack = require('webpack');
var dominSite_config_1 = require('./dominSite.config');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    //是否使用缓存
    cache: true,
    //是否使用sourcemap
    // devtool: 'source-map',
    /*entry:[
        'webpack-dev-server/client?' + hotReloadServerUri, // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        compilePath
    ],*/
    entry: { "common/core": [
            'webpack-dev-server/client?' + dominSite_config_1.hotReloadServerUri,
            'webpack/hot/only-dev-server',
            'ts-helpers', 'react', 'react-dom', 'react-router', 'react-redux', 'react-router-redux', 'redux-thunk', 'classnames', 'superagent',
        ],
        'bundle': dominSite_config_1.compilePath
    },
    output: {
        path: __dirname,
        //filename:'bundle.js',
        filename: '[name].js',
        publicPath: "/static/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|typings)/,
                include: /client/,
                loaders: ['react-hot', 'babel-loader']
            },
            /* {
                 test: /\.js?$/,
                 exclude: /node_modules/,
                 loader: 'babel',
                 query: {
                     presets: ['es2015', 'react', 'stage-0'],
                 }
             },*/
            {
                test: /\.less/,
                //loader: 'style!css!less'
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            {
                test: /\.css$/,
                //loader: 'style!css!postcss'/*把扩展的语法和特性转换成现代的浏览器友好的CSS。*/
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            },
            {
                test: /ts\-helpers/,
                loader: 'imports?this=>window'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.json/,
                loader: 'json'
            }
        ],
        noParse: [],
    },
    resolve: {
        /*extensions: ['', '.js', 'ts', '.tsx','.json'],*/
        extensions: ['', '.web.js', '.js', '.json'],
        alias: {
            "ts-helpers": path.join(__dirname, 'client/common/externals/ts-helpers')
        },
        modulesDirectories: [
            '',
            'src',
            'node_modules',
            path.join(__dirname, '../node_modules')
        ],
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            __extends: 'ts-helpers'
        }),
        new webpack.DefinePlugin({
            __DEV__: true,
            'process.env.NODE_ENV': true
        }),
        new webpack.optimize.CommonsChunkPlugin('common/core', 'common/core.js'),
    ]
};
