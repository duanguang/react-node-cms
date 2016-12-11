/**
 * Created by DuanG on 2016/8/26.
 */
import {app} from '../routes/app';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import * as timeoutParser from './timeout-parser';
import * as errParser from './error-parser';

import * as cors from 'cors';
import {SERVER_CONFIG, DEV, PROD} from '../configs/server-config';
import * as cookieParser from 'cookie-parser';
export let parserInit = ()=> {
    app.use(favicon(path.resolve('favicon.ico')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    if (SERVER_CONFIG.env === DEV) {
        app.use(logger(DEV));
        var whitelist = ['http://127.0.0.1:3008','http://127.0.0.1:3006'];
        var corsOptionsDelegate = function(req, callback){
            var corsOptions;
            if(whitelist.indexOf(req.header('Origin')) !== -1){
                corsOptions = { origin: true ,credentials:true}; // reflect (enable) the requested origin in the CORS response
            }else{
                corsOptions = { origin: false }; // disable CORS for this request
            }
            callback(null, corsOptions); // callback expects two parameters: error and options
        };
        /*var corsOptions = {
            origin: 'http://127.0.0.1:3008',
            optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
        };*/
        app.use(cors(corsOptionsDelegate));//white List
        //app.options('http://127.0.0.1:3008', cors());//If allowed Access-Control-Allow-Origin：* Be sure to write
    }
    else if (SERVER_CONFIG.env === PROD) {
        app.use(logger('prod'));
    }
    timeoutParser.init();
    errParser.init();
    parserInit = ()=> {
        throw new Error("parsers/index.ts: parsers have been initialized.");
    }
}