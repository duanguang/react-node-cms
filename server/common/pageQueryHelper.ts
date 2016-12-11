/**
 * Created by DuanG on 2016/11/24.
 */
var async = require('async');

/*
 page:页码
 pageSize:分页大小
 MongoModel:dataBase db connect
 fileds:过滤字段 {id:'',OrderIndex:''}
 queryParams:查询条件 for example {id:'xxxx'}
 sortParams:排序 for example {orderIndex:'desc'}
*/
export function pageQuery(page:number,pageSize:number,MongoModel:any,populate:any,fileds:{},queryParams:{},sortParams:{}):Promise<any>{
    var start=(page-1)*pageSize;
    var $page={
        pageNumber: page,
        pageCount:0,
        results:{},
        Total:0
    };
    return new Promise<any>((resolve)=>{
        async.parallel({
            count:function (done) {// 查询数量
                MongoModel.count(queryParams).exec(function (err,count) {
                    done(err,count);
                });
            },
            records:function (done) {
                MongoModel.find(queryParams,fileds).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function (err, doc) {
                    done(err, doc);
                });
            }
        },function (err, results) {
            var count = results.count;
            $page.pageCount = (count - 1) / pageSize + 1;
            $page.results = results.records;
            $page.Total=count;

            if(!err){
                resolve($page);
            }
            else {
                resolve(err);
            }
        })
    })
}
