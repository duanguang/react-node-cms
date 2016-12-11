import * as express from 'express';
import {Request, Response} from 'express';
import * as request from 'request';

let router = express.Router();

router.get('/image-proxy', (req:Request, res:Response)=> {
    var path = decodeURIComponent(req.query.path);
    path ? request(path).pipe(res) : res.end();
});

export = router;
