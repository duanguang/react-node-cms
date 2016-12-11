/**
 * Created by xiaoduan on 2016/12/6.
 */
var mongoose=require('mongoose');
var ContentSchema=function () {

};

ContentSchema.prototype.createConnection=function (db) {
    var info=new mongoose.Schema({
        Title:String,
        Author:String,
        Summary:String,
        SaveFolder:String,
        ImageName:String,
        Content:String,
        UserId:String,
        UserName:String,
        ReadCount:Number,
        CreateDate:String,
        UpdateDate:String,
        CateId:{type:mongoose.Schema.ObjectId,ref:'BlogCate'}
    });
    return db.model('Content',info);
}
module.exports= ContentSchema;