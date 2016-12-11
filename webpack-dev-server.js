"use strict";
/**
 * Created by XD on 2016/7/13.
 */
var webpack = require('webpack');
var config = require('./webpack.config');
var dominSite_config_1 = require('./dominSite.config');
var url = require('url');
var WebpackDevServer = require('webpack-dev-server');
var proxy = require('proxy-middleware');
module.exports = function (app) {
    app.use("/static", proxy(url.parse(dominSite_config_1.hotReloadServerUri + '/static')));
    var bundleStart = null;
    var compiler = webpack(config);
    // We give notice in the terminal when it starts bundling and
    // set the time it started
    compiler.plugin('compile', function () {
        console.log('Bundling...');
        bundleStart = Date.now();
    });
    // We also give notice when it is done compiling, including the
    // time it took. Nice to have
    compiler.plugin('done', function () {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms. ' + new Date().toString());
    });
    new WebpackDevServer(compiler, {
        contentBase: dominSite_config_1.hotReloadServerUri || __dirname,
        // contentBase: "client",
        hot: true,
        noInfo: true,
        publicPath: '/static/',
        historyApiFallback: false,
        stats: { colors: true },
        proxy: {
            "*": dominSite_config_1.serverUri,
        },
    }).listen(dominSite_config_1.hotReloadServerPort, dominSite_config_1.hotReloadServerHost, function () {
        console.log('Bundling project, please wait...' + dominSite_config_1.hotReloadServerPort);
    });
};
