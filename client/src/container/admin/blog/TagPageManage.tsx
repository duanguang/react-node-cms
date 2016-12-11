/**
 * Created by xiaoduan on 2016/11/20.
 */
import * as React from 'react';
import {PromiseState} from "../../../utils/redux";
import {CurrentMenu} from "../../../model/menu/currentMenu";
import {connect} from 'react-redux';
import {IMenuIndexStore} from "../../../redux/reducers/menu/menuIndex";
import Dispatch = Redux.Dispatch;
import * as MenuIndexActions from '../../../redux/actions/menu/menuIndex';
import {RoutesPath} from "../../../redux/actions/system/routesPath";
import SetCurrentMenu from "menu/SetCurrentMenu";

interface ITagPageManageStateProps{
    currentMenu:PromiseState<CurrentMenu>;
}

interface ITagPageManageDispatchProps{
    onGetCurrentMenu?:(currentMenu:CurrentMenu)=>void;
}
interface ITagPageManageProps{

}
/*@connect<IMenuListStateProps,IMenuListDispatchProps,IMenuListProps>(
    (state:IMenuIndexStore)=>{
        return{
            currentMenu:state.menuIndex.currentMenu
        }
    },
    (dispatch:Dispatch)=>{
        return{
            onGetCurrentMenu:(currentMenu:CurrentMenu)=>dispatch(MenuIndexActions.getCurrentMenu(currentMenu))
        }
    }
)*/
export default class TagPageManage extends React.Component<ITagPageManageStateProps&ITagPageManageDispatchProps&ITagPageManageProps,void>{
    private currentMenu:CurrentMenu={
        key:RoutesPath.menu.blog.children.tag.key,
        path:RoutesPath.menu.blog.children.tag.key,
        title:RoutesPath.menu.blog.children.tag.title,
        parentTitle:RoutesPath.menu.blog.title,
        parentKey:RoutesPath.menu.blog.key
    }
    constructor(props){
        super(props);
    }
    componentDidMount(){
        // this.props.onGetCurrentMenu(this.currentMenu);
    }
    render(){
        console.log(this.props)
        return(
            <div className="panel">
                <SetCurrentMenu currentMenu={this.currentMenu}/>
                <div className="panel-head"><strong>标签信息</strong></div>
                <div className="padding border-bottom">

                </div>

            </div>
        )
    }
}