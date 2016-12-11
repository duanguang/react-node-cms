/**
 * Created by DuanG on 2016/8/26.
 */
import * as timeout from 'express-timeout-handler';
import {app} from '../routes/app';
import {IExpressTimeoutHandlerOption} from "express-timeout-handler";
const options:IExpressTimeoutHandlerOption={
    timeout:10000,
    onTimeout:function (req,res) {
        res.json({status:"timeout"});
    }
};
export let init=()=>{
    app.use(timeout.handler(options));
    init=()=>{
        throw new Error('timeout-parser.ts: Timeout parser has been initialized.');
    }
}