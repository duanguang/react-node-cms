"use strict";
/**
 * Created by DuanG on 2016/8/26.
 */
var express = require('express');
exports.errRouter = express.Router();
exports.errRouter.use(function (req, res, next) {
    var err = new Error('Not Found所有错误暂时指向404');
    err.status = 404; //所有错误暂时指向
    next(err);
});
exports.errRouter.use(function (err, req, res) {
    //TODO: err type should not be any
    res.status(err.status || 500);
    res.render('error');
});
