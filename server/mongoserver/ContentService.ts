/**
 * Created by xiaoduan on 2016/12/7.
 */
import {ResponseModel} from "../ResponseModel";
import Promise=require("bluebird");
import {ContentEntity, ContentFiledEntity} from "../models/ContentEntity";
import {pageQuery} from "../common/pageQueryHelper";
import {PageListEntity} from "../models/pageListEntity";
var Bearcat = require('bearcat');

var ContentService=function () {
    let dataBaseConnect=Bearcat.getBean('dataBaseConnect');
    let db=dataBaseConnect.createConnection();
    let ContentSchema=Bearcat.getBean('ContentSchema');
    let BlogCateSchema=Bearcat.getBean('BlogCateSchema');
    this.ContentMongo= ContentSchema.createConnection(db);
    this.BlogCateMongo= BlogCateSchema.createConnection(db);
}
ContentService.prototype.InsertContent=function (info:ContentEntity):Promise<ResponseModel> {
    var ContentMongo=this.ContentMongo;
    var infoMoel=new ContentMongo(info);
    return infoMoel.save().then(function (result,state,err) {
        console.log('save status:',err!=undefined? 'failed' : 'success');//if the error is equal to undefined,then register successfully
        return Promise.resolve(JSON.stringify(ResponseModel.getSuccessResponseModel('添加成功')));
    })
};

ContentService.prototype.GetContentPageList=function (page:number,pageSize?:number,fileds?:{},queryParams?:{},sortParams?:{}) {
    var ContentMongo=this.ContentMongo;
    pageSize=pageSize?pageSize:10;
    if(!fileds){
        var filedInfo=new ContentFiledEntity();
        fileds=ContentFiledEntity.getFileds(filedInfo);
    }
    let populate={path:'CateId',select:'CateName'};
    return pageQuery(page,pageSize,ContentMongo,populate,fileds,queryParams?queryParams:{},sortParams?sortParams:{}).then((result)=>{
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
module.exports=ContentService;