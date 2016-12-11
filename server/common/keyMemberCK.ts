/**
 * Created by XD on 2016/9/16.
 */
var NodeRSA=require('node-rsa');
/*export var keyMemberCK=function () {
    console.log(keyMemberCK);
    if(!keyMemberCK){
        return new NodeRSA({b:512});
    }
    return keyMemberCK;
}*/
/*
export var keyMemberCK=new NodeRSA({b:512});*/
/*module.exports=keyMemberCK;*/
export var keyMemberCK=function () {
    var unique;
    function getInstance(){
        if(unique === undefined){
            unique=new  NodeRSA({b:512},'',{environment:'node',encryptionScheme:'pkcs1',signingScheme:'pss-sha1'});
        }
        return unique;
    }
    return getInstance;
}()
