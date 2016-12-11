"use strict";
/**
 * Created by DuanG on 2016/11/23.
 */
var app_1 = require('./app');
exports.blogRouteInit = function () {
    app_1.app.get('/blog/GetPageCateList', require('../api/user/blogControl'));
    app_1.app.get('/blog/GetContentPageList', require('../api/user/blogControl'));
    app_1.app.get('/blog/deleteCate', require('../api/user/blogControl'));
    app_1.app.post('/blog/addCate', require('../api/user/blogControl'));
    app_1.app.post('/blog/editCate', require('../api/user/blogControl'));
    app_1.app.post('/blog/addContent', require('../api/user/blogControl'));
};
