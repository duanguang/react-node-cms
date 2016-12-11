/**
 * Created by xiaoduan on 2016/12/8.
 */

import {JsonProperty, deserialize} from "json-typescript-mapper/index";

export class ContentTableEntity{
    public  rows:Array<ContentEntity>;

    public total: number;

    public pageIndex:number;

    public pageSize:number;

    public totalPage:number;

    public constructor(api?: any) {
        api = api || {};
        let result=api.result;
        this.rows = this.transformRows(result.Data);
        this.total = result.Total;
        this.pageIndex=result.PageIndex;
        this.pageSize=result.PageSize;
        this.totalPage=result.TotalPage;
    }

    private transformRows(rows: Array<any>): Array<ContentEntity> {
        return (rows || []).map((row: any)=> {
            return deserialize(ContentEntity, row);
        })
    }
}
 interface ICateInfo{
    _id:string;
    CateName:string;
}
class CateInfo{
    @JsonProperty('CateName')
    cateName:string;

    @JsonProperty('_id')
    _id:string;
    constructor() {
        this.cateName = void 0;
        this._id=void 0;
    }
}
export class ContentEntity{
    public cateId:string;

    public thumbUrl:string;

    @JsonProperty('CateId',{clazz: CateInfo})
    public cateInfo:CateInfo;

    @JsonProperty('Title')
    public title:string;

    @JsonProperty('Author')
    public author:string;

    @JsonProperty('Summary')
    public summary:string;

    @JsonProperty('SaveFolder')
    public saveFolder:string;

    @JsonProperty('ImageName')
    public imageName:string;

    @JsonProperty('Content')
    public content:string;

    @JsonProperty('UserId')
    public userId:string;

    @JsonProperty('UserName')
    public userName:string;

    @JsonProperty('ReadCount')
    public readCount:number;

    @JsonProperty('CreateDate')
    public createDate:string;

    @JsonProperty('UpdateDate')
    public updateDate:string;

    constructor(){
        this.title=void 0;
        this.cateId = void 0;
        this.author=void 0;
        this.title=void 0;
        this.summary=void 0;
        this.saveFolder=void 0;
        this.imageName=void 0;
        this.content = void 0;
        this.userName = void 0;
        this.readCount = void 0;
        this.createDate = void 0;
        this.updateDate = void 0;
        this.cateInfo=void 0;
    }
    public static transSource(basicDBKeyEntity: ContentEntity[]) {
       return basicDBKeyEntity.map((item)=>{
           let saveFolder=item.saveFolder.replace('server','');
           return {
               author: item.author,
               thumbUrl: `${saveFolder}${item.imageName}`,
               title: item.title,
               createDate: item.createDate,
               cateName:item.cateInfo.cateName
           }
       })
    }
}