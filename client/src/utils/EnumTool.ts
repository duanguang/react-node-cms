/**
 * Created by XD on 2016/7/24.
 */
export enum DeleteEnum{
    //未删除
    NotDel=0,
    //已删除
    IsDel=1
}

export function getDeleteEnumDisplayName(deleteEnum:DeleteEnum){
    return {
        [DeleteEnum.IsDel]:'已删',
        [DeleteEnum.NotDel]:'未删'
    }[deleteEnum]
}


export enum CheckEnum
{
    /// <summary>
    /// 未通过:2
    /// </summary>
    UnPass = 2,

    /// 未审核:0
    Waiting = 0,

    /// <summary>
    /// 已审核:1
    /// </summary>
    Pass = 1,
}
export enum UseStateEnum
{
    /// <summary>
    /// 启用1
    /// </summary>
    Enable = 1,
    /// <summary>
    /// 停用0
    /// </summary>
    Disable = 0
}

export enum SexEnum
{
    /// <summary>
    /// 未知0
    /// </summary>
    Unknown = 0,
    /// <summary>
    /// 男1
    // / </summary>
    Man = 1,
    /// <summary>
    /// 女2
    /// </summary>
    Woman = 2

}
export enum FormsRole
{
    /// <summary>
    /// 管理员
    /// </summary>
    Admin=0,

    /// <summary>
    /// 网站用户
    /// </summary>
    Member=1
}
