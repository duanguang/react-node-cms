/**
 * Created by XD on 2016/7/24.
 */
var mongoose=require('mongoose');//
//import {UserSchema} from './UserSchema';
import {UserInfo} from '../models/UserInfo';
var UserInfoServer=function () {
}
UserInfoServer.prototype.InsertUser=function (info:UserInfo) {
    //var ObjectId = mongoose.Schema.Types.ObjectId;
    /*var UserSchema=new mongoose.Schema({
     UserId:Numb,
     QQ:String
     });
    var UserInfoMongo= mongoose.model('User',UserSchema);*/
    var UserInfoMongo=mongoose.model('User');
    var infoMoel=new UserInfoMongo(info);
    infoMoel.find({"UserName":info.UserName},function (err) {
        console.log('find status:',err ? 'failed' : '已存在');
    });
    infoMoel.save(function (err) {
        console.log('save status:',err ? 'failed' : 'success1');
    });

};
module.exports=UserInfoServer;
