import 'user/css/regist.css'
import * as React from 'react';
import {UserRegistInfo} from '../../../model/userRegistInfo';
import {connect} from 'react-redux';
import {IStoreState} from "../../../redux/reducers/rootReducer";
import {FilterFormInstance} from '../../../component/regist/RegistSubmitFormIndex';

import {PromiseState} from '../../../utils/redux';
import {ResponseOuterModel} from '../../../model/common/commonResult';
import * as UserRregistActions from '../../../redux/actions/user/userIndex'
import 'antd/dist/antd.css';
import {Dispatch} from "redux";

interface IRegistComponentProps{
    //submitResult:PromiseState<ResponseOuterModel>;
    onSubmit:(userRegistInfo:UserRegistInfo)=>void;
}

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
export default class RegistComponent extends React.Component<IRegistComponentProps,any> {
    constructor(props) {
        super(props);
       // this.state=initState;
    }
    getFilterProps(props:IRegistComponentProps) {
        const filterFormProps = {
            trueNameInput:{
                id:"TrueName",
                name:"TrueName",
                labelName:"昵称",
                placeholder:"昵称",
            },
            emailInput:{
                id:"Email",
                name:"Email",
                labelName:"电子邮件",
                placeholder:"电子邮件"
            },
            mobileInput:{
                id:"Mobile",
                name:"Mobile",
                labelName:"手机号",
                placeholder:"手机号"
            },
            userNameInput:{
                id:"UserName",
                name:"UserName",
                labelName:"帐号",
                placeholder:"帐号"
            },
            passWordInput:{
                id:"Password",
                name:"Password",
                labelName:"密码",
                placeholder:"密码",
                type:"password"
            },
            rePassWordInput:{
                id:"RePassword",
                name:"RePassword",
                labelName:"确认密码",
                placeholder:"确认密码",
                type:"password"
            },
            submit: {
                handelSubmit: (fields: any)=> {
                    console.log(fields);
                    console.log(this.props)
                    fields.validateFieldsAndScroll((errors,value)=>{
                        if (!!errors) {
                            console.log('Errors in form!!!');
                            return;
                        }
                        console.log('Submit!!!');
                        console.log(value);
                    })
                    //  console.log(fields.getFieldsValue());
                },
                text: "",
                className:"btn btn-lg btn-login btn-block",
                textClassName:"fa fa-check",
            }
        };
        return filterFormProps;
    }




    componentDidMount(){
        // console.log(document.getElementsByName("TrueName").value);
    }
    render() {
      //  const userRegistInfo = this.state.userRegistInfo;
        return (
            <div className="container">
                <div className="form-signin">
                <div className="form-signin-heading text-center">
                    <h1 className="sign-title">user regist</h1>
                    <img src="/common/libs/images/login-logo.png" alt=""/>
                </div>
                <div className="login-wrap">
                    <p>请填写您的个人信息</p>
                    <FilterFormInstance {...this.getFilterProps(this.props)}></FilterFormInstance>

                    <div className="registration">
                        已注册？请.
                        <a href="login.html" className="">登陆</a>
                    </div>
                </div>
              </div>
            </div>

        );
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
