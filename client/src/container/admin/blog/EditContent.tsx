/**
 * Created by DuanG on 2016/11/29.
 */

import * as React from 'react';
import {connect} from 'react-redux';
import {CurrentMenu} from "../../../model/menu/currentMenu";
import {RoutesPath} from "../../../redux/actions/system/routesPath";
import SetCurrentMenu from "../menu/SetCurrentMenu";
import {VRow} from "../../../component/layout/VRow";
import {VCol} from "../../../component/layout/VCol";
import VButton from "../../../component/common/VButton";
import {FilterForm} from "../../../component/form/CreateFormFactory";
import {getEditContentFormFilterProps} from "./form/EditContentFormFilter";
import 'css/content.less';
import {CateTableEntity} from "../../../model/blog/cateTableEntity";
import {PromiseState} from "../../../utils/redux";
import {IBlogIndexStore} from "../../../redux/reducers/blog/blogIndex";
import Dispatch = Redux.Dispatch;
import * as BlogIndexActions from '../../../redux/actions/blog/blogIndex';
import {ContentEntity} from "../../../model/blog/ContentEntity";
import {SuccessEntity, SuccessPageEntity} from "../../../model/common/successEntity";

interface IEditContentStateProps{
    pageListCate?:PromiseState<CateTableEntity>;
    submitFormResult?:PromiseState<SuccessPageEntity>;
}

interface IEditContentDispatchProps{
    onGetPageListCate?:(page:number,queryParams?:{},sortParams?:{})=>void;
    onAddContent?:(info:ContentEntity)=>void;
}

interface IEditContentProps{

}

export interface IEditContentFormProps extends IEditContentStateProps,IEditContentDispatchProps{
    
}

@connect<IEditContentStateProps,IEditContentDispatchProps,IEditContentProps>(
    (state:IBlogIndexStore)=>{
        return{
            pageListCate:state.blogIndex.pageListCate,
            submitFormResult:state.blogIndex.submitFormResult
        }
    },
    (dispatch:Dispatch)=>{
        return{
            onGetPageListCate:(page:number,queryParams?:{},sortParams?:{})=>dispatch(BlogIndexActions.getPageListCate(page,queryParams,sortParams)),
            onAddContent:(info:ContentEntity)=>dispatch(BlogIndexActions.addContent(info))
        }
    }
)

export default class EditContent extends React.Component<IEditContentStateProps&IEditContentDispatchProps&IEditContentProps,void>{
    private baseCls='content';
    private currentMenu:CurrentMenu={
        key:RoutesPath.menu.blog.children.addContent.key,
        path:RoutesPath.menu.blog.children.addContent.key,
        title:RoutesPath.menu.blog.children.addContent.title,
        parentTitle:RoutesPath.menu.blog.title,
        parentKey:RoutesPath.menu.blog.key
    }
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.onGetPageListCate(1);
    }
    render(){
        return(
            <div className="panel">
                <SetCurrentMenu currentMenu={this.currentMenu}/>
                <div className="panel-head">
                    <VRow type="flex" justify='start'>
                        <VCol >
                            <strong>发布信息</strong>
                        </VCol>

                    </VRow>

                </div>
                <div className="padding border-bottom">
                    <VRow type="flex" justify='start'>
                        <VCol span={22} push={1}>
                            <FilterForm controls={getEditContentFormFilterProps(this.props)}></FilterForm>
                        </VCol>
                    </VRow>
                    
                </div>

            </div>
        )
    }
}