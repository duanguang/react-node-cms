import {JsonProperty, deserialize} from "json-typescript-mapper/index";
/**
 * Created by DuanG on 2016/11/21.
 */

export class CateTableEntity{
    public  rows:Array<CateEntity>;

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

    private transformRows(rows: Array<any>): Array<CateEntity> {
        return (rows || []).map((row: any)=> {
            return deserialize(CateEntity, row);
        })
    }
}

export class CateEntity{

    @JsonProperty('_id')
    public id:string;

    @JsonProperty('CateId')
    public cateId: string;

    @JsonProperty('CateCode')
    public cateCode: string;

    @JsonProperty('IsDelete')
    public isDelete: number;

    @JsonProperty('CreateDate')
    public createTime: string;

    @JsonProperty('CateName')
    public cateName: string;
    public constructor() {
        this.id=void 0;
        this.cateId = void 0;
        this.cateCode = void 0;
        this.isDelete = void 0;
        this.createTime = void 0;
        this.cateName = void 0;
    }

    public static transform(basicDBKeyEntity: CateEntity) {
        return {
            CateId: basicDBKeyEntity.cateId,
            CateCode: basicDBKeyEntity.cateCode,
            IsDelete: basicDBKeyEntity.isDelete,
            CreateTime: basicDBKeyEntity.createTime,
            CateName: basicDBKeyEntity.cateName,
            Id:basicDBKeyEntity.id
        }
    }
}