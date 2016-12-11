"use strict";
/**
 * Created by DuanG on 2016/8/26.
 */
var app_1 = require('../routes/app');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var timeoutParser = require('./timeout-parser');
var errParser = require('./error-parser');
var cors = require('cors');
var server_config_1 = require('../configs/server-config');
var cookieParser = require('cookie-parser');
exports.parserInit = function () {
    app_1.app.use(favicon(path.resolve('favicon.ico')));
    app_1.app.use(bodyParser.json());
    app_1.app.use(bodyParser.urlencoded({ extended: false }));
    app_1.app.use(cookieParser());
    if (server_config_1.SERVER_CONFIG.env === server_config_1.DEV) {
        app_1.app.use(logger(server_config_1.DEV));
        var whitelist = ['http://127.0.0.1:3008', 'http://127.0.0.1:3006'];
        var corsOptionsDelegate = function (req, callback) {
            var corsOptions;
            if (whitelist.indexOf(req.header('Origin')) !== -1) {
                corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
            }
            else {
                corsOptions = { origin: false }; // disable CORS for this request
            }
            callback(null, corsOptions); // callback expects two parameters: error and options
        };
        /*var corsOptions = {
            origin: 'http://127.0.0.1:3008',
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        };*/
        app_1.app.use(cors(corsOptionsDelegate)); //white List
    }
    else if (server_config_1.SERVER_CONFIG.env === server_config_1.PROD) {
        app_1.app.use(logger('prod'));
    }
    timeoutParser.init();
    errParser.init();
    exports.parserInit = function () {
        throw new Error("parsers/index.ts: parsers have been initialized.");
    };
};
