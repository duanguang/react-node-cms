
/**
 * Created by xiaoduan on 2016/11/22.
 */
import {BlogCateEntity, BlogCateFiledEntity} from "../models/BlogCateEntity";
import {ResponseModel} from "../ResponseModel";
import Promise=require("bluebird");
import {pageQuery} from "../common/pageQueryHelper";
import {PageListEntity} from "../models/pageListEntity";
import {error} from "util";
var Bearcat = require('bearcat');


var BlogCateService=function () {
    let dataBaseConnect=Bearcat.getBean('dataBaseConnect');
    let db=dataBaseConnect.createConnection();
    let BlogCateSchema=Bearcat.getBean('BlogCateSchema');
    this.BlogCateMongo= BlogCateSchema.createConnection(db);
}
BlogCateService.prototype.InsertBlogCate=function (info:BlogCateEntity):Promise<ResponseModel>{
    var BlogCateMongo=this.BlogCateMongo;
    var count=0;
    return BlogCateMongo.count({}).then(function(result){
        count=result+1;
        info.CateId=count;
        info.OrderIndex=count;
        var infoMoel=new BlogCateMongo(info);
        var query=BlogCateMongo.findOne({"CateName":info.CateName});
        return query.exec()
            .then(function(result) {//useing bluebird,this is can response result
                    if(result!=null)
                    {
                        return Promise.resolve(JSON.stringify(ResponseModel.getErrorResponseModel('分类信息已存在')));
                    }
                    else {

                        return infoMoel.save().then(function (result,state,err) {
                            console.log('save status:',err!=undefined? 'failed' : 'success');//if the error is equal to undefined,then register successfully
                            return Promise.resolve(JSON.stringify(ResponseModel.getSuccessResponseModel('添加成功')));
                        })
                    }

                },
                function(err) {
                    return Promise.reject(JSON.stringify(ResponseModel.getErrorResponseModel('添加失败，请重新添加，如无法添加，请与我们工作人员联系')));
                    // on reject
                });
    },function (err) {
        return Promise.reject(JSON.stringify(ResponseModel.getErrorResponseModel('添加失败，请重新添加，如无法添加，请与我们工作人员联系')));
    })

};
BlogCateService.prototype.GetPageCateList=function (page:number,pageSize?:number,fileds?:{},queryParams?:{},sortParams?:{}) {
    var BlogCateMongo=this.BlogCateMongo;
    pageSize=pageSize?pageSize:10;
    if(!fileds){
        var filedInfo=new BlogCateFiledEntity();
        fileds=BlogCateFiledEntity.getFileds(filedInfo);
    }
    return pageQuery(page,pageSize,BlogCateMongo,'',fileds,queryParams?queryParams:{},sortParams?sortParams:{}).then((result)=>{
            let info=new PageListEntity();
            info.Data=result.results;
            info.PageIndex=parseInt(page.toString());
            info.PageSize=pageSize;
            info.TotalPage=result.pageCount;
            info.Total=result.Total;
            return Promise.resolve(JSON.stringify(ResponseModel.getSuccessResponseModel(info)));
    },function (err) {
        return Promise.reject(JSON.stringify(ResponseModel.getErrorResponseModel('查询信息失败，请重新查询，或请与我们工作人员联系')));
    })
};

BlogCateService.prototype.UpdateBlogCate=function (cateName:string,id:string):Promise<ResponseModel> {
    var BlogCateMongo=this.BlogCateMongo;
    var query=BlogCateMongo.findOne({'_id':id});
    return query.exec().then((result)=>{
          if(result!=null){
             return BlogCateMongo.findOne({'CateName':cateName}).then((result)=>{
                  if(result!=null){
                      return Promise.resolve(JSON.stringify(ResponseModel.getErrorResponseModel('分类信息已存在')));
                  }
                  else {
                     return BlogCateMongo.update({'_id':id},{CateName:cateName}).then((result)=>{
                          return Promise.resolve(JSON.stringify(ResponseModel.getSuccessResponseModel('修改成功')));
                      },(error)=>{
                          return Promise.reject(JSON.stringify(ResponseModel.getErrorResponseModel(`修改信息失败，请重新修改，或请与我们工作人员联系${error}`)));
                      })
                  }
              },(error)=>{
                  return Promise.reject(JSON.stringify(ResponseModel.getErrorResponseModel('修改信息失败，请重新修改，或请与我们工作人员联系')));
              })
          }
    },(error)=>{
        return Promise.reject(JSON.stringify(ResponseModel.getErrorResponseModel('修改信息失败，请重新修改，或请与我们工作人员联系')));
    })
}

BlogCateService.prototype.DeleteBlogCate=function (id:string):Promise<ResponseModel> {
    var BlogCateMongo=this.BlogCateMongo;
    return BlogCateMongo.remove({'_id':id}).then((result)=>{
        let resultOk=result.result;
        if(resultOk.ok==1&&resultOk.n===1){
            return Promise.resolve(JSON.stringify(ResponseModel.getSuccessResponseModel('删除成功')));
        }
        else {
            return Promise.resolve(JSON.stringify(ResponseModel.getErrorResponseModel('删除失败')));
        }
    })
}
module.exports=BlogCateService;