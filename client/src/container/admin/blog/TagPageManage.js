import * as React from 'react';
import { RoutesPath } from "../../../redux/actions/system/routesPath";
import SetCurrentMenu from "menu/SetCurrentMenu";
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
export default class TagPageManage extends React.Component {
    constructor(props) {
        super(props);
        this.currentMenu = {
            key: RoutesPath.menu.blog.children.tag.key,
            path: RoutesPath.menu.blog.children.tag.key,
            title: RoutesPath.menu.blog.children.tag.title,
            parentTitle: RoutesPath.menu.blog.title,
            parentKey: RoutesPath.menu.blog.key
        };
    }
    componentDidMount() {
        // this.props.onGetCurrentMenu(this.currentMenu);
    }
    render() {
        console.log(this.props);
        return (React.createElement("div", {className: "panel"}, React.createElement(SetCurrentMenu, {currentMenu: this.currentMenu}), React.createElement("div", {className: "panel-head"}, React.createElement("strong", null, "标签信息")), React.createElement("div", {className: "padding border-bottom"})));
    }
}
