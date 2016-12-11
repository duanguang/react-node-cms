var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import './css/regist.less';
import * as React from 'react';
import { connect } from 'react-redux';
import { OldFilterForm } from "../../../component/form/OldCreateFormFactory";
import { PromiseStatus } from "../../../utils/redux";
import * as UserIndexActions from '../../../redux/actions/user/userIndex';
import { RegExChk, validatorType } from "../../../utils/regex";
import { AntButtonModel } from "../../../component/form/FormSubmitButton";
import { Link } from 'react-router';
import { ModalMessage } from "../../../component/modal/ModalMessage";
import { insertUserLoginCookie, getUserLoginCookie, clearUserLoginCookie } from "utils/userLoginCookie";
import { OldLabelWithInputModel } from "../../../component/form/OldVFormInput";
let UserLoginBak = class UserLoginBak extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
    }
    chkUserName(rule, value, callback) {
        if (!RegExChk(validatorType.username, value) && (value !== undefined) && value !== "") {
            callback(new Error('账户名以英文字母开头，长度不少于4个字符'));
        }
        else {
            callback();
        }
    }
    getFilterProps(props) {
        const userNameOptions = {
            validate: [
                {
                    rules: [
                        { required: true, message: '请输入您的账户名' },
                        { validator: this.chkUserName }
                    ],
                    trigger: ['onBlur', 'onChange']
                }
            ], onChange: (e) => {
                //this.getPassStrenth(e.target.value, 'pass');
                /*var result:UserFormLogin=this.props.userFormLogin.data;
                result.userName=e.target.value;
                this.props.onChangeUserFormLogin(result)*/
            }
        };
        let passwordOptions = {
            validate: [
                {
                    rules: [
                        { required: true, message: '请输入您的密码' },
                    ],
                    trigger: ['onBlur', 'onChange']
                }
            ], onChange: (e) => {
                //this.getPassStrenth(e.target.value, 'pass');
                /*var result=this.props.userFormLogin.data;

                result.userPassword=e.target.value;
                this.props.onChangeUserFormLogin(result);*/
            },
        };
        const filterProps = [
            new OldLabelWithInputModel('UserName', 'UserName', '帐号', '帐号', ''),
            new OldLabelWithInputModel('Password', 'Password', '密码', '密码', '', 'password'),
            /*new OldLabelWithInputModel('UserName','UserName','帐号','帐号',userNameOptions,props.userFormLogin.data?props.userFormLogin.data.userName:''),
            new OldLabelWithInputModel('Password','Password','密码','密码',passwordOptions,props.userFormLogin.data?props.userFormLogin.data.userPassword:'','password'),*/
            new AntButtonModel('', (fields) => {
                fields.validateFieldsAndScroll((errors, value) => {
                    if (!!errors) {
                        console.log('Errors in form!!!');
                        return;
                    }
                    else {
                        this.props.onSubmit(value.UserName, value.Password);
                    }
                });
                //
            }, 'tn btn-lg btn-login btn-block')
        ];
        return filterProps;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.loginResult != this.props.loginResult && nextProps.loginResult.status === PromiseStatus.Loaded) {
            let state = nextProps.loginResult.data.state;
            let result = nextProps.loginResult.data.result;
            if (state != 1) {
                this.props.modalError(result.Message, '您输入的帐号或者密码错误，请检查后重新输入');
            }
            else {
                insertUserLoginCookie(result.MemberCK);
                this.props.modalSuccess(result.Message, '恭喜您，登录成功....');
                console.log(getUserLoginCookie('MemberCK'));
            }
        }
        if (nextProps.memberCkResult != this.props.chkUserLoginResult && nextProps.chkUserLoginResult.status === PromiseStatus.Loaded) {
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
        //console.log(this.props.loginResult.data.result);
        this.props.onDecryptMemberCk(getUserLoginCookie('MemberCK'));
    }
    render() {
        //console.log(this.props)
        return (React.createElement("div", {className: "container"}, React.createElement("div", {className: "form-signin"}, React.createElement("div", {className: "form-signin-heading text-center"}, React.createElement("h1", {className: "sign-title"}, "Sign In"), React.createElement("img", {src: "/common/libs/images/logo.png", alt: ""})), React.createElement("div", {className: "login-wrap"}, React.createElement(OldFilterForm, {controls: this.getFilterProps(this.props)}), React.createElement("div", {className: "registration"}, "Not a member yet?", React.createElement(Link, {to: "admin-manage"}, "regist"), React.createElement("span", {href: "#", onClick: this.handleMemberCK.bind(this)}, "memberCK")), React.createElement("label", {className: "checkbox"}, React.createElement("span", {className: "pull-right"}, React.createElement(Link, {to: "AntdDemo"}, "Forgot Password?")))))));
    }
};
UserLoginBak = __decorate([
    connect((state, ownProps) => {
        return {
            loginResult: state.userIndex.loginResult,
            chkUserLoginResult: state.userIndex.chkUserLoginResult
        };
    }, (dispatch) => {
        return {
            onSubmit: (userName, userPassWord) => dispatch(UserIndexActions.userLogin(userName, userPassWord, '')),
            onDecryptMemberCk: (memberCk) => dispatch(UserIndexActions.isUserLogin(memberCk))
        };
    }),
    ModalMessage, 
    __metadata('design:paramtypes', [Object, Object])
], UserLoginBak);
export default UserLoginBak;
