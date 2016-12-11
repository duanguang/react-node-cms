import * as React from 'react';
import { FilterForm } from "../../../component/form/CreateFormFactory";
import { getEditCateFromFilterProps } from "./form/editCateFormFilter";
import VModal from "../../../component/common/VModal";
import VButton from "../../../component/common/VButton";
export default class EditCateModal extends React.Component {
    render() {
        const { editCateModalVisibility, onCancelModalClick } = this.props;
        return (React.createElement(VModal, {className: '11', title: "编辑分类信息", handleCancel: onCancelModalClick, visible: editCateModalVisibility, footer: [
            React.createElement(VButton, {key: "back", type: "ghost", size: "large", onClick: onCancelModalClick}, "取消")
        ]}, React.createElement(FilterForm, {controls: getEditCateFromFilterProps(this.props)})));
    }
}
