var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as React from 'react';
import Progress from 'react-progress-2';
import { page } from "../../utils/page";
/*@connect(
    (state: IStoreState): IPageProgressStateProps => {
        return {loaded: state.reduxAsyncConnect.loaded}
    }
)*/
export let PageProgress = class PageProgress extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.isMount = false;
    }
    handleVisibility() {
        const { progress } = this.props.page;
        return progress ? Progress.show() : Progress.hide();
    }
    componentDidMount() {
        this.isMount = true;
    }
    render() {
        this.isMount && this.handleVisibility();
        return (React.createElement(Progress.Component, null));
    }
};
PageProgress = __decorate([
    page(), 
    __metadata('design:paramtypes', [Object, Object])
], PageProgress);
