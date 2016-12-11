import * as React from 'react';
import { RoutesPath } from "../../../redux/actions/system/routesPath";
import SetCurrentMenu from "menu/SetCurrentMenu";
import { VRow } from "../../../component/layout/VRow";
import { VCol } from "../../../component/layout/VCol";
import GenericComponent from "../../../component/abstract/GenericComponent";
import ContentPageListContainer from "./ContentPageListContainer";
export default class ContentList extends GenericComponent {
    constructor(props) {
        super(props);
        this.baseCls = 'cate';
        this.currentMenu = {
            key: RoutesPath.menu.blog.children.contentList.key,
            path: RoutesPath.menu.blog.children.contentList.key,
            title: RoutesPath.menu.blog.children.contentList.title,
            parentTitle: RoutesPath.menu.blog.title,
            parentKey: RoutesPath.menu.blog.key
        };
    }
    componentWillReceiveProps(nextProps) {
    }
    render() {
        return (React.createElement("div", {className: "panel"}, React.createElement(SetCurrentMenu, {currentMenu: this.currentMenu}), React.createElement("div", {className: "panel-head"}, React.createElement(VRow, {type: "flex", justify: 'start'}, React.createElement(VCol, null, React.createElement("strong", null, "内容信息")), React.createElement(VCol, null))), React.createElement("div", {className: "padding border-bottom"}, React.createElement(ContentPageListContainer, null))));
    }
}
