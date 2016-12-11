/**
 * Created by xiaoduan on 2016/11/8.
 */
/**
 * Created by xiaoduan on 2016/11/8.
 */
import * as React from 'react';
import {CurrentMenu} from "../../model/menu/currentMenu";
import {PromiseState, PromiseStatus} from "../../utils/redux";
import {connect} from 'react-redux';
import {IMenuIndexStore} from "../../redux/reducers/menu/menuIndex";
import Dispatch = Redux.Dispatch;
import * as MenuIndexActions from 'redux/actions/menu/menuIndex';
interface ITopNavMenuStateProps{
    currentMenu?:PromiseState<CurrentMenu>;
}
interface ITopNavMenuDispatchProps{
    onGetCurrentMenu?:()=>void;
}
interface ITopNavMenuProps{

}
@connect<ITopNavMenuStateProps,ITopNavMenuDispatchProps,ITopNavMenuProps>(
    (state:IMenuIndexStore)=>{
        return{
            currentMenu:state.menuIndex.currentMenu
        }
    },
    (dispatch:Dispatch)=>{
        return{
            onGetCurrentMenu:()=>dispatch(MenuIndexActions.getCurrentMenuProps())
        }
    }
)
export default class TopNavMenu extends React.Component<ITopNavMenuStateProps&ITopNavMenuDispatchProps&ITopNavMenuProps,any>{
    private currentMenu:CurrentMenu=new CurrentMenu();
    constructor(props,context){
        super(props,context);
    }
    componentDidMount(){
         this.props.onGetCurrentMenu();
    }
    render(){
        if(this.props.currentMenu.data && this.props.currentMenu.status === PromiseStatus.Loaded){
            this.currentMenu=this.props.currentMenu.data;
        }
        return(
            <div className="righter nav-navicon" id="admin-nav">
                <div className="mainer">
                    <div className="admin-navbar">
                     <span className="float-right">
            	        <a className="button button-little bg-main" href="#">前台首页 </a>
                        <a className="button button-little bg-yellow" href="/AdminManage/LoginOut">注销登录</a>
                     </span>


                        <ul className="nav nav-inline admin-nav ">

                            <li className="">
                                <a href="/AdminManage/AdminPage/Default.aspx" className="icon-home"> 首页</a>
                            </li>
                            <li className="active">
                                <a href="/Admin/Finance/AdviceList" className="11"> 系统管理</a>
                            </li>

                        </ul>

                       

                    </div>

                    <div className="admin-bread">

                        <span>您好，段先生，欢迎您的光临。</span>
                        <ul className="bread">
                            <li><a href="javaScript;" className="icon-home"> 开始</a></li>
                            <li>{this.currentMenu.parentTitle}</li>
                            <li ><a href="">{this.currentMenu.title}</a></li>
                        </ul>

                    </div>

                </div>
            </div>
        )
    }
}