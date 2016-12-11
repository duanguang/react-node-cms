/**
 * Created by XD on 2016/7/24.
 */
var mongoose=require('mongoose');//
var UserSchema=function () {

};

UserSchema.prototype.connect=function () {
   // var ObjectId = mongoose.Schema.Types.ObjectId;
    var UserSchemas=new mongoose.Schema({
        UserId:Number,
        UserName:String,
        UserPassword:String,
        TrueName:String,
        Sex:Number,
        Tel:String,
        Mobile:String,
        Email:String,
        QQ:String,
        Photo:String,
        Power:String,
        ChkState:Number,
        IsDelete:Number,
        UseStata:Number,
        SuperAdminType:Number,
        LastLoginDate:String,
        CreateDate:String,
        UpdateDate:String
    });
    mongoose.model('User',UserSchemas);
};
UserSchema.prototype.createConnection=function (db) {
   // var ObjectId = mongoose.Schema.Types.ObjectId;
    var UserSchemas=new mongoose.Schema({
        UserId:Number,
        UserName:String,
        UserPassword:String,
        TrueName:String,
        Sex:Number,
        Tel:String,
        Mobile:String,
        Email:String,
        QQ:String,
        Photo:String,
        Power:String,
        ChkState:Number,
        IsDelete:Number,
        UseStata:Number,
        SuperAdminType:Number,
        LastLoginDate:String,
        CreateDate:String,
        UpdateDate:String
    });
    return db.model('User',UserSchemas);
};
module.exports=UserSchema;
