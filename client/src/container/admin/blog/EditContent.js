/**
 * Created by DuanG on 2016/11/29.
 */
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
import { connect } from 'react-redux';
import { RoutesPath } from "../../../redux/actions/system/routesPath";
import SetCurrentMenu from "../menu/SetCurrentMenu";
import { VRow } from "../../../component/layout/VRow";
import { VCol } from "../../../component/layout/VCol";
import { FilterForm } from "../../../component/form/CreateFormFactory";
import { getEditContentFormFilterProps } from "./form/EditContentFormFilter";
import 'css/content.less';
import * as BlogIndexActions from '../../../redux/actions/blog/blogIndex';
let EditContent = class EditContent extends React.Component {
    constructor(props) {
        super(props);
        this.baseCls = 'content';
        this.currentMenu = {
            key: RoutesPath.menu.blog.children.addContent.key,
            path: RoutesPath.menu.blog.children.addContent.key,
            title: RoutesPath.menu.blog.children.addContent.title,
            parentTitle: RoutesPath.menu.blog.title,
            parentKey: RoutesPath.menu.blog.key
        };
    }
    componentDidMount() {
        this.props.onGetPageListCate(1);
    }
    render() {
        return (React.createElement("div", {className: "panel"}, React.createElement(SetCurrentMenu, {currentMenu: this.currentMenu}), React.createElement("div", {className: "panel-head"}, React.createElement(VRow, {type: "flex", justify: 'start'}, React.createElement(VCol, null, React.createElement("strong", null, "发布信息")))), React.createElement("div", {className: "padding border-bottom"}, React.createElement(VRow, {type: "flex", justify: 'start'}, React.createElement(VCol, {span: 22, push: 1}, React.createElement(FilterForm, {controls: getEditContentFormFilterProps(this.props)}))))));
    }
};
EditContent = __decorate([
    connect((state) => {
        return {
            pageListCate: state.blogIndex.pageListCate,
            submitFormResult: state.blogIndex.submitFormResult
        };
    }, (dispatch) => {
        return {
            onGetPageListCate: (page, queryParams, sortParams) => dispatch(BlogIndexActions.getPageListCate(page, queryParams, sortParams)),
            onAddContent: (info) => dispatch(BlogIndexActions.addContent(info))
        };
    }), 
    __metadata('design:paramtypes', [Object])
], EditContent);
export default EditContent;
