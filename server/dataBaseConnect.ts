/**
 * Created by XD on 2016/7/25.
 */
var mongoose = require('mongoose')
    ,connectionString='mongodb://proBlog:15874728903@61.142.254.42:27017/proBlog'
    ,options={server: {
    auto_reconnect: true,
    poolSize: 10,
    promiseLibrary:require('bluebird'),
}};
var dataBaseConnect=function () {

}
dataBaseConnect.prototype.connect=function () {
    mongoose.connect(connectionString, options, function(err, res) {
        if(err) {
            console.log('[mongoose log] Error connecting to: ' + connectionString + '. ' + err);
        } else {
            console.log('[mongoose connect log] Successfully connected to: ' + connectionString);
        }
    });
};
dataBaseConnect.prototype.createConnection=function () {
   var db= mongoose.createConnection(connectionString,options,function (err) {
       if(err) {
           console.log('[mongoose log] Error connecting to: ' + connectionString + '. ' + err);
       } else {
           console.log('[mongoose createConnection log] Successfully connected to: ' + connectionString);
       }
   });
    db.on('error',console.error.bind(console,'连接错误:'));
    db.once('open',function(){
        //一次打开记录
        console.log("一次打开记录");
    });
    return db;
};
module.exports=dataBaseConnect;
