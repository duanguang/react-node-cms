/**
 * Created by XD on 2016/7/24.
 */
export class UserInfo{
    public UserId:number;
    public UserName:String;
    public UserPassword:String;
    public TrueName:String;
    //性别
    public Sex:number;
    //电话
    public Tel:String;
    //手机号
    public Mobile:String;
    //邮箱
    public Email:String;

    public QQ:String;

    //头像
    public Photo:String;

    //权限
    public Power:String;

    //审核状态
    public ChkState:number;

    //是否删除
    public IsDelete:number;

    //使用状态(启用，冻结)
    public UseStata:number;

    //帐号类型
    public SuperAdminType:number;

    //最后一次登录
    public LastLoginDate:String;

    //创建时间
    public CreateDate:String;

    //最后一次更新时间
    public UpdateDate:String;

    constructor(){
       // this.UpdateDate=new Date().getTime().toString();
    }
}