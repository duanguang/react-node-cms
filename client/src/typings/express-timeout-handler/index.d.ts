/**
 * Created by DuanG on 2016/8/26.
 */
/* github:https://github.com/debitoor/express-timeout-handler */
declare module 'express-timeout-handler'{
    import * as express from 'express';

    interface IExpressTimeoutHandlerOption{

        // Optional. This will be the default timeout for all endpoints.
        // If omitted there is no default timeout on endpoints
        timeout?:number;

        // Optional. This function will be called on a timeout and it MUST
        // terminate the request.
        // If omitted the module will end the request with a default 503 error.
        onTimeout?:(req:express.Request,res:express.Response)=>void;

        // Optional. Define a function to be called if an attempt to send a response
        // happens after the timeout where:
        // - method: is the method that was called on the response object
        // - args: are the arguments passed to the method
        // - requestTime: is the duration of the request
        // timeout happened
        onDelayedResponse?:(req:express.Request,method:string,args:IArguments,requestTime:number)=>void;

        // Optional. Provide a list of which methods should be disabled on the
        // response object when a timeout happens and an error has been sent. If
        // omitted, a default list of all methods that tries to send a response
        // will be disable on the response object
        // disable: ['write', 'setHeaders', 'send', 'json', 'end'];
        disable?: string[];
    }
    export function handler(option?:IExpressTimeoutHandlerOption);
}