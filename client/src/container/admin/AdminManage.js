/**
 * Created by XD on 2016/9/17.
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
import * as React from 'react';
import { connect } from 'react-redux';
import { page } from "../../utils/page";
import { PromiseStatus } from "../../utils/redux";
import { StateEnumResult } from "../../model/common/commonResult";
import { ModalMessage } from "../../component/modal/ModalMessage";
import * as UserIndexActions from '../../redux/actions/user/userIndex';
import { withRouter } from "react-router";
import { getUserLoginCookie } from "../../utils/userLoginCookie";
import LeftNavMenu from "../../component/menu/LeftNavMenu";
import TopNavMenu from "../../component/menu/TopNavMenu";
import GenericComponent from "../../component/abstract/GenericComponent";
let AdminManage = class AdminManage extends GenericComponent {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.props.onIsUserLogin(getUserLoginCookie('MemberCK'));
    }
    isLogin() {
        if (this.props.chkUserLoginResult.status === PromiseStatus.Loaded && this.props.chkUserLoginResult.data) {
            let memberCk = this.props.chkUserLoginResult.data;
            if (memberCk.state == StateEnumResult.Success) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    renderResult() {
        if (this.isLogin()) {
            return this.renderAuthPassComponent();
        }
        else {
            return this.renderAuthFailComponent();
        }
    }
    renderAuthPassComponent() {
        return (React.createElement("div", null, this.props.children));
    }
    renderAuthFailComponent() {
        return null;
    }
    render() {
        return (React.createElement("div", null, React.createElement("div", {className: "lefter"}, React.createElement("div", {className: "logo"}, React.createElement("a", {href: "/AdminManage/AdminPage/Default.aspx", target: "_blank"}, React.createElement("img", {src: "/common/libs/images/logo.png", alt: "后台管理系统"})))), React.createElement(TopNavMenu, null), React.createElement(LeftNavMenu, null), React.createElement("div", {className: "admin"}, this.renderResult(), React.createElement("br", null), React.createElement("p", {className: "text-right text-gray"}, "React"))));
    }
};
AdminManage = __decorate([
    withRouter,
    connect((state, ownProps) => {
        return {
            chkUserLoginResult: state.userIndex.chkUserLoginResult,
        };
    }, (dispatch) => {
        return {
            onIsUserLogin: (memberCk) => dispatch(UserIndexActions.isUserLogin(memberCk)),
        };
    }),
    ModalMessage,
    page((props) => {
        return {
            loading: props.chkUserLoginResult.status == PromiseStatus.Loading,
            progress: props.chkUserLoginResult.status === PromiseStatus.Loading
        };
    }), 
    __metadata('design:paramtypes', [Object, Object])
], AdminManage);
export default AdminManage;
