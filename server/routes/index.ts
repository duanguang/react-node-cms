import express = require('express');
import * as path from 'path';
import {compilePath} from '../../dominSite.config';

const baseDir = path.resolve('.');

let router = express.Router();

router.get('*', (req:express.Request, res:express.Response)=> {
    res.sendFile(path.join(baseDir, compilePath + '.html'));
});

export = router;