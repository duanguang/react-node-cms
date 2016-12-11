/**
 * Created by XD on 2016/9/10.
 */

import * as React from 'react';
import {connect} from 'react-redux';
import {FilterForm} from "../../../component/form/CreateFormFactory";
import {IUserIndexStore} from "../../../redux/reducers/user/userIndex";
import {PromiseState, PromiseStatus} from "../../../utils/redux";
import {ResponseOuterModel} from "../../../model/common/commonResult";
import * as UserIndexActions from '../../../redux/actions/user/userIndex'
import Dispatch = Redux.Dispatch;
import {UserFormLogin} from "../../../model/userRegistInfo";
import {md5Hash} from "../../../utils/hash";
import {Link} from 'react-router';
import {ModalMessage, IModalMessageProps} from "../../../component/modal/ModalMessage";
import {insertUserLoginCookie, getUserLoginCookie, clearUserLoginCookie} from "utils/userLoginCookie";
import {getLoginFromFilterProps, loginFormBaseCls} from "form/loginFormFilter";
import './css/login.less';
import {UserLoginPageEntity, UserLoginEntity} from "../../../model/user/userLoginEntity";
import {VAuthPageEntity} from "../../../model/user/VAuthEntity";
import {RoutesPath} from '../../../redux/actions/system/routesPath';
interface IUserLoginStateProps{
    loginResult:PromiseState<UserLoginPageEntity>;
    chkUserLoginResult:PromiseState<VAuthPageEntity>;
}
interface IUserLoginDispatchProps{
    onSubmit?:(userName:string,userPassWord:string,code:string)=>void;
    onChangeUserFormLogin?:(userFormLogin:UserFormLogin)=>void;
    onChangeUserNameLogin?:(userName:string)=>void;
    onIsUserLogin?:(memberCk:string)=>void;
    onGoAdminManageMenuList?:()=>void;
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
            onSubmit:(userName:string,userPassWord:string,code:string)=>dispatch(UserIndexActions.userLogin(userName,userPassWord,code)),
            onIsUserLogin:(memberCk:string)=>dispatch(UserIndexActions.isUserLogin(memberCk)),
            onGoAdminManageMenuList:()=>dispatch(RoutesPath.goAdminManageCate())
        }
    }
)
@ModalMessage
export default class UserLogin extends React.Component<IUserLoginStateProps & IUserLoginDispatchProps & IUserLoginProps,any>{
    constructor(props,context){
        super(props,context);
    }
    componentDidMount(){
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.loginResult!=this.props.loginResult&&nextProps.loginResult.status===PromiseStatus.Loaded){
            let state=nextProps.loginResult.data.state;
            let result:UserLoginEntity=nextProps.loginResult.data.data;
            if(state!=1){
                this.props.modalError(result.message,'您输入的帐号或者密码错误，请检查后重新输入');
            }
            else {
                //insertUserLoginCookie(result.MemberCK);
                this.props.modalSuccess(result.message,'恭喜您，登录成功....');
                //console.log(getUserLoginCookie('MemberCK'));
            }
        }
        if(nextProps.chkUserLoginResult!=this.props.chkUserLoginResult&&nextProps.chkUserLoginResult.status===PromiseStatus.Loaded){
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
        this.props.onIsUserLogin(getUserLoginCookie('MemberCK'));
    }
    goAdminManageMenuList(){
        this.props.onGoAdminManageMenuList();
    }
    render(){
        return(
            <div className={loginFormBaseCls}>

                <div className="form-signin">
                    <div className="form-signin-heading text-center">
                        <h1 className="sign-title">Sign In</h1>
                        <img src="/common/libs/images/logo.png" alt=""/>
                    </div>
                    <div className="login-wrap">

                        <FilterForm controls={getLoginFromFilterProps(this.props)}></FilterForm>
                        <div className="registration">Not a member yet?
                            <a href="javascript:" onClick={this.goAdminManageMenuList.bind(this)}>AdminManage</a>
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