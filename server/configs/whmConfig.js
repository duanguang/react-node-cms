"use strict";
var webpack = require('webpack');
var config = require('../../webpack.config');
var compiler = webpack(config);
exports.whmConfig = function (app) {
    app.use(require('webpack-hot-middleware')(compiler));
};
