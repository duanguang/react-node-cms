"use strict";
/**
 * Created by DuanG on 2016/8/26.
 */
var express = require('express');
exports.testRouter = express.Router();
exports.testRouter.get('/test', function (req, res) {
    res.json({ test: "Test" });
});
