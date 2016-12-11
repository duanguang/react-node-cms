"use strict";
/**
 * Created by DuanG on 2016/8/26.
 */
var timeout = require('express-timeout-handler');
var app_1 = require('../routes/app');
var options = {
    timeout: 10000,
    onTimeout: function (req, res) {
        res.json({ status: "timeout" });
    }
};
exports.init = function () {
    app_1.app.use(timeout.handler(options));
    exports.init = function () {
        throw new Error('timeout-parser.ts: Timeout parser has been initialized.');
    };
};
