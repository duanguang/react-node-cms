/**
 * Created by XD on 2016/9/17.
 */

import * as React from 'react';
import {connect} from 'react-redux';
import {page} from "../../utils/page";
import {PromiseState, PromiseStatus} from "../../utils/redux";
import {StateEnumResult} from "../../model/common/commonResult";
import {IUserIndexStore} from "../../redux/reducers/user/userIndex";
import {ModalMessage,IModalMessageProps} from "../../component/modal/ModalMessage";
import Dispatch = Redux.Dispatch;
import * as UserIndexActions from '../../redux/actions/user/userIndex'
import {withRouter} from "react-router";
import {getUserLoginCookie} from "../../utils/userLoginCookie";
import LeftNavMenu from "../../component/menu/LeftNavMenu";
import TopNavMenu from "../../component/menu/TopNavMenu";
import GenericComponent from "../../component/abstract/GenericComponent";
import {RoutesPath} from "../../redux/actions/system/routesPath";
import {VAuthPageEntity} from "../../model/user/VAuthEntity";
import {CurrentMenu} from "../../model/menu/currentMenu";
interface IAdminManageStateProps{
    chkUserLoginResult?:PromiseState<VAuthPageEntity>;
}
interface IAdminManageDispatchProps{
    onIsUserLogin?:(memberCk:string)=>void;
}
interface IAdminManageProps extends IModalMessageProps{
}
@withRouter
@connect<IAdminManageStateProps,IAdminManageDispatchProps,IAdminManageProps>(
    (state:IUserIndexStore,ownProps:IAdminManageProps)=>{
        return {
            chkUserLoginResult:state.userIndex.chkUserLoginResult,
        }
    },
    (dispatch:Dispatch)=>{
        return{
            onIsUserLogin:(memberCk:string)=>dispatch(UserIndexActions.isUserLogin(memberCk)),
            
        }
    }
)
@ModalMessage
@page((props)=> {
    return {
        loading: props.chkUserLoginResult.status == PromiseStatus.Loading,
        progress:props.chkUserLoginResult.status===PromiseStatus.Loading
    };
})
export default class AdminManage extends GenericComponent<IAdminManageStateProps & IAdminManageDispatchProps & IAdminManageProps,void>{
    constructor(props,context){
        super(props,context);
    }
    componentDidMount(){
        this.props.onIsUserLogin(getUserLoginCookie('MemberCK'));
    }
    isLogin(){
        if(this.props.chkUserLoginResult.status===PromiseStatus.Loaded&&this.props.chkUserLoginResult.data){
            let memberCk=this.props.chkUserLoginResult.data;
            if(memberCk.state==StateEnumResult.Success){
                return true;
            }
            else {
                return false;
            }
        }
    }
    renderResult(){
        if(this.isLogin()){
           return this.renderAuthPassComponent();
        }
        else {
            return this.renderAuthFailComponent();

        }
    }
    renderAuthPassComponent(){
        return(
            <div>
                {this.props.children}
            </div>

        )

    }
    renderAuthFailComponent(){
        return null;
    }
    render(){
        return(
            <div>
                <div className="lefter">
                    <div className="logo"><a href="/AdminManage/AdminPage/Default.aspx" target="_blank">
                        <img src="/common/libs/images/logo.png" alt="后台管理系统" /></a></div>
                </div>
                <TopNavMenu/>
                <LeftNavMenu/>
                <div className="admin">

                    {this.renderResult()}

                    <br />
                    <p className="text-right text-gray">React</p>
                </div>


            </div>
        )
    }
}




