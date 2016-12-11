/**
 * Created by DuanG on 2016/10/27.
 */
import './css/regist.less'
import * as React from 'react';
import {connect} from 'react-redux';
import {OldFilterForm} from "../../../component/form/OldCreateFormFactory";
import {IUserIndexStore} from "../../../redux/reducers/user/userIndex";
import {PromiseState, PromiseStatus} from "../../../utils/redux";
import {ResponseOuterModel} from "../../../model/common/commonResult";
import * as UserIndexActions from '../../../redux/actions/user/userIndex'
import Dispatch = Redux.Dispatch;
import {RegExChk,validatorType} from "../../../utils/regex";
import {AntButtonModel} from "../../../component/form/FormSubmitButton";
import {UserFormLogin} from "../../../model/userRegistInfo";
import {md5Hash} from "../../../utils/hash";
import {Link} from 'react-router';
import {ModalMessage, IModalMessageProps} from "../../../component/modal/ModalMessage";
import {insertUserLoginCookie, getUserLoginCookie, clearUserLoginCookie} from "utils/userLoginCookie";
import {OldLabelWithInputModel} from "../../../component/form/OldVFormInput";
import {UserLoginPageEntity} from "../../../model/user/userLoginEntity";
import {VAuthPageEntity} from "../../../model/user/VAuthEntity";
interface IUserLoginStateProps{
    loginResult:PromiseState<UserLoginPageEntity>;
    chkUserLoginResult:PromiseState<VAuthPageEntity>;
}
interface IUserLoginDispatchProps{
    onSubmit?:(userName:string,userPassWord:string)=>void;
    onDecryptMemberCk?:(memberCk:string)=>void;
}

interface IUserLoginProps extends IModalMessageProps{
}
@connect<IUserLoginStateProps,IUserLoginDispatchProps,IUserLoginProps>(
    (state:IUserIndexStore,ownProps:IUserLoginProps)=>{
        return {
            loginResult:state.userIndex.loginResult,
            chkUserLoginResult:state.userIndex.chkUserLoginResult
        }
    },
    (dispatch:Dispatch)=>{
        return{
            onSubmit:(userName:string,userPassWord:string)=>dispatch(UserIndexActions.userLogin(userName,userPassWord,'')),
            onDecryptMemberCk:(memberCk:string)=>dispatch(UserIndexActions.isUserLogin(memberCk))
        }
    }
)
@ModalMessage
export default class UserLoginBak extends React.Component<IUserLoginStateProps & IUserLoginDispatchProps & IUserLoginProps,any>{
    constructor(props,context){
        super(props,context);
    }
    componentDidMount(){

    }
    chkUserName(rule,value,callback){
        if(!RegExChk(validatorType.username,value)&&(value!==undefined)&&value!==""){
            callback(new Error('账户名以英文字母开头，长度不少于4个字符'));
        }else {
            callback();
        }
    }
    getFilterProps(props:IUserLoginStateProps){
        const userNameOptions={
            validate:[
                {
                    rules:[
                        {required:true,message:'请输入您的账户名'},
                        {validator:this.chkUserName}
                    ],
                    trigger:['onBlur','onChange']
                }
            ],onChange: (e) => {
                //this.getPassStrenth(e.target.value, 'pass');
                /*var result:UserFormLogin=this.props.userFormLogin.data;
                result.userName=e.target.value;
                this.props.onChangeUserFormLogin(result)*/
            }
        };
        let passwordOptions={
            validate:[
                {
                    rules:[
                        {required:true,message:'请输入您的密码'},
                    ],
                    trigger:['onBlur','onChange']
                }
            ],onChange: (e) => {
                //this.getPassStrenth(e.target.value, 'pass');
                /*var result=this.props.userFormLogin.data;

                result.userPassword=e.target.value;
                this.props.onChangeUserFormLogin(result);*/

            },
        }
        const filterProps=[
            new OldLabelWithInputModel('UserName','UserName','帐号','帐号',''),
            new OldLabelWithInputModel('Password','Password','密码','密码','','password'),
            /*new OldLabelWithInputModel('UserName','UserName','帐号','帐号',userNameOptions,props.userFormLogin.data?props.userFormLogin.data.userName:''),
            new OldLabelWithInputModel('Password','Password','密码','密码',passwordOptions,props.userFormLogin.data?props.userFormLogin.data.userPassword:'','password'),*/
            new AntButtonModel('', (fields: any)=> {
                fields.validateFieldsAndScroll((errors,value)=>{
                    if (!!errors) {
                        console.log('Errors in form!!!');
                        return;
                    }
                    else {

                        this.props.onSubmit(value.UserName,value.Password);
                    }

                })
                //
            },'tn btn-lg btn-login btn-block')
        ];
        return filterProps;
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.loginResult!=this.props.loginResult&&nextProps.loginResult.status===PromiseStatus.Loaded){
            let state=nextProps.loginResult.data.state;
            let result=nextProps.loginResult.data.result;
            if(state!=1){
                this.props.modalError(result.Message,'您输入的帐号或者密码错误，请检查后重新输入');
            }
            else {
                insertUserLoginCookie(result.MemberCK);
                this.props.modalSuccess(result.Message,'恭喜您，登录成功....');
                console.log(getUserLoginCookie('MemberCK'));
            }
        }
        if(nextProps.memberCkResult!=this.props.chkUserLoginResult&&nextProps.chkUserLoginResult.status===PromiseStatus.Loaded){
            let state=nextProps.chkUserLoginResult.data.state;
            let result=nextProps.chkUserLoginResult.data.result;
            if(state!=1){
                this.props.modalError(result.Message,'您输入的帐号或者密码错误，请检查后重新输入');
                clearUserLoginCookie('MemberCK');
            }
            else {
                // insertUserLoginCookie(result.MemberCK);
                this.props.modalSuccess(result.Message,'恭喜您，登录成功....');
                // console.log(getUserLoginCookie('MemberCK'));
            }
        }
    }
    handleMemberCK(){
        //console.log(this.props.loginResult.data.result);
        this.props.onDecryptMemberCk(getUserLoginCookie('MemberCK'));
    }
    render(){
        //console.log(this.props)
        return(
            <div className="container">

                <div className="form-signin">
                    <div className="form-signin-heading text-center">
                        <h1 className="sign-title">Sign In</h1>
                        <img src="/common/libs/images/logo.png" alt=""/>
                    </div>
                    <div className="login-wrap">

                        <OldFilterForm controls={this.getFilterProps(this.props)}></OldFilterForm>
                        <div className="registration">Not a member yet?
                            <Link to="admin-manage">regist</Link>
                            <span href="#" onClick={this.handleMemberCK.bind(this)}>memberCK</span>
                        </div>
                        <label className="checkbox">
                            <span className="pull-right">

                                <Link to="AntdDemo">Forgot Password?</Link>
                            </span>
                        </label>

                    </div>



                </div>

            </div>
        )
    }
}