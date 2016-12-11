import 'user/css/regist.css';
import * as React from 'react';
import { FilterFormInstance } from '../../../component/regist/RegistSubmitFormIndex';
import 'antd/dist/antd.css';
/*@connect<void,void,void>(
    (state:IStoreState) => {
        return state.registIndex;
    },
    (dispatch:Dispatch)=>{
        return {
            onSubmit:(model:UserRegistInfo)=>dispatch(UserRregistActions.submitRegist(model))
        };
    }
)*/
export default class RegistComponent extends React.Component {
    constructor(props) {
        super(props);
        // this.state=initState;
    }
    getFilterProps(props) {
        const filterFormProps = {
            trueNameInput: {
                id: "TrueName",
                name: "TrueName",
                labelName: "昵称",
                placeholder: "昵称",
            },
            emailInput: {
                id: "Email",
                name: "Email",
                labelName: "电子邮件",
                placeholder: "电子邮件"
            },
            mobileInput: {
                id: "Mobile",
                name: "Mobile",
                labelName: "手机号",
                placeholder: "手机号"
            },
            userNameInput: {
                id: "UserName",
                name: "UserName",
                labelName: "帐号",
                placeholder: "帐号"
            },
            passWordInput: {
                id: "Password",
                name: "Password",
                labelName: "密码",
                placeholder: "密码",
                type: "password"
            },
            rePassWordInput: {
                id: "RePassword",
                name: "RePassword",
                labelName: "确认密码",
                placeholder: "确认密码",
                type: "password"
            },
            submit: {
                handelSubmit: (fields) => {
                    console.log(fields);
                    console.log(this.props);
                    fields.validateFieldsAndScroll((errors, value) => {
                        if (!!errors) {
                            console.log('Errors in form!!!');
                            return;
                        }
                        console.log('Submit!!!');
                        console.log(value);
                    });
                    //  console.log(fields.getFieldsValue());
                },
                text: "",
                className: "btn btn-lg btn-login btn-block",
                textClassName: "fa fa-check",
            }
        };
        return filterFormProps;
    }
    componentDidMount() {
        // console.log(document.getElementsByName("TrueName").value);
    }
    render() {
        //  const userRegistInfo = this.state.userRegistInfo;
        return (React.createElement("div", {className: "container"}, React.createElement("div", {className: "form-signin"}, React.createElement("div", {className: "form-signin-heading text-center"}, React.createElement("h1", {className: "sign-title"}, "user regist"), React.createElement("img", {src: "/common/libs/images/login-logo.png", alt: ""})), React.createElement("div", {className: "login-wrap"}, React.createElement("p", null, "请填写您的个人信息"), React.createElement(FilterFormInstance, React.__spread({}, this.getFilterProps(this.props))), React.createElement("div", {className: "registration"}, "已注册？请.", React.createElement("a", {href: "login.html", className: ""}, "登陆"))))));
    }
}
/*
export default connect(
    (state:IStoreState) => {
        return state.registReducer;
    },
    (dispatch) => {
        return {

        };
    }
)(RegistComponent);*/
