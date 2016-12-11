/**
 * Created by xiaoduan on 2016/11/8.
 */
import * as React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import {Link} from 'react-router';
import {RoutesPath} from '../../redux/actions/system/routesPath';
import {PromiseState, PromiseStatus} from "../../utils/redux";
import {CurrentMenu} from "../../model/menu/currentMenu";
import {connect} from 'react-redux';
import {IMenuIndexStore} from "../../redux/reducers/menu/menuIndex";
import * as MenuIndexActions from 'redux/actions/menu/menuIndex';
import Dispatch = Redux.Dispatch;
interface ILeftNavMenuStateProps{
    currentMenu?:PromiseState<CurrentMenu>;
}

interface ILeftNavMenuDispatchProps{
    onGetCurrentMenu?:()=>void;
}
interface ILeftNavMenuProps{

}

@connect<ILeftNavMenuStateProps,ILeftNavMenuDispatchProps,ILeftNavMenuProps>(
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
export default class LeftNavMenu extends React.Component<ILeftNavMenuStateProps&ILeftNavMenuDispatchProps&ILeftNavMenuProps,any>{
    private menu=[
        {
            title:RoutesPath.menu.blog.title,
            key:RoutesPath.menu.blog.key,
            icon:'bars',
            items:[
                {title:RoutesPath.menu.blog.children.cate.title,key:RoutesPath.menu.blog.children.cate.key},
                {title:RoutesPath.menu.blog.children.tag.title,key:RoutesPath.menu.blog.children.tag.key},
                {title:RoutesPath.menu.blog.children.addContent.title,key:RoutesPath.menu.blog.children.addContent.key},
                {title:RoutesPath.menu.blog.children.contentList.title,key:RoutesPath.menu.blog.children.contentList.key}
            ]
        }
    ];
    constructor(props,context){
        super(props,context);
        this.state={
            current: '1',
            openKeys: [],
        }
    }
   /* static defaultPros={
        menuList:menu
    };*/
    componentDidMount(){
         this.props.onGetCurrentMenu();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.currentMenu.data&&nextProps.currentMenu.status===PromiseStatus.Loaded){
            this.setState({
                current:nextProps.currentMenu.data.key,
                openKeys: [nextProps.currentMenu.data.parentKey],
            });//当前菜单选中状态 receive this state only use once
        }
    }
    handleClick(e) {
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1),
        });
    }
    onToggle(info) {
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
        });
    }
    renderMenuList(list){
        const self=this;
        return list.map(function (item) {
            if (item.items && item.items.length) {
                let icon = item.icon ? (<Icon type={item.icon} />) : '';
                return (
                    <Menu.SubMenu className="sider-ls" key={item.key} title={<span>{icon}<span>{item.title}</span></span>}>
                        {
                            self.renderMenuList(item.items)
                        }
                    </Menu.SubMenu>
                )
            } else {
                return (
                    <Menu.Item className="sider-item" key={item.key}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            }
        });
    }
    render(){
        return(
                <div className="admin1">

                    <Menu onClick={this.handleClick.bind(this)}
                          style={{ width: 179 }}
                          openKeys={this.state.openKeys}
                          onOpen={this.onToggle.bind(this)}
                          onClose={this.onToggle.bind(this)}
                          selectedKeys={[this.state.current]}
                          mode="inline"
                    >
                        {this.renderMenuList(this.menu)}
                    </Menu>

                </div>
        )
    }
}