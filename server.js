"use strict";
var dominSite_config_1 = require('./dominSite.config');
var app_1 = require('./server/routes/app');
var serverConfigInit_1 = require('./server/serverConfigInit');
var webpackInit_1 = require('./server/configs/webpackInit');
//let app = express();
var isDev = process.env.NODE_ENV !== 'dev'; //如果等于dev启动client热更新
if (isDev) {
    serverConfigInit_1.serverInit();
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
    var server = http.createServer(app_1.app);
    reload(server, app_1.app);
    app_1.app.listen(dominSite_config_1.serverPort, dominSite_config_1.serverHost, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Listening at ' + dominSite_config_1.serverUri);
    });
}
else {
    webpackInit_1.webpackInit();
    app_1.app.listen(dominSite_config_1.serverPortClient, dominSite_config_1.serverHostClient, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Listening at ' + dominSite_config_1.serverUriClient);
    });
}
