"use strict";
/**
 * Created by XD on 2016/7/24.
 */
(function (DeleteEnum) {
    //未删除
    DeleteEnum[DeleteEnum["NotDel"] = 0] = "NotDel";
    //已删除
    DeleteEnum[DeleteEnum["IsDel"] = 1] = "IsDel";
})(exports.DeleteEnum || (exports.DeleteEnum = {}));
var DeleteEnum = exports.DeleteEnum;
(function (CheckEnum) {
    /// <summary>
    /// 未通过:2
    /// </summary>
    CheckEnum[CheckEnum["UnPass"] = 2] = "UnPass";
    /// 未审核:0
    CheckEnum[CheckEnum["Waiting"] = 0] = "Waiting";
    /// <summary>
    /// 已审核:1
    /// </summary>
    CheckEnum[CheckEnum["Pass"] = 1] = "Pass";
})(exports.CheckEnum || (exports.CheckEnum = {}));
var CheckEnum = exports.CheckEnum;
(function (UseStateEnum) {
    /// <summary>
    /// 启用1
    /// </summary>
    UseStateEnum[UseStateEnum["Enable"] = 1] = "Enable";
    /// <summary>
    /// 停用0
    /// </summary>
    UseStateEnum[UseStateEnum["Disable"] = 0] = "Disable";
})(exports.UseStateEnum || (exports.UseStateEnum = {}));
var UseStateEnum = exports.UseStateEnum;
(function (SexEnum) {
    /// <summary>
    /// 未知0
    /// </summary>
    SexEnum[SexEnum["Unknown"] = 0] = "Unknown";
    /// <summary>
    /// 男1
    // / </summary>
    SexEnum[SexEnum["Man"] = 1] = "Man";
    /// <summary>
    /// 女2
    /// </summary>
    SexEnum[SexEnum["Woman"] = 2] = "Woman";
})(exports.SexEnum || (exports.SexEnum = {}));
var SexEnum = exports.SexEnum;
(function (FormsRole) {
    /// <summary>
    /// 管理员
    /// </summary>
    FormsRole[FormsRole["Admin"] = 0] = "Admin";
    /// <summary>
    /// 网站用户
    /// </summary>
    FormsRole[FormsRole["Member"] = 1] = "Member";
})(exports.FormsRole || (exports.FormsRole = {}));
var FormsRole = exports.FormsRole;
(function (StringComparison) {
    //忽略大小写
    StringComparison[StringComparison["OrdinalIgnoreCase"] = 0] = "OrdinalIgnoreCase";
})(exports.StringComparison || (exports.StringComparison = {}));
var StringComparison = exports.StringComparison;
