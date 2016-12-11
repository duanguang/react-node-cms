/**
 * Created by XD on 2016/7/24.
 */
export var DeleteEnum;
(function (DeleteEnum) {
    //未删除
    DeleteEnum[DeleteEnum["NotDel"] = 0] = "NotDel";
    //已删除
    DeleteEnum[DeleteEnum["IsDel"] = 1] = "IsDel";
})(DeleteEnum || (DeleteEnum = {}));
export function getDeleteEnumDisplayName(deleteEnum) {
    return {
        [DeleteEnum.IsDel]: '已删',
        [DeleteEnum.NotDel]: '未删'
    }[deleteEnum];
}
export var CheckEnum;
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
})(CheckEnum || (CheckEnum = {}));
export var UseStateEnum;
(function (UseStateEnum) {
    /// <summary>
    /// 启用1
    /// </summary>
    UseStateEnum[UseStateEnum["Enable"] = 1] = "Enable";
    /// <summary>
    /// 停用0
    /// </summary>
    UseStateEnum[UseStateEnum["Disable"] = 0] = "Disable";
})(UseStateEnum || (UseStateEnum = {}));
export var SexEnum;
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
})(SexEnum || (SexEnum = {}));
export var FormsRole;
(function (FormsRole) {
    /// <summary>
    /// 管理员
    /// </summary>
    FormsRole[FormsRole["Admin"] = 0] = "Admin";
    /// <summary>
    /// 网站用户
    /// </summary>
    FormsRole[FormsRole["Member"] = 1] = "Member";
})(FormsRole || (FormsRole = {}));
