var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { JsonProperty, deserialize } from "json-typescript-mapper/index";
/**
 * Created by DuanG on 2016/11/21.
 */
export class CateTableEntity {
    constructor(api) {
        api = api || {};
        let result = api.result;
        this.rows = this.transformRows(result.Data);
        this.total = result.Total;
        this.pageIndex = result.PageIndex;
        this.pageSize = result.PageSize;
        this.totalPage = result.TotalPage;
    }
    transformRows(rows) {
        return (rows || []).map((row) => {
            return deserialize(CateEntity, row);
        });
    }
}
export class CateEntity {
    constructor() {
        this.id = void 0;
        this.cateId = void 0;
        this.cateCode = void 0;
        this.isDelete = void 0;
        this.createTime = void 0;
        this.cateName = void 0;
    }
    static transform(basicDBKeyEntity) {
        return {
            CateId: basicDBKeyEntity.cateId,
            CateCode: basicDBKeyEntity.cateCode,
            IsDelete: basicDBKeyEntity.isDelete,
            CreateTime: basicDBKeyEntity.createTime,
            CateName: basicDBKeyEntity.cateName,
            Id: basicDBKeyEntity.id
        };
    }
}
__decorate([
    JsonProperty('_id'), 
    __metadata('design:type', String)
], CateEntity.prototype, "id", void 0);
__decorate([
    JsonProperty('CateId'), 
    __metadata('design:type', String)
], CateEntity.prototype, "cateId", void 0);
__decorate([
    JsonProperty('CateCode'), 
    __metadata('design:type', String)
], CateEntity.prototype, "cateCode", void 0);
__decorate([
    JsonProperty('IsDelete'), 
    __metadata('design:type', Number)
], CateEntity.prototype, "isDelete", void 0);
__decorate([
    JsonProperty('CreateDate'), 
    __metadata('design:type', String)
], CateEntity.prototype, "createTime", void 0);
__decorate([
    JsonProperty('CateName'), 
    __metadata('design:type', String)
], CateEntity.prototype, "cateName", void 0);
