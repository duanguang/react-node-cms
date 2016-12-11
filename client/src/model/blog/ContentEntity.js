/**
 * Created by xiaoduan on 2016/12/8.
 */
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
export class ContentTableEntity {
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
            return deserialize(ContentEntity, row);
        });
    }
}
class CateInfo {
    constructor() {
        this.cateName = void 0;
        this._id = void 0;
    }
}
__decorate([
    JsonProperty('CateName'), 
    __metadata('design:type', String)
], CateInfo.prototype, "cateName", void 0);
__decorate([
    JsonProperty('_id'), 
    __metadata('design:type', String)
], CateInfo.prototype, "_id", void 0);
export class ContentEntity {
    constructor() {
        this.title = void 0;
        this.cateId = void 0;
        this.author = void 0;
        this.title = void 0;
        this.summary = void 0;
        this.saveFolder = void 0;
        this.imageName = void 0;
        this.content = void 0;
        this.userName = void 0;
        this.readCount = void 0;
        this.createDate = void 0;
        this.updateDate = void 0;
        this.cateInfo = void 0;
    }
    static transSource(basicDBKeyEntity) {
        return basicDBKeyEntity.map((item) => {
            let saveFolder = item.saveFolder.replace('server', '');
            return {
                author: item.author,
                thumbUrl: `${saveFolder}${item.imageName}`,
                title: item.title,
                createDate: item.createDate,
                cateName: item.cateInfo.cateName
            };
        });
    }
}
__decorate([
    JsonProperty('CateId', { clazz: CateInfo }), 
    __metadata('design:type', CateInfo)
], ContentEntity.prototype, "cateInfo", void 0);
__decorate([
    JsonProperty('Title'), 
    __metadata('design:type', String)
], ContentEntity.prototype, "title", void 0);
__decorate([
    JsonProperty('Author'), 
    __metadata('design:type', String)
], ContentEntity.prototype, "author", void 0);
__decorate([
    JsonProperty('Summary'), 
    __metadata('design:type', String)
], ContentEntity.prototype, "summary", void 0);
__decorate([
    JsonProperty('SaveFolder'), 
    __metadata('design:type', String)
], ContentEntity.prototype, "saveFolder", void 0);
__decorate([
    JsonProperty('ImageName'), 
    __metadata('design:type', String)
], ContentEntity.prototype, "imageName", void 0);
__decorate([
    JsonProperty('Content'), 
    __metadata('design:type', String)
], ContentEntity.prototype, "content", void 0);
__decorate([
    JsonProperty('UserId'), 
    __metadata('design:type', String)
], ContentEntity.prototype, "userId", void 0);
__decorate([
    JsonProperty('UserName'), 
    __metadata('design:type', String)
], ContentEntity.prototype, "userName", void 0);
__decorate([
    JsonProperty('ReadCount'), 
    __metadata('design:type', Number)
], ContentEntity.prototype, "readCount", void 0);
__decorate([
    JsonProperty('CreateDate'), 
    __metadata('design:type', String)
], ContentEntity.prototype, "createDate", void 0);
__decorate([
    JsonProperty('UpdateDate'), 
    __metadata('design:type', String)
], ContentEntity.prototype, "updateDate", void 0);
