"use strict";
/**
 * Created by xiaoduan on 2016/12/6.
 */
var ContentEntity = (function () {
    function ContentEntity() {
    }
    return ContentEntity;
}());
exports.ContentEntity = ContentEntity;
var ContentFiledEntity = (function () {
    // public CateIdClass:{isShow:boolean};
    function ContentFiledEntity() {
        this.CateId = { isShow: true };
        this.Title = { isShow: true };
        this.Author = { isShow: true };
        this.Summary = { isShow: true };
        this.SaveFolder = { isShow: true };
        this.ImageName = { isShow: true };
        this.Content = { isShow: true };
        this.UserId = { isShow: true };
        this.UserName = { isShow: true };
        this.ReadCount = { isShow: true };
        this.CreateDate = { isShow: true };
        this.UpdateDate = { isShow: true };
        //this.CateIdClass={isShow:true};
    }
    ContentFiledEntity.getFileds = function (info) {
        var target = {};
        var newObject = null;
        Object.keys(info).forEach(function (key) {
            var infoChildren = info[key];
            Object.keys(infoChildren).forEach(function (keyChildren) {
                if (infoChildren[keyChildren]) {
                    newObject = {};
                    newObject[key] = '';
                    target = Object.assign(target, newObject);
                }
            });
        });
        return target;
    };
    return ContentFiledEntity;
}());
exports.ContentFiledEntity = ContentFiledEntity;
