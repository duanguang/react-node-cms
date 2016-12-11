/**
 * Created by xiaoduan on 2016/11/22.
 */
"use strict";
var BlogCateEntity = (function () {
    function BlogCateEntity() {
    }
    return BlogCateEntity;
}());
exports.BlogCateEntity = BlogCateEntity;
var BlogCateFiledEntity = (function () {
    function BlogCateFiledEntity() {
        this.CateId = { isShow: true };
        this.CateCode = { isShow: true };
        this.CateName = { isShow: true };
        this.IsDelete = { isShow: true };
        this.CreateDate = { isShow: true };
        this.UpdateDate = { isShow: true };
        this.OrderIndex = { isShow: true };
    }
    BlogCateFiledEntity.getFileds = function (info) {
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
    return BlogCateFiledEntity;
}());
exports.BlogCateFiledEntity = BlogCateFiledEntity;
