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
import { FilterForm } from '../../../component/form/CreateFormFactory';
import { PromiseStatus } from '../../../utils/redux';
import * as UserIndexActions from '../../../redux/actions/user/userIndex';
import { ModalMessage } from "../../../component/modal/ModalMessage";
import { Link } from 'react-router';
import './css/regist.less';
import { getRegistFromFilterProps, registFormBaseCls } from "form/registFormFilter";
import GenericComponent from "../../../component/abstract/GenericComponent";
let RegistUser = class RegistUser extends GenericComponent {
    constructor(props) {
        super(props);
        // this.state=initState;
    }
    componentDidMount() {
    }
    renderModalContent() {
        return (React.createElement("div", null, React.createElement("p", null, "该帐号已被注册过，请重新输入新的帐号注册")));
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.registUserResult != this.props.registUserResult && nextProps.registUserResult.status === PromiseStatus.Loaded) {
            let state = nextProps.registUserResult.data.state;
            let result = nextProps.registUserResult.data.result;
            if (state != 1) {
                // this.props.modalInfo(result.Message,this.renderModalContent());
                // this.props.modalSuccess(result.Message,'该帐号已被注册过，请重新输入新的帐号注册');
                this.props.modalWarning(result.Message, '该帐号已被注册过，请重新输入新的帐号注册');
            }
            else {
                this.props.modalSuccess(result, '恭喜您，注册成功，可使用帐号密码登录');
            }
        }
    }
    render() {
        return (React.createElement("div", {className: registFormBaseCls}, React.createElement("div", {className: "form-signin"}, React.createElement("div", {className: "form-signin-heading text-center"}, React.createElement("h1", {className: "sign-title"}, "user regist"), React.createElement("img", {src: "/common/libs/images/logo.png", alt: ""})), React.createElement("div", {className: "login-wrap"}, React.createElement("p", null, "请填写您的个人信息"), React.createElement(FilterForm, {controls: getRegistFromFilterProps(this.props)}), React.createElement("div", {className: "registration"}, "已注册？请.", React.createElement(Link, {to: "/user-login"}, "登陆"))))));
    }
};
RegistUser = __decorate([
    connect((state, ownProps) => {
        return {
            registUserResult: state.userIndex.registUserResult
        };
    }, (dispatch) => {
        return {
            onSubmit: (model) => dispatch(UserIndexActions.submitRegist(model))
        };
    }),
    ModalMessage, 
    __metadata('design:paramtypes', [Object])
], RegistUser);
export default RegistUser;
