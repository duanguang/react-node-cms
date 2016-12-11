/**
 * Created by xiaoduan on 2016/11/22.
 */
var mongoose=require('mongoose');
var BlogCateSchema=function () {

};
BlogCateSchema.prototype.createConnection=function (db) {
    var info=new mongoose.Schema({
        CateId:Number,
        CateCode:String,
        CateName:String,
        IsDelete:Number,
        CreateDate:String,
        UpdateDate:String,
        OrderIndex:Number
    });
    return db.model('BlogCate',info);
}
module.exports= BlogCateSchema;