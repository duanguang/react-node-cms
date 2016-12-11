/**
 * Created by DuanG on 2016/8/26.
 */
import * as express from 'express';
import {Request, Response} from 'express';

export let errRouter = express.Router();
errRouter.use((req: Request, res: Response, next: Function) => {
    var err: any = new Error('Not Found所有错误暂时指向404');
    err.status = 404;//所有错误暂时指向
    next(err);
});

errRouter.use((err: any, req: Request, res: Response)=> {
    //TODO: err type should not be any
    res.status(err.status || 500);
    res.render('error');
});
