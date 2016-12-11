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
import { UserRegistInfo } from '../../../model/userRegistInfo';
import { connect } from 'react-redux';
import { OldFilterForm } from '../../../component/form/OldCreateFormFactory';
import { OldLabelWithInputModel } from '../../../component/form/OldVFormInput';
import { LabelWithPassInputModel } from '../../../component/form/FormPassWordInput';
import { AntButtonModel } from '../../../component/form/FormSubmitButton';
import { PromiseStatus } from '../../../utils/redux';
import * as UserIndexActions from '../../../redux/actions/user/userIndex';
import { RegExChk, validatorType } from 'utils/regex';
import { ModalMessage } from "../../../component/modal/ModalMessage";
import { Link } from 'react-router';
let RegistUserBak = class RegistUserBak extends React.Component {
    constructor(props) {
        super(props);
        // this.state=initState;
    }
    trueNameChk(rule, value, callback) {
        if (!value) {
            callback();
        }
        else {
            setTimeout(() => {
                if (value === 'JasonWood') {
                    callback([new Error('抱歉，该用户名已被占用。')]);
                }
                else {
                    callback();
                }
            }, 800);
        }
    }
    chkMobile(rule, value, callback) {
        if (!RegExChk(validatorType.mobile, value) && (value !== undefined) && value !== "") {
            callback(new Error('请输入11位数字的手机号'));
        }
        else {
            callback();
        }
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
        const trueNameOptions = {
            rules: [
                { required: false, min: 2, max: 5, message: '昵称至少为 1-5 个字符' },
                { validator: this.trueNameChk },
            ]
        };
        const emailOptions = {
            validate: [{
                    rules: [
                        { required: true, message: '请输入您的邮箱' }
                    ],
                    trigger: 'onBlur'
                },
                {
                    rules: [
                        { type: 'email', message: '请填写正确的邮箱地址' }
                    ],
                    trigger: ['onBlur', 'onChange']
                }
            ]
        };
        const mobileOptions = {
            validate: [{
                    rules: [
                        { required: true, message: '请输入您的手机号' },
                        { validator: this.chkMobile }
                    ],
                    trigger: ['onBlur', 'onChange']
                }
            ]
        };
        const userNameOptions = {
            validate: [
                {
                    rules: [
                        { required: true, message: '请输入您的账户名' },
                        { validator: this.chkUserName }
                    ],
                    trigger: ['onBlur', 'onChange']
                }
            ]
        };
        let passWord = {
            id: 'Password',
            name: 'Password',
            placeholder: '密码',
            reId: 'RePassword',
            reName: 'RePassword',
        };
        const filterProps = [
            new OldLabelWithInputModel('TrueName', 'TrueName', '昵称', '昵称', trueNameOptions, '', '', ''),
            new OldLabelWithInputModel('Email', 'Email', '电子邮件', '电子邮件', emailOptions),
            new OldLabelWithInputModel('Mobile', 'Mobile', '手机号', '手机号', mobileOptions),
            new OldLabelWithInputModel('UserName', 'UserName', '帐号', '帐号', userNameOptions),
            new LabelWithPassInputModel(passWord),
            new AntButtonModel('', (fields) => {
                fields.validateFieldsAndScroll((errors, value) => {
                    if (!!errors) {
                        console.log('Errors in form!!!');
                        return;
                    }
                    else {
                        var userRegistInfo = new UserRegistInfo();
                        userRegistInfo.email = value.Email;
                        userRegistInfo.mobile = value.Mobile;
                        userRegistInfo.userName = value.UserName;
                        userRegistInfo.userPassword = value.Password;
                        userRegistInfo.trueName = value.TrueName;
                        this.props.onSubmit(userRegistInfo);
                    }
                });
                //
            }, 'tn btn-lg btn-login btn-block')
        ];
        return filterProps;
    }
    ;
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
                //this.props.modalError(result.Message,'该帐号已被注册过，请重新输入新的帐号注册');
                // this.props.modalSuccess(result.Message,'该帐号已被注册过，请重新输入新的帐号注册');
                this.props.modalWarning(result.Message, '该帐号已被注册过，请重新输入新的帐号注册');
            }
            else {
                this.props.modalSuccess(result, '恭喜您，注册成功，可使用帐号密码登录');
            }
        }
    }
    render() {
        //  const userRegistInfo = this.state.userRegistInfo;
        return (React.createElement("div", {className: "container"}, React.createElement("div", {className: "form-signin"}, React.createElement("div", {className: "form-signin-heading text-center"}, React.createElement("h1", {className: "sign-title"}, "user regist"), React.createElement("img", {src: "/common/libs/images/logo.png", alt: ""})), React.createElement("div", {className: "login-wrap"}, React.createElement("p", null, "请填写您的个人信息"), React.createElement(OldFilterForm, {controls: this.getFilterProps(this.props)}), React.createElement("div", {className: "registration"}, "已注册？请.", React.createElement(Link, {to: "/user-login"}, "登陆"))))));
    }
};
RegistUserBak = __decorate([
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
], RegistUserBak);
export default RegistUserBak;
