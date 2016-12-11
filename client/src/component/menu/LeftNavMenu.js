var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import { Link } from 'react-router';
import { RoutesPath } from '../../redux/actions/system/routesPath';
import { PromiseStatus } from "../../utils/redux";
import { connect } from 'react-redux';
import * as MenuIndexActions from 'redux/actions/menu/menuIndex';
let LeftNavMenu = class LeftNavMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.menu = [
            {
                title: RoutesPath.menu.blog.title,
                key: RoutesPath.menu.blog.key,
                icon: 'bars',
                items: [
                    { title: RoutesPath.menu.blog.children.cate.title, key: RoutesPath.menu.blog.children.cate.key },
                    { title: RoutesPath.menu.blog.children.tag.title, key: RoutesPath.menu.blog.children.tag.key },
                    { title: RoutesPath.menu.blog.children.addContent.title, key: RoutesPath.menu.blog.children.addContent.key },
                    { title: RoutesPath.menu.blog.children.contentList.title, key: RoutesPath.menu.blog.children.contentList.key }
                ]
            }
        ];
        this.state = {
            current: '1',
            openKeys: [],
        };
    }
    /* static defaultPros={
         menuList:menu
     };*/
    componentDidMount() {
        this.props.onGetCurrentMenu();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentMenu.data && nextProps.currentMenu.status === PromiseStatus.Loaded) {
            this.setState({
                current: nextProps.currentMenu.data.key,
                openKeys: [nextProps.currentMenu.data.parentKey],
            }); //当前菜单选中状态 receive this state only use once
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
    renderMenuList(list) {
        const self = this;
        return list.map(function (item) {
            if (item.items && item.items.length) {
                let icon = item.icon ? (React.createElement(Icon, {type: item.icon})) : '';
                return (React.createElement(Menu.SubMenu, {className: "sider-ls", key: item.key, title: React.createElement("span", null, icon, React.createElement("span", null, item.title))}, self.renderMenuList(item.items)));
            }
            else {
                return (React.createElement(Menu.Item, {className: "sider-item", key: item.key}, React.createElement(Link, {to: item.key}, item.title)));
            }
        });
    }
    render() {
        return (React.createElement("div", {className: "admin1"}, React.createElement(Menu, {onClick: this.handleClick.bind(this), style: { width: 179 }, openKeys: this.state.openKeys, onOpen: this.onToggle.bind(this), onClose: this.onToggle.bind(this), selectedKeys: [this.state.current], mode: "inline"}, this.renderMenuList(this.menu))));
    }
};
LeftNavMenu = __decorate([
    connect((state) => {
        return {
            currentMenu: state.menuIndex.currentMenu
        };
    }, (dispatch) => {
        return {
            onGetCurrentMenu: () => dispatch(MenuIndexActions.getCurrentMenuProps())
        };
    }), 
    __metadata('design:paramtypes', [Object, Object])
], LeftNavMenu);
export default LeftNavMenu;
