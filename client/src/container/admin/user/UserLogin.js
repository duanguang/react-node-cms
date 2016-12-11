/**
 * Created by XD on 2016/9/10.
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
import { FilterForm } from "../../../component/form/CreateFormFactory";
import { PromiseStatus } from "../../../utils/redux";
import * as UserIndexActions from '../../../redux/actions/user/userIndex';
import { Link } from 'react-router';
import { ModalMessage } from "../../../component/modal/ModalMessage";
import { getUserLoginCookie, clearUserLoginCookie } from "utils/userLoginCookie";
import { getLoginFromFilterProps, loginFormBaseCls } from "form/loginFormFilter";
import './css/login.less';
import { RoutesPath } from '../../../redux/actions/system/routesPath';
let UserLogin = class UserLogin extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.loginResult != this.props.loginResult && nextProps.loginResult.status === PromiseStatus.Loaded) {
            let state = nextProps.loginResult.data.state;
            let result = nextProps.loginResult.data.data;
            if (state != 1) {
                this.props.modalError(result.message, '您输入的帐号或者密码错误，请检查后重新输入');
            }
            else {
                //insertUserLoginCookie(result.MemberCK);
                this.props.modalSuccess(result.message, '恭喜您，登录成功....');
            }
        }
        if (nextProps.chkUserLoginResult != this.props.chkUserLoginResult && nextProps.chkUserLoginResult.status === PromiseStatus.Loaded) {
            let state = nextProps.chkUserLoginResult.data.state;
            let result = nextProps.chkUserLoginResult.data.result;
            if (state != 1) {
                this.props.modalError(result.Message, '您输入的帐号或者密码错误，请检查后重新输入');
                clearUserLoginCookie('MemberCK');
            }
            else {
                // insertUserLoginCookie(result.MemberCK);
                this.props.modalSuccess(result.Message, '恭喜您，登录成功....');
            }
        }
    }
    handleMemberCK() {
        this.props.onIsUserLogin(getUserLoginCookie('MemberCK'));
    }
    goAdminManageMenuList() {
        this.props.onGoAdminManageMenuList();
    }
    render() {
        return (React.createElement("div", {className: loginFormBaseCls}, React.createElement("div", {className: "form-signin"}, React.createElement("div", {className: "form-signin-heading text-center"}, React.createElement("h1", {className: "sign-title"}, "Sign In"), React.createElement("img", {src: "/common/libs/images/logo.png", alt: ""})), React.createElement("div", {className: "login-wrap"}, React.createElement(FilterForm, {controls: getLoginFromFilterProps(this.props)}), React.createElement("div", {className: "registration"}, "Not a member yet?", React.createElement("a", {href: "javascript:", onClick: this.goAdminManageMenuList.bind(this)}, "AdminManage"), React.createElement("span", {href: "#", onClick: this.handleMemberCK.bind(this)}, "memberCK")), React.createElement("label", {className: "checkbox"}, React.createElement("span", {className: "pull-right"}, React.createElement(Link, {to: "AntdDemo"}, "Forgot Password?")))))));
    }
};
UserLogin = __decorate([
    connect((state, ownProps) => {
        return {
            loginResult: state.userIndex.loginResult,
            chkUserLoginResult: state.userIndex.chkUserLoginResult
        };
    }, (dispatch) => {
        return {
            onSubmit: (userName, userPassWord, code) => dispatch(UserIndexActions.userLogin(userName, userPassWord, code)),
            onIsUserLogin: (memberCk) => dispatch(UserIndexActions.isUserLogin(memberCk)),
            onGoAdminManageMenuList: () => dispatch(RoutesPath.goAdminManageCate())
        };
    }),
    ModalMessage, 
    __metadata('design:paramtypes', [Object, Object])
], UserLogin);
export default UserLogin;
