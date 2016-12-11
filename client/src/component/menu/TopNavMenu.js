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
import { CurrentMenu } from "../../model/menu/currentMenu";
import { PromiseStatus } from "../../utils/redux";
import { connect } from 'react-redux';
import * as MenuIndexActions from 'redux/actions/menu/menuIndex';
let TopNavMenu = class TopNavMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.currentMenu = new CurrentMenu();
    }
    componentDidMount() {
        this.props.onGetCurrentMenu();
    }
    render() {
        if (this.props.currentMenu.data && this.props.currentMenu.status === PromiseStatus.Loaded) {
            this.currentMenu = this.props.currentMenu.data;
        }
        return (React.createElement("div", {className: "righter nav-navicon", id: "admin-nav"}, React.createElement("div", {className: "mainer"}, React.createElement("div", {className: "admin-navbar"}, React.createElement("span", {className: "float-right"}, React.createElement("a", {className: "button button-little bg-main", href: "#"}, "前台首页 "), React.createElement("a", {className: "button button-little bg-yellow", href: "/AdminManage/LoginOut"}, "注销登录")), React.createElement("ul", {className: "nav nav-inline admin-nav "}, React.createElement("li", {className: ""}, React.createElement("a", {href: "/AdminManage/AdminPage/Default.aspx", className: "icon-home"}, " 首页")), React.createElement("li", {className: "active"}, React.createElement("a", {href: "/Admin/Finance/AdviceList", className: "11"}, " 系统管理")))), React.createElement("div", {className: "admin-bread"}, React.createElement("span", null, "您好，段先生，欢迎您的光临。"), React.createElement("ul", {className: "bread"}, React.createElement("li", null, React.createElement("a", {href: "javaScript;", className: "icon-home"}, " 开始")), React.createElement("li", null, this.currentMenu.parentTitle), React.createElement("li", null, React.createElement("a", {href: ""}, this.currentMenu.title)))))));
    }
};
TopNavMenu = __decorate([
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
], TopNavMenu);
export default TopNavMenu;
