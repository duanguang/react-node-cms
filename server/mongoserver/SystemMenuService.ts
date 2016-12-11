/**
 * Created by xiaoduan on 2016/10/16.
 */
import {ResponseModel} from '../ResponseModel';
import Promise=require('bluebird');
import {SysMenu} from '../models/SysMenu';
var Bearcat=require('bearcat');
var SystemMenuService=function () {
    let dateBaseConnect=Bearcat.getBean('dataBaseConnect');
    let db=dateBaseConnect.createConnection();
    let SystemMenuSchema=Bearcat.getBean('SystemMenuSchema');
    this.SystemMenuMongo=SystemMenuSchema.createConnection(db);
};

SystemMenuService.prototype.InsertSysMenu=function (info:SysMenu):Promise<ResponseModel> {
    var infoModel=new this.SystemMenuMongo(info);
    var query=this.SystemMenuMongo.findOne({'Title':info.Title});
    return query.exec().then(function (result) {
       if(result){
           return Promise.resolve(JSON.stringify(ResponseModel.getErrorResponseModel('菜单已经存在,请重新添加')));
       }
        else {
           return infoModel.save().then(function (result,state,err) {
               return Promise.resolve(JSON.stringify(ResponseModel.getErrorResponseModel('添加成功')))
           })
       }
    },function (err) {
       return Promise.reject(JSON.stringify(ResponseModel.getErrorResponseModel('添加系统菜单失败，请重试')))
  });
}