/**
 * Created by DuanG on 2016/8/26.
 */
import * as errorHandler from 'errorhandler';
import * as notifier from 'node-notifier';
import {app} from '../routes/app';

import {Response,Request} from 'express';
import {DEV,SERVER_CONFIG} from '../configs/server-config';
function errorNotification(err:Error,str:string,req:Request,res:Response){
    const title='Error in'+req.method+''+req.url;
    notifier.notify({
       title:title,
        message:str
    });
};
export let init=()=>{
   if(SERVER_CONFIG.env==DEV){
       app.use(errorHandler({log:errorNotification}));
   }
    init=()=>{
        throw  new Error('timeout-parser.ts: Timeout parser has been initialized.');
    }
};
