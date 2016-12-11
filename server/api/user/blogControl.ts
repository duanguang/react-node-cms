/**
 * Created by DuanG on 2016/11/23.
 */
import express = require('express');
import {BlogCateEntity, BlogCateFiledEntity} from "../../models/BlogCateEntity";
import {generateUUID} from "../../common/uuid";
import {DeleteEnum} from "../../common/EnumTool";
import {response} from "../../common/ResponseTool";
import {error} from "util";
import {ContentEntity, ContentFiledEntity} from "../../models/ContentEntity";
var Bearcat = require('bearcat');
let router = express.Router();
var fs=require('fs');

router.get('/blog/GetPageCateList',(req:express.Request,res:express.Response)=>{
    let page=req.query['page']||1;
    var filedInfo=new BlogCateFiledEntity();
    filedInfo.CateCode.isShow=false;
    filedInfo.UpdateDate.isShow=false;
    let fileds=BlogCateFiledEntity.getFileds(filedInfo);
    var BlogCateService=Bearcat.getBean('BlogCateService');
    let pageSize=4;
    BlogCateService.GetPageCateList(page,pageSize,fileds).then((result)=>{
        response(res,result);
    })


});

router.get('/blog/GetContentPageList',(req:express.Request,res:express.Response)=>{
    let page=req.query['page']||1;
    var filedInfo=new ContentFiledEntity();
    filedInfo.Content.isShow=false;
    filedInfo.UpdateDate.isShow=false;
    filedInfo.Summary.isShow=false;
   // filedInfo.CateId.isShow=false;
    let fileds=ContentFiledEntity.getFileds(filedInfo);
    var ContentService=Bearcat.getBean('ContentService');
    let pageSize=4;
    ContentService.GetContentPageList(page,pageSize,fileds).then((result)=>{
        response(res,result);
    })
    
});

router.get('/blog/deleteCate',(req:express.Request,res:express.Response)=>{
    let id=req.query['id']||'';
    var BlogCateService=Bearcat.getBean('BlogCateService');
    BlogCateService.DeleteBlogCate(id).then((result)=>{
        response(res,result);
    })
})

router.post('/blog/addCate', (req:express.Request, res:express.Response)=> {
    let blogInfo=new BlogCateEntity();
    blogInfo.CateCode=generateUUID();
    blogInfo.CateName=req.body.CateName;
    blogInfo.CreateDate=new Date().toDateString();
    blogInfo.UpdateDate=new Date().toDateString();
    blogInfo.IsDelete=DeleteEnum.NotDel;
    var BlogCateService=Bearcat.getBean('BlogCateService');
    BlogCateService.InsertBlogCate(blogInfo).then((result)=>{
        res.writeHead(200, {'Content-Type': 'application/json'});
        // res.end(JSON.stringify(result));
        //console.log(result)
        res.end(result);
        return;
    });
});

router.post('/blog/editCate',(req:express.Request,res:express.Response)=>{
    let id=req.body.id;
    let cateName=req.body.cateName;
    var BlogCateService=Bearcat.getBean('BlogCateService');
    BlogCateService.UpdateBlogCate(cateName,id).then((result)=>{
        console.log(result)
        res.writeHead(200, {'Content-Type': 'application/json'});
        // res.end(JSON.stringify(result));
        //console.log(result)
        res.end(result);
        return;
    },(error)=>{
    })
});


router.post('/blog/addContent',(req:express.Request,res:express.Response)=>{
    let Title=req.body.title;
    let CateId=req.body.cateId;
    let Author=req.body.author;
    let Summary=req.body.summary;
    let CreateDate=req.body.createDate
    let ImageName=req.body.imageName;
    let Content=req.body.content;
    let SaveFolder=req.body.saveFolder;
    var base64Data = SaveFolder.replace(/^data:image\/png;base64,/,"").replace(/^data:image\/jpeg;base64,/,""),
        binaryData = new Buffer(base64Data, 'base64').toString('binary');
    let path='server/upload/blog/'+ImageName;
    fs.writeFile(path, binaryData, "binary", function(err) {
        if(err==null){
            var info=new ContentEntity();
            info.Author=Author;
            info.CateId=CateId;
            info.Content=Content;
            info.CreateDate=CreateDate;
            info.SaveFolder='server/upload/blog/';
            info.ImageName=ImageName;
            info.Summary=Summary;
            info.Title=Title;
            info.UpdateDate=CreateDate;
            //info.CateIdClass=CateId;
            var ContentService=Bearcat.getBean('ContentService');
            ContentService.InsertContent(info).then((result)=>{
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(result);
            })
        }

        console.log(err); // writes out file without error, but it's not a valid image
    });

})
export = router;
