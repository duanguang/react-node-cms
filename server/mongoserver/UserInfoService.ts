/**
 * Created by XD on 2016/7/29.
 */
import {UserInfo} from '../models/UserInfo';
import {ResponseModel} from '../ResponseModel';
import Promise=require("bluebird");
import {ResponseErrorModel} from "../models/commonResult";
var Bearcat = require('bearcat');
import {equal} from "../common/stringTool";
var UserInfoService=function () {
    let dataBaseConnect=Bearcat.getBean('dataBaseConnect');
    let db=dataBaseConnect.createConnection();
    let UserSchema=Bearcat.getBean('UserSchema');
    this.UserInfoMongo= UserSchema.createConnection(db);
}
UserInfoService.prototype.InsertUser=function (info:UserInfo):Promise<ResponseModel>{
    var UserInfoMongo=this.UserInfoMongo;
    var infoMoel=new UserInfoMongo(info);
    var query=this.UserInfoMongo.findOne({"UserName":info.UserName});

    /*infoMoel.find({"UserName":info.UserName},function (err) {
        console.log('find status:',err ? 'failed' : '已存在');
    });*/
    /*query.exec(function (err,info) { //this is cannot response result
        //console.log('find status:',err ? 'failed' : info);
        if(info!=null)
        {
             console.log(ResponseModel.getErrorResponseModel('帐号已被注册'))
            let result=ResponseModel.getErrorResponseModel('帐号已被注册');
        }
        else {
            infoMoel.save(function (err) {
               console.log('save status:',err ? 'failed' : 'success');
                return  ResponseModel.getSuccessResponseModel('注册成功');
            });
        }
    });*/
    /*return new Promise(function (resolve, reject) { //useing es6 promise, this is can response result
     query.exec(function (err,info) {
     //console.log('find status:',err ? 'failed' : info);
     if(info!=null)
     {
     // console.log(ResponseModel.getErrorResponseModel('帐号已被注册'))
     let result=ResponseModel.getErrorResponseModel('帐号已被注册');
     return resolve(JSON.stringify(result));
     }
     else {
     infoMoel.save(function (err) {
     console.log('save status:',err ? 'failed' : 'success');
     return  ResponseModel.getSuccessResponseModel('注册成功');
     });
     }
     });
     });*/
    return query.exec()
        .then(function(result) {//useing bluebird,this is can response result
            if(result!=null)
            {
                return Promise.resolve(JSON.stringify(ResponseModel.getErrorResponseModel('帐号已被注册')));
            }
            else {

               return infoMoel.save().then(function (result,state,err) {
                   /*console.log(err+"error")//if the error is equal to undefined,then register successfully null
                   console.log(result+"result")//insert info
                   console.log(state+"state")
                   console.log('save status:',err ? 'failed' : 'success'); */
                   console.log('save status:',err!=undefined? 'failed' : 'success');//if the error is equal to undefined,then register successfully
                    return Promise.resolve(JSON.stringify(ResponseModel.getSuccessResponseModel('注册成功')));
                })
            }

        },
        function(err) {
            return Promise.reject(JSON.stringify(ResponseModel.getErrorResponseModel('注册失败，请重新注册，如无法注册，请与我们工作人员联系')));
            // on reject
        });
};
UserInfoService.prototype.userLogin=function (userName:string,passWord:string,code:string,cookieCode:string): Promise<string>{
    var query=this.UserInfoMongo.findOne({"UserName":userName,"UserPassword":passWord});
    return new Promise<string>((resolve)=>{
         if(equal(code,cookieCode)){
             resolve(
                query.exec().then(function (result) {
                 if(result==null){
                     return Promise.resolve(JSON.stringify(ResponseModel.getErrorResponseModel('帐号或密码错误')));
                 }
                 return Promise.resolve(JSON.stringify(ResponseModel.getSuccessResponseModel('登录成功')));
                },function (err) {
                 return Promise.resolve(JSON.stringify(ResponseModel.getErrorResponseModel('用户登录失败，请重新登录，如碰到任何问题，请与我们工作人员联系'+err)));
               })
             )

         }
        else {
             resolve(JSON.stringify(ResponseModel.getErrorResponseModel('验证码错误')));
         }
    })

}
module.exports=UserInfoService;