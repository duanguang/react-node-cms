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
import { connect } from 'react-redux';
import { PageContainer } from "../../utils/page";
import PageToast from "../../component/common/PageToast";
import 'react-progress-2/main.css';
import { PageProgress } from "../../component/common/PageProgress";
let App = class App extends React.Component {
    /*    static childContextTypes:React.ValidationMap<any> = {
     page: React.PropTypes.any
     };*/
    constructor(props, context) {
        super(props, context);
    }
    /*    getChildContext():IPageContext {
     return {page: {loading: true}};
     }*/
    componentDidMount() {
        // if (DeviceUtil.isIOS()) {
        // new FastClick(document.body);
        // }
    }
    render() {
        return (React.createElement(PageContainer, null, React.createElement(PageToast, null), React.createElement(PageProgress, null), this.props.children));
    }
};
App = __decorate([
    connect((state) => {
        return state.app;
    }, (dispatch) => {
        return {};
    }), 
    __metadata('design:paramtypes', [Object, Object])
], App);
export default App;
