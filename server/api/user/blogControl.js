"use strict";
/**
 * Created by DuanG on 2016/11/23.
 */
var express = require('express');
var BlogCateEntity_1 = require("../../models/BlogCateEntity");
var uuid_1 = require("../../common/uuid");
var EnumTool_1 = require("../../common/EnumTool");
var ResponseTool_1 = require("../../common/ResponseTool");
var ContentEntity_1 = require("../../models/ContentEntity");
var Bearcat = require('bearcat');
var router = express.Router();
var fs = require('fs');
router.get('/blog/GetPageCateList', function (req, res) {
    var page = req.query['page'] || 1;
    var filedInfo = new BlogCateEntity_1.BlogCateFiledEntity();
    filedInfo.CateCode.isShow = false;
    filedInfo.UpdateDate.isShow = false;
    var fileds = BlogCateEntity_1.BlogCateFiledEntity.getFileds(filedInfo);
    var BlogCateService = Bearcat.getBean('BlogCateService');
    var pageSize = 4;
    BlogCateService.GetPageCateList(page, pageSize, fileds).then(function (result) {
        ResponseTool_1.response(res, result);
    });
});
router.get('/blog/GetContentPageList', function (req, res) {
    var page = req.query['page'] || 1;
    var filedInfo = new ContentEntity_1.ContentFiledEntity();
    filedInfo.Content.isShow = false;
    filedInfo.UpdateDate.isShow = false;
    filedInfo.Summary.isShow = false;
    // filedInfo.CateId.isShow=false;
    var fileds = ContentEntity_1.ContentFiledEntity.getFileds(filedInfo);
    var ContentService = Bearcat.getBean('ContentService');
    var pageSize = 4;
    ContentService.GetContentPageList(page, pageSize, fileds).then(function (result) {
        ResponseTool_1.response(res, result);
    });
});
router.get('/blog/deleteCate', function (req, res) {
    var id = req.query['id'] || '';
    var BlogCateService = Bearcat.getBean('BlogCateService');
    BlogCateService.DeleteBlogCate(id).then(function (result) {
        ResponseTool_1.response(res, result);
    });
});
router.post('/blog/addCate', function (req, res) {
    var blogInfo = new BlogCateEntity_1.BlogCateEntity();
    blogInfo.CateCode = uuid_1.generateUUID();
    blogInfo.CateName = req.body.CateName;
    blogInfo.CreateDate = new Date().toDateString();
    blogInfo.UpdateDate = new Date().toDateString();
    blogInfo.IsDelete = EnumTool_1.DeleteEnum.NotDel;
    var BlogCateService = Bearcat.getBean('BlogCateService');
    BlogCateService.InsertBlogCate(blogInfo).then(function (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        // res.end(JSON.stringify(result));
        //console.log(result)
        res.end(result);
        return;
    });
});
router.post('/blog/editCate', function (req, res) {
    var id = req.body.id;
    var cateName = req.body.cateName;
    var BlogCateService = Bearcat.getBean('BlogCateService');
    BlogCateService.UpdateBlogCate(cateName, id).then(function (result) {
        console.log(result);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        // res.end(JSON.stringify(result));
        //console.log(result)
        res.end(result);
        return;
    }, function (error) {
    });
});
router.post('/blog/addContent', function (req, res) {
    var Title = req.body.title;
    var CateId = req.body.cateId;
    var Author = req.body.author;
    var Summary = req.body.summary;
    var CreateDate = req.body.createDate;
    var ImageName = req.body.imageName;
    var Content = req.body.content;
    var SaveFolder = req.body.saveFolder;
    var base64Data = SaveFolder.replace(/^data:image\/png;base64,/, "").replace(/^data:image\/jpeg;base64,/, ""), binaryData = new Buffer(base64Data, 'base64').toString('binary');
    var path = 'server/upload/blog/' + ImageName;
    fs.writeFile(path, binaryData, "binary", function (err) {
        if (err == null) {
            var info = new ContentEntity_1.ContentEntity();
            info.Author = Author;
            info.CateId = CateId;
            info.Content = Content;
            info.CreateDate = CreateDate;
            info.SaveFolder = 'server/upload/blog/';
            info.ImageName = ImageName;
            info.Summary = Summary;
            info.Title = Title;
            info.UpdateDate = CreateDate;
            //info.CateIdClass=CateId;
            var ContentService = Bearcat.getBean('ContentService');
            ContentService.InsertContent(info).then(function (result) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(result);
            });
        }
        console.log(err); // writes out file without error, but it's not a valid image
    });
});
module.exports = router;
