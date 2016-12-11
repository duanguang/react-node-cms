/**
 * Created by DuanG on 2016/7/15.
 */
import * as express from 'express';
import {serverHost, serverPort,serverPortClient,serverHostClient, serverUri,serverUriClient} from './dominSite.config';

import {app} from './server/routes/app';
import {serverInit} from './server/serverConfigInit';
import {webpackInit} from './server/configs/webpackInit'
//let app = express();
var isDev = process.env.NODE_ENV !== 'dev';//如果等于dev启动client热更新

if (isDev) {
    serverInit();
    /*var Bearcat = require('bearcat');
     var contextPath = require.resolve('./context.json');

     var bearcat = Bearcat.createApp([contextPath]);
     bearcat.start(function(){
     var car = bearcat.getBean('car'); // get bean
     console.log(bearcat.getModel('car'));
     car.run(); // call the method
     });*/
    var reload = require('reload');
    var http = require('http');

    var server = http.createServer(app);
    reload(server, app);
    
    app.listen(serverPort, serverHost, function (err:string):void {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Listening at ' + serverUri);
    });
}
else {
    webpackInit();
    app.listen(serverPortClient, serverHostClient, function (err:string):void {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Listening at ' + serverUriClient);
    });
}