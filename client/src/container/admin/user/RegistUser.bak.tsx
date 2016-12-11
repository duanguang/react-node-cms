/**
 * Created by DuanG on 2016/8/24.
 */
import './css/regist.less'
import * as React from 'react';
import {UserRegistInfo} from '../../../model/userRegistInfo';
import {connect} from 'react-redux';
import {OldFilterForm} from '../../../component/form/OldCreateFormFactory';

import {OldLabelWithInputModel} from '../../../component/form/OldVFormInput';
import {LabelWithPassInputModel} from '../../../component/form/FormPassWordInput';
import {AntButtonModel} from '../../../component/form/FormSubmitButton';

import {PromiseState, PromiseStatus} from '../../../utils/redux';
import {ResponseOuterModel} from '../../../model/common/commonResult';
import * as UserIndexActions from '../../../redux/actions/user/userIndex'
import {Dispatch} from "redux";
import {RegExChk, validatorType} from 'utils/regex';
import {IUserIndexStore} from "../../../redux/reducers/user/userIndex";
import {ModalMessage, IModalMessageProps} from "../../../component/modal/ModalMessage";
import {Link} from 'react-router';
import {IAntdPassWordInputProps} from "custom-antd";
interface IRegistUserStateProps{
    registUserResult:PromiseState<ResponseOuterModel>;
}
interface IRegistDispatchUserProps{
    onSubmit?:(userRegistInfo:UserRegistInfo)=>void;
}

 interface IRegistUserProps extends IModalMessageProps{
     renderModalContent?:()=>void;
}

@connect<IRegistUserStateProps,IRegistDispatchUserProps,IRegistUserProps>(
    (state:IUserIndexStore, ownProps:IRegistUserProps) => {
        return {
            registUserResult:state.userIndex.registUserResult
        };
    },
    (dispatch:Dispatch)=>{
        return {
            onSubmit:(model:UserRegistInfo)=>dispatch(UserIndexActions.submitRegist(model))
        };
    }
)
@ModalMessage
export default class RegistUserBak extends React.Component<IRegistUserStateProps & IRegistDispatchUserProps & IRegistUserProps,any> {
    constructor(props) {
        super(props);
        // this.state=initState;
    }
    trueNameChk(rule, value, callback){
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (value === 'JasonWood') {
                    callback([new Error('抱歉，该用户名已被占用。')]);
                } else {
                    callback();
                }
            }, 800);
        }
    }
    chkMobile(rule,value,callback){
        if(!RegExChk(validatorType.mobile,value)&&(value!==undefined)&&value!=="")
        {
            callback(new Error('请输入11位数字的手机号'));
        }
        else {
            callback();
        }
    }
    chkUserName(rule,value,callback){
        if(!RegExChk(validatorType.username,value)&&(value!==undefined)&&value!==""){
            callback(new Error('账户名以英文字母开头，长度不少于4个字符'));
        }
        else {
            callback();
        }
    }
    getFilterProps(props:IRegistUserStateProps){

        const trueNameOptions={
            rules: [
                { required: false,min:2,max:5,message: '昵称至少为 1-5 个字符' },
                { validator: this.trueNameChk},
            ]
        };
        const emailOptions={
            validate:[{
                rules:[
                    {required:true,message:'请输入您的邮箱'}
                ],
                trigger:'onBlur'
            },
                {
                    rules:[
                        {type:'email',message:'请填写正确的邮箱地址'}
                    ],
                    trigger:['onBlur','onChange']
                }
            ]
        };
        const mobileOptions={
            validate:[{
                rules: [
                    {required: true, message: '请输入您的手机号'},
                    {validator: this.chkMobile}
                ],
                trigger: ['onBlur','onChange']
            }
            ]
        };
        const userNameOptions={
            validate:[
                {
                    rules:[
                        {required:true,message:'请输入您的账户名'},
                        {validator:this.chkUserName}
                    ],
                    trigger:['onBlur','onChange']
                }
            ]
        };
        let passWord:IAntdPassWordInputProps={
            id:'Password',
            name:'Password',
            placeholder:'密码',
            reId:'RePassword',
            reName:'RePassword',
        }
        const filterProps=[
            new OldLabelWithInputModel('TrueName','TrueName','昵称','昵称',trueNameOptions,'','',''),
            new OldLabelWithInputModel('Email','Email','电子邮件','电子邮件',emailOptions),
            new OldLabelWithInputModel('Mobile','Mobile','手机号','手机号',mobileOptions),
            new OldLabelWithInputModel('UserName','UserName','帐号','帐号',userNameOptions),
            new LabelWithPassInputModel(passWord),
            new AntButtonModel('', (fields: any)=> {
                fields.validateFieldsAndScroll((errors,value)=>{
                    if (!!errors) {
                        console.log('Errors in form!!!');
                        return;
                    }
                    else {
                        var userRegistInfo=new UserRegistInfo();
                        userRegistInfo.email=value.Email;
                        userRegistInfo.mobile=value.Mobile;
                        userRegistInfo.userName=value.UserName;
                        userRegistInfo.userPassword=value.Password;
                        userRegistInfo.trueName=value.TrueName;
                        this.props.onSubmit(userRegistInfo);
                    }

                })
               //
            },'tn btn-lg btn-login btn-block')
        ];

        return filterProps;
    };

    componentDidMount(){
    }
    renderModalContent(){//信息提示描述模版
        return(
            <div>
                <p>该帐号已被注册过，请重新输入新的帐号注册</p>
            </div>
        )
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.registUserResult!=this.props.registUserResult&&nextProps.registUserResult.status===PromiseStatus.Loaded){
            let state=nextProps.registUserResult.data.state;
            let result=nextProps.registUserResult.data.result;
            if(state!=1){
               // this.props.modalInfo(result.Message,this.renderModalContent());
                  //this.props.modalError(result.Message,'该帐号已被注册过，请重新输入新的帐号注册');
                // this.props.modalSuccess(result.Message,'该帐号已被注册过，请重新输入新的帐号注册');
                this.props.modalWarning(result.Message,'该帐号已被注册过，请重新输入新的帐号注册');
            }
            else {
                this.props.modalSuccess(result,'恭喜您，注册成功，可使用帐号密码登录');
            }
        }
    }

    render() {
        //  const userRegistInfo = this.state.userRegistInfo;
        return (
            <div className="container">
                <div className="form-signin">
                    <div className="form-signin-heading text-center">
                        <h1 className="sign-title">user regist</h1>
                        <img src="/common/libs/images/logo.png" alt=""/>
                    </div>
                    <div className="login-wrap">
                        <p>请填写您的个人信息</p>
                        <OldFilterForm controls={this.getFilterProps(this.props)}></OldFilterForm>
                        <div className="registration">
                            已注册？请.
                           <Link to="/user-login">登陆</Link>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
