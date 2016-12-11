import * as express from 'express';
import * as path from 'path';
import {app} from '../routes/app';
const baseDir = path.resolve('.');
/* node路由，允许访问的路径*/
export const staticConfig = (app)=> {
    app.use("/common", express.static(baseDir + '/client/common/'));
    app.use("/client", express.static(baseDir + '/client'));
    app.use("/static", express.static(baseDir + '/static'));
    app.use("/favicon.ico", express.static(baseDir + '/favicon.ico'));
};
export  let staticResourceInit=()=>{
    app.use(express.static(path.join(__dirname, 'public')));//允许public文件资源被访问
    app.use("/common", express.static(baseDir + '/client/common/'));
    app.use("/upload", express.static(baseDir + '/server/upload/'));
    app.use("/static", express.static(baseDir + '/static'));
    app.use("/favicon.ico", express.static(baseDir + '/favicon.ico'));
    staticResourceInit = ()=> {
        throw new Error("static-resource.ts: Static resources have been initialized.");
    }
};