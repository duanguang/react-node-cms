/**
 * Created by DuanG on 2016/8/24.
 */
import * as React from 'react';
import {UserRegistInfo} from '../../../model/userRegistInfo';
import {connect} from 'react-redux';
import {FilterForm} from '../../../component/form/CreateFormFactory';
import {PromiseState, PromiseStatus} from '../../../utils/redux';
import {ResponseOuterModel} from '../../../model/common/commonResult';
import * as UserIndexActions from '../../../redux/actions/user/userIndex'

import {Dispatch} from "redux";
import {RouteComponentProps} from "react-router";
import {IUserIndexStore} from "../../../redux/reducers/user/userIndex";
import {ModalMessage, IModalMessageProps} from "../../../component/modal/ModalMessage";
import {Link} from 'react-router';
import './css/regist.less';
import {getRegistFromFilterProps, registFormBaseCls} from "form/registFormFilter";
import GenericComponent from "../../../component/abstract/GenericComponent";


interface IRegistUserStateProps{
    registUserResult?:PromiseState<ResponseOuterModel>;
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
export default class RegistUser extends GenericComponent<IRegistUserStateProps & IRegistDispatchUserProps & IRegistUserProps,any> {
    constructor(props) {
        super(props);
        // this.state=initState;
    }

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
                // this.props.modalSuccess(result.Message,'该帐号已被注册过，请重新输入新的帐号注册');
                this.props.modalWarning(result.Message,'该帐号已被注册过，请重新输入新的帐号注册');
            }
            else {
                this.props.modalSuccess(result,'恭喜您，注册成功，可使用帐号密码登录');
            }
        }
    }
    render() {
        return (
            <div className={registFormBaseCls}>
                <div className="form-signin">
                    <div className="form-signin-heading text-center">
                        <h1 className="sign-title">user regist</h1>
                        <img src="/common/libs/images/logo.png" alt=""/>
                    </div>
                    <div className="login-wrap">
                        <p>请填写您的个人信息</p>
                        <FilterForm controls={getRegistFromFilterProps(this.props)}></FilterForm>
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
