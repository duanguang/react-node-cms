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
import { PromiseStatus } from "../../../utils/redux";
import { connect } from 'react-redux';
import * as BlogIndexActions from '../../../redux/actions/blog/blogIndex';
import { RoutesPath } from "../../../redux/actions/system/routesPath";
import SetCurrentMenu from "menu/SetCurrentMenu";
import { VRow } from "../../../component/layout/VRow";
import { VCol } from "../../../component/layout/VCol";
import VButton from "../../../component/common/VButton";
import 'css/cate.less';
import EditCateModal from "./EditCateModal";
import GenericComponent from "../../../component/abstract/GenericComponent";
import { StateEnumResult } from "../../../model/common/commonResult";
import CateTablePageContainer from "./CateTablePageContainer";
let CatePageManage = class CatePageManage extends GenericComponent {
    constructor(props) {
        super(props);
        this.baseCls = 'cate';
        this.currentMenu = {
            key: RoutesPath.menu.blog.children.cate.key,
            path: RoutesPath.menu.blog.children.cate.key,
            title: RoutesPath.menu.blog.children.cate.title,
            parentTitle: RoutesPath.menu.blog.title,
            parentKey: RoutesPath.menu.blog.key
        };
        this.editModalEvent = {
            handleCancel: () => {
                this.setState({
                    editCateModal: {
                        visible: false
                    }
                });
            },
            handleAddCate: (cateName) => {
                this.props.onAddCate(cateName);
                this.props.onChangeHandleCateType('add');
            },
            handleEditCate: (cateName, id) => {
                this.props.onEditCate(cateName, id);
            },
            handleDeleteCate: (id) => {
                this.props.onDelete(id);
                this.props.onChangeHandleCateType('delete');
            }
        };
        this.cateTableEvent = {
            onEdit: (cateTableEntity) => {
                this.setState({
                    editCateModal: {
                        cateEntity: cateTableEntity,
                        visible: true
                    }
                });
            }
        };
        this.handleEditCateClick = this.handleEditCateClick.bind(this);
        this.editModalEvent.handleCancel = this.editModalEvent.handleCancel.bind(this);
        this.state = {
            editCateModal: {
                visible: false
            }
        };
    }
    handleEditCateClick() {
        this.setState({
            editCateModal: {
                cateEntity: null,
                visible: true
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.editCateResult != nextProps.editCateResult && nextProps.editCateResult.status === PromiseStatus.Loaded) {
            if (nextProps.editCateResult.data.state == StateEnumResult.Success) {
                super.showSuccessMessage(nextProps.editCateResult.data.data.message);
            }
            else if (nextProps.editCateResult.data.state == StateEnumResult.Error) {
                let errorInfo = nextProps.editCateResult.data;
                super.showErrorMessage(errorInfo.data.message);
            }
        }
    }
    render() {
        const { editCateModal } = this.state;
        const { editModalEvent, cateTableEvent } = this;
        return (React.createElement("div", {className: "panel"}, React.createElement(SetCurrentMenu, {currentMenu: this.currentMenu}), React.createElement("div", {className: "panel-head"}, React.createElement(VRow, {type: "flex", justify: 'start'}, React.createElement(VCol, null, React.createElement(VButton, {type: 'dashed', className: `${this.baseCls}-btnNoBorder`}, React.createElement("strong", null, "分类信息"))), React.createElement(VCol, null, React.createElement(VButton, {onClick: this.handleEditCateClick}, "增加")))), React.createElement("div", {className: "padding border-bottom"}, React.createElement(CateTablePageContainer, {onEdit: cateTableEvent.onEdit, onDelete: editModalEvent.handleDeleteCate}), editCateModal.visible &&
            (React.createElement(EditCateModal, {onAddCateClick: editModalEvent.handleAddCate, onEditCateClick: editModalEvent.handleEditCate, onCancelModalClick: editModalEvent.handleCancel, editCateModalVisibility: editCateModal.visible, cateEntity: editCateModal.cateEntity})))));
    }
};
CatePageManage = __decorate([
    connect((state) => {
        return {
            editCateResult: state.blogIndex.editCateResult
        };
    }, (dispatch) => {
        return {
            onAddCate: (cateName) => dispatch(BlogIndexActions.addCate(cateName)),
            onDelete: (id) => dispatch(BlogIndexActions.deleteCate(id)),
            onEditCate: (cateName, id) => dispatch(BlogIndexActions.editCate(cateName, id)),
            onChangeHandleCateType: (type) => dispatch(BlogIndexActions.changeHandleCateType(type))
        };
    }), 
    __metadata('design:paramtypes', [Object])
], CatePageManage);
export default CatePageManage;
