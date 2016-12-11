/**
 * Created by DuanG on 2016/8/26.
 */
import * as express from 'express';

export let testRouter = express.Router();

testRouter.get('/test', (req: express.Request, res: express.Response)=> {
    res.json({test: "Test"});
});