/**
 * Created by DuanG on 2016/7/14.
 */
/**
 * Created by XD on 2016/7/12.
 */
import path=require('path');
import webpack=require('webpack');
import {compilePath,hotReloadServerUri} from './dominSite.config';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports={
    //是否使用缓存
    cache: true,

    //是否使用sourcemap
    //devtool: 'source-map',

    entry: {"common/core":
        ['babel-polyfill', 'ts-helpers', 'react', 'react-dom', 'react-router', 'react-redux', 'react-router-redux', 'redux-thunk', 'classnames', 'superagent', 'fastclick'
    ],
        'bundle':compilePath
    },

    output:{
        path:path.join(__dirname, 'dist'),
        filename:'[name].js',
        publicPath:"/dist/"
    },

    module:{
        loaders:[
            {
                test:/\.js$/,
                exclude:/(node_modules|typings)/,
                include:/client/,
                loaders:['babel']
            },
            {
                test: /\.less/,
                loader: 'style!css!postcss!less'
                /*loader: ExtractTextPlugin.extract(
                    'style!postcss',
                    'css!less'
                )*/
            },
            {
                test: /\.css$/,
                //loader: 'style!css!postcss'
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css!postcss'
                )
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
        extensions: ['', '.js', 'ts', '.tsx'],
        alias: {
            "ts-helpers": path.join(__dirname, 'client/common/externals/ts-helpers')
        },
        modulesDirectories: [
            '',
            'src',
            'node_modules'
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common/core', 'common/core.js'),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.ProvidePlugin({
            __extends: 'ts-helpers'
        })
    ]
};