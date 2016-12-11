var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as React from "react";
import { page } from "../../utils/page";
import Toast from "./Toast";
let PageToast = class PageToast extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { loading, submitting } = this.props.page;
        return (React.createElement(Toast, {show: loading || submitting, icon: "loading"}, submitting ? '数据提交中' : '数据加载中'));
    }
};
PageToast = __decorate([
    page(), 
    __metadata('design:paramtypes', [Object, Object])
], PageToast);
export default PageToast;
