/**
 * Created by xiaoduan on 2016/11/23.
 */
import {PromiseState, promiseReducer, IPromiseAction, PromiseStatus} from "../../../utils/redux";
import {combineReducers} from "redux";
import {SuccessEntity, SuccessPageEntity} from "../../../model/common/successEntity";
import * as ActionTypes from 'redux/actions/blog/blogIndex';
import {CateTableEntity} from "../../../model/blog/cateTableEntity";
import {StateEnumResult} from "../../../model/common/commonResult";
import IActionGeneric = Redux.IActionGeneric;
import {ContentTableEntity} from "../../../model/blog/ContentEntity";
export interface IBlogIndexStore{
    blogIndex:IBlogIndexReducer;
}

export interface IBlogIndexReducer{
    editCateResult:PromiseState<SuccessPageEntity>;
    pageListCate:PromiseState<CateTableEntity>;
    handleCateType:'add'|'delete'|string;
    submitFormResult:PromiseState<SuccessPageEntity>;
    pageListContent:PromiseState<ContentTableEntity>;
}

const initState:IBlogIndexReducer={
    editCateResult:new PromiseState<SuccessPageEntity>(),
    pageListCate:new PromiseState<CateTableEntity>(),
    handleCateType:'',
    submitFormResult:new PromiseState<SuccessPageEntity>(),
    pageListContent:new PromiseState<ContentTableEntity>()
}

function editCateResult(state:PromiseState<SuccessPageEntity>=initState.editCateResult,action:IPromiseAction<string,SuccessPageEntity>):PromiseState<SuccessPageEntity>{
    let newEditResult=null;
    switch(action.type){
        case ActionTypes.EDIT_CATE.REQUEST:
            newEditResult=new PromiseState<SuccessPageEntity>(PromiseStatus.Loading);
            break;
        case ActionTypes.EDIT_CATE.SUCCESS:
            newEditResult=state.success(action.payload);
            break;
        case ActionTypes.EDIT_CATE.FAIL:
            newEditResult=state.fail(action.error);
            break;
    }
    if(!newEditResult){
        return state;
    }
    return newEditResult;
}

function submitFormResult(state:PromiseState<SuccessPageEntity>=initState.submitFormResult,action:IPromiseAction<string,SuccessPageEntity>):PromiseState<SuccessPageEntity>{
    let newResult=null;
    switch (action.type){
        case ActionTypes.SUBMIT_FORM_RESULT.REQUEST:
            newResult=new PromiseState<SuccessPageEntity>(PromiseStatus.Loading);
            break;
        case ActionTypes.SUBMIT_FORM_RESULT.SUCCESS:
            newResult=state.success(action.payload);
            break;
        case ActionTypes.SUBMIT_FORM_RESULT.FAIL:
            newResult=state.fail(action.error);
            break;
    }
    if(!newResult){
        return state;
    }
    return newResult;
}

function pageListCate(state:PromiseState<CateTableEntity>=initState.pageListCate,action:IPromiseAction<string,CateTableEntity>):PromiseState<CateTableEntity>{
    let newPageListCate=null;
    switch(action.type){
        case ActionTypes.GET_PAGE_LIST_CATE.REQUEST:
            newPageListCate=new PromiseState<CateTableEntity>(PromiseStatus.Loading);
            break;
        case ActionTypes.GET_PAGE_LIST_CATE.SUCCESS:
            newPageListCate=state.success(action.payload);
            break;
        case ActionTypes.EDIT_CATE.SUCCESS:
            let result:any=action.payload;
            if(result.state===StateEnumResult.Success){
                newPageListCate=initState.pageListCate;
            }
            break;
        case ActionTypes.GET_PAGE_LIST_CATE.FAIL:
            newPageListCate=state.fail(action.error);
            break;
    }
    if(!newPageListCate){
        return state;
    }
    return newPageListCate;
}

function pageListContent(state:PromiseState<ContentTableEntity>=initState.pageListContent,action:IPromiseAction<string,ContentTableEntity>):PromiseState<ContentTableEntity>{
    let newPageListContent=null;
    switch(action.type){
        case ActionTypes.GET_PAGE_LIST_CONTENT.REQUEST:
            newPageListContent=new PromiseState<ContentTableEntity>(PromiseStatus.Loading);
            break;
        case ActionTypes.GET_PAGE_LIST_CONTENT.SUCCESS:
            newPageListContent=state.success(action.payload);
            break;
        case ActionTypes.EDIT_CATE.SUCCESS:
            let result:any=action.payload;
            if(result.state===StateEnumResult.Success){
                newPageListContent=initState.pageListContent;
            }
            break;
        case ActionTypes.GET_PAGE_LIST_CONTENT.FAIL:
            newPageListContent=state.fail(action.error);
            break;
    }
    if(!newPageListContent){
        return state;
    }
    return newPageListContent;
}

function handleCateType(state:string=initState.handleCateType,action:IActionGeneric<string>):string{
    switch (action.type){
        case ActionTypes.CHANGE_HANDLE_CATE_TYPE:
            return action.payload;
        default:
            return state;
    }
}
export default combineReducers({
    editCateResult,
    pageListCate,
    handleCateType,
    submitFormResult,
    pageListContent
})



