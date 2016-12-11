var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { JsonProperty, deserialize } from 'json-typescript-mapper';
export class ErrorEntity {
    constructor() {
        this.code = void 0;
        this.message = void 0;
    }
}
__decorate([
    JsonProperty('Code'), 
    __metadata('design:type', String)
], ErrorEntity.prototype, "code", void 0);
__decorate([
    JsonProperty('Message'), 
    __metadata('design:type', String)
], ErrorEntity.prototype, "message", void 0);
export class ErrorPageEntity {
    constructor(json) {
        json = json || {};
        this.state = json.state;
        this.data = this.parseErrorEntities(json.result);
    }
    parseErrorEntities(error) {
        error = error || new ErrorEntity();
        return deserialize(ErrorEntity, error);
    }
}
