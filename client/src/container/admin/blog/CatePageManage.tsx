/**
 * Created by xiaoduan on 2016/11/20.
 */
import * as React from 'react';
import {PromiseState, PromiseStatus} from "../../../utils/redux";
import {connect} from 'react-redux';
import Dispatch = Redux.Dispatch;
import * as BlogIndexActions from '../../../redux/actions/blog/blogIndex';
import {RoutesPath} from "../../../redux/actions/system/routesPath";
import SetCurrentMenu from "menu/SetCurrentMenu";
import {VRow} from "../../../component/layout/VRow";
import {VCol} from "../../../component/layout/VCol";
import VButton from "../../../component/common/VButton";
import 'css/cate.less';
import EditCateModal from "./EditCateModal";
import {SuccessEntity, SuccessPageEntity} from "../../../model/common/successEntity";
import {IBlogIndexStore} from "../../../redux/reducers/blog/blogIndex";
import {CurrentMenu} from "../../../model/menu/currentMenu";
import GenericComponent from "../../../component/abstract/GenericComponent";
import {StateEnumResult} from "../../../model/common/commonResult";
import {ErrorPageEntity} from "../../../model/common/errorEntity";
import {CateTableEntity, CateEntity} from "../../../model/blog/cateTableEntity";
import CateTablePageContainer from "./CateTablePageContainer";

interface ICatePageManageStateProps{
    editCateResult?:PromiseState<SuccessPageEntity>;
}

interface ICatePageManageDispatchProps{
    onAddCate?:(cateName:string)=>void;
    onDelete?:(id:string)=>void;
    onEditCate?:(cateName:string,id:string)=>void;
    onChangeHandleCateType?:(type:string)=>void;
}
interface ICatePageManageProps{

}

interface ICatePageManageState{
    editCateModal:{
        visible:boolean,
        cateEntity?: CateEntity
    }
}
@connect<ICatePageManageStateProps,ICatePageManageDispatchProps,ICatePageManageProps>(
    (state:IBlogIndexStore)=>{
        return{
            editCateResult:state.blogIndex.editCateResult
        }
    },
    (dispatch:Dispatch)=>{
        return{
            onAddCate:(cateName:string)=>dispatch(BlogIndexActions.addCate(cateName)),
            onDelete:(id:string)=>dispatch(BlogIndexActions.deleteCate(id)),
            onEditCate:(cateName:string,id:string)=>dispatch(BlogIndexActions.editCate(cateName,id)),
            onChangeHandleCateType:(type:'add'|'delete')=>dispatch(BlogIndexActions.changeHandleCateType(type))
        }
    }
)
export default class CatePageManage extends GenericComponent<ICatePageManageStateProps&ICatePageManageDispatchProps&ICatePageManageProps,ICatePageManageState>{
    private baseCls='cate';
    private currentMenu:CurrentMenu={
        key:RoutesPath.menu.blog.children.cate.key,
        path:RoutesPath.menu.blog.children.cate.key,
        title:RoutesPath.menu.blog.children.cate.title,
        parentTitle:RoutesPath.menu.blog.title,
        parentKey:RoutesPath.menu.blog.key
    }
    constructor(props){
        super(props);
        this.handleEditCateClick=this.handleEditCateClick.bind(this);
        this.editModalEvent.handleCancel=this.editModalEvent.handleCancel.bind(this);
        this.state={
            editCateModal:{
                visible:false
            }
        }
    }
    handleEditCateClick(){
        this.setState({
            editCateModal:{
                cateEntity: null,
                visible: true
            }
        })
    }

    private editModalEvent={
        handleCancel:()=>{
            this.setState({
                editCateModal:{
                    visible: false
                }
            })
        },
        handleAddCate:(cateName:string)=>{
            this.props.onAddCate(cateName);
            this.props.onChangeHandleCateType('add');
        },
        handleEditCate:(cateName:string,id:string)=>{
            this.props.onEditCate(cateName,id);
        },
        handleDeleteCate:(id:string)=>{
            this.props.onDelete(id);
            this.props.onChangeHandleCateType('delete');
        }
    }

    private cateTableEvent={
        onEdit:(cateTableEntity:CateEntity)=>{
            this.setState({
                editCateModal:{
                    cateEntity: cateTableEntity,
                    visible: true
                }
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.editCateResult!=nextProps.editCateResult&&nextProps.editCateResult.status===PromiseStatus.Loaded){
            if(nextProps.editCateResult.data.state==StateEnumResult.Success){
                super.showSuccessMessage(nextProps.editCateResult.data.data.message);
            }else if(nextProps.editCateResult.data.state==StateEnumResult.Error){
                let errorInfo:ErrorPageEntity=nextProps.editCateResult.data;
                super.showErrorMessage(errorInfo.data.message);
            }
        }
    }
    render(){
        const {editCateModal} = this.state;
        const {editModalEvent,cateTableEvent} = this;

        return(
            <div className="panel">
                <SetCurrentMenu currentMenu={this.currentMenu}/>
                <div className="panel-head">
                    <VRow type="flex" justify='start'>
                        <VCol >
                          <VButton type='dashed' className={`${this.baseCls}-btnNoBorder`}>
                              <strong>分类信息</strong>
                          </VButton>
                        </VCol>
                        <VCol>
                            <VButton onClick={this.handleEditCateClick}>增加</VButton>
                        </VCol>

                    </VRow>

                </div>
                <div className="padding border-bottom">
                   <CateTablePageContainer
                       onEdit={cateTableEvent.onEdit}
                       onDelete={editModalEvent.handleDeleteCate}
                   >
                   </CateTablePageContainer>

                    {
                        editCateModal.visible &&
                            (
                              <EditCateModal
                                  onAddCateClick={editModalEvent.handleAddCate}
                                  onEditCateClick={editModalEvent.handleEditCate}
                                  onCancelModalClick={editModalEvent.handleCancel}
                                  editCateModalVisibility={editCateModal.visible}
                                  cateEntity={editCateModal.cateEntity}
                               />
                            )
                        }
                </div>

            </div>
        )
    }
}