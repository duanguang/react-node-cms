/**
 * Created by xiaoduan on 2016/10/16.
 */
var mongoose=require('mongoose');
var SystemMenuSchema=function () {

};

SystemMenuSchema.prototype.createConnection=function (db) {
    var info=new mongoose.Schema({
        MenuId:Number,
        UpperId:Number,
        DeepIndex:Number,
        MenuPath:String,
        ClassName:String,
        Title:String,
        LinkUrl:String,
        Status:Number,
        CreateDate:String,
        UpdateDate:String,
        OrderIndex:Number
    });
    return db.model('SystemMenu',info);
};
module.exports= SystemMenuSchema;
