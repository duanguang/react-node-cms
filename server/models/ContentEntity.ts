/**
 * Created by xiaoduan on 2016/12/6.
 */
export class ContentEntity{
    CateId:string;
    Title:string;
    Author:string;
    Summary:string;
    SaveFolder:string;
    ImageName:string;
    Content:string;
    UserId:string;
    UserName:string;
    ReadCount:number;
    CreateDate:string;
    UpdateDate:string;
   // CateIdClass:string;
}

export class ContentFiledEntity{
    public CateId:{isShow:boolean};
    public Title:{isShow:boolean};
    public Author:{isShow:boolean};
    public Summary:{isShow:boolean};
    public SaveFolder:{isShow:boolean};
    public ImageName:{isShow:boolean};
    public Content:{isShow:boolean};
    public UserId:{isShow:boolean};
    public UserName:{isShow:boolean};
    public ReadCount:{isShow:boolean};
    public CreateDate:{isShow:boolean};
    public UpdateDate:{isShow:boolean};
   // public CateIdClass:{isShow:boolean};
    constructor(){
        this.CateId={isShow:true};
        this.Title={isShow:true};
        this.Author={isShow:true};
        this.Summary={isShow:true};
        this.SaveFolder={isShow:true};
        this.ImageName={isShow:true};
        this.Content={isShow:true};
        this.UserId={isShow:true};
        this.UserName={isShow:true};
        this.ReadCount={isShow:true};
        this.CreateDate={isShow:true};
        this.UpdateDate={isShow:true};
        //this.CateIdClass={isShow:true};
    }
    public static getFileds(info:ContentFiledEntity){
        var target={};
        var newObject=null;
        Object.keys(info).forEach(key =>{
            var infoChildren=info[key];
            Object.keys(infoChildren).forEach(keyChildren=>{
                if(infoChildren[keyChildren]){
                    newObject={};
                    newObject[key]='';
                    target= Object.assign(target,newObject);
                }
            })
        });
        return target;
    }
}