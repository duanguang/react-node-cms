/**
 * Created by DuanG on 2016/11/21.
 */
import * as React from 'react';
import {FilterForm} from "../../../component/form/CreateFormFactory";
import {getEditCateFromFilterProps} from "./form/editCateFormFilter";
import VModal from "../../../component/common/VModal";
import VButton from "../../../component/common/VButton";
import {CateEntity} from "../../../model/blog/cateTableEntity";

export interface IEditCateModalProps{
    editCateModalVisibility: boolean;
    onCancelModalClick?: ()=>void;
    onAddCateClick?:(cateName:string)=>void;
    onEditCateClick?:(cateName:string,id:string)=>void;
    cateEntity?:CateEntity
}

export default class EditCateModal extends React.Component<IEditCateModalProps,void>{
    render(){
        const { editCateModalVisibility,onCancelModalClick} = this.props;
        return(
            <VModal className={'11'}
                    title="编辑分类信息"
                    handleCancel={onCancelModalClick}
                    visible={editCateModalVisibility}
                    footer={[
                            <VButton key="back" type="ghost" size="large" onClick={onCancelModalClick}>取消</VButton>
                     ]}
            >
             <FilterForm controls={getEditCateFromFilterProps(this.props)}></FilterForm>
            </VModal>
        )

    }
}