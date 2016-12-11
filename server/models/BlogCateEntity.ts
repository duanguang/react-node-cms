/**
 * Created by xiaoduan on 2016/11/22.
 */

export class BlogCateEntity{
    public CateId:number;
    public CateCode:string;
    public CateName:string;
    public IsDelete:number;
    public CreateDate:string;
    public UpdateDate:string;
    public OrderIndex:number;
}

export class BlogCateFiledEntity{
    public CateId:{isShow:boolean};
    public CateCode:{isShow:boolean};
    public CateName:{isShow:boolean};
    public IsDelete:{isShow:boolean};
    public CreateDate:{isShow:boolean};
    public UpdateDate:{isShow:boolean};
    public OrderIndex:{isShow:boolean};
    constructor(){
        this.CateId={isShow:true};
        this.CateCode={isShow:true};
        this.CateName={isShow:true};
        this.IsDelete={isShow:true};
        this.CreateDate={isShow:true};
        this.UpdateDate={isShow:true};
        this.OrderIndex={isShow:true};
    }
    public static getFileds(info:BlogCateFiledEntity){
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