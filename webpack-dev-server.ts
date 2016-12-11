/**
 * Created by XD on 2016/7/13.
 */
import webpack=require('webpack');
import config=require('./webpack.config');
import {serverUri,hotReloadServerUri,hotReloadServerPort, hotReloadServerHost} from './dominSite.config';
import url=require('url');
var WebpackDevServer=require('webpack-dev-server');
var proxy=require('proxy-middleware');
module.exports=(app)=>{
    app.use("/static",proxy(url.parse(hotReloadServerUri + '/static')));
    var bundleStart = null;
    var compiler = webpack(config);

    // We give notice in the terminal when it starts bundling and
    // set the time it started
    compiler.plugin('compile', ():void=> {
        console.log('Bundling...');
        bundleStart = Date.now();
    });

    // We also give notice when it is done compiling, including the
    // time it took. Nice to have
    compiler.plugin('done', ():void=> {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms. ' + new Date().toString());
    });

    new WebpackDevServer(compiler, {
        contentBase: hotReloadServerUri || __dirname,
       // contentBase: "client",
        hot: true,
        noInfo: true,
        publicPath: '/static/',
        historyApiFallback: false,
        stats: {colors: true},
        proxy: {
            "*": serverUri,
        },
    }).listen(hotReloadServerPort, hotReloadServerHost, ()=> {
        console.log('Bundling project, please wait...'+hotReloadServerPort);
    });
};

