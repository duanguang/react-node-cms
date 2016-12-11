/**
 * Created by DuanG on 2016/11/16.
 */
import express=require('express');

export function response(res:express.Response,result:string,statusCode?:number,headers?: any){
      let defaultHeaders={
            'Content-Type': 'application/json'
      };
      let defaultStatusCode=200;
      res.writeHead(statusCode?statusCode:defaultStatusCode,headers?headers:defaultHeaders);
      res.end(result);
}