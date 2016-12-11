
/**
 * Created by DuanG on 2016/11/24.
 */
import {PromiseActionType, PromiseAction, createAction} from "../../../utils/redux";
import {SuccessEntity, SuccessPageEntity} from "../../../model/common/successEntity";
import * as blogServices from 'api/blog/blogService';
import {CateTableEntity} from "../../../model/blog/cateTableEntity";
import {ContentEntity, ContentTableEntity} from "../../../model/blog/ContentEntity";
export const EDIT_CATE=new PromiseActionType('blog/blogIndex/ADD_CATE');
export const GET_PAGE_LIST_CATE=new PromiseActionType('blog/blogIndex/GET_PAGE_LIST_CATE');
export const CHANGE_HANDLE_CATE_TYPE='blog/blogIndex/CHANGE_HANDLE_CATE_TYPE';
export const SUBMIT_FORM_RESULT=new PromiseActionType('blog/blogIndex/SUBMIT_FORM_RESULT');
export const GET_PAGE_LIST_CONTENT=new PromiseActionType('blog/blogIndex/GET_PAGE_LIST_CONTENT');

export function addCate(cateName:string){
      return(dispatch)=>{
          dispatch(new PromiseAction<void,SuccessPageEntity>(
              ()=>blogServices.addCate(cateName),
              EDIT_CATE.types
          ))
      }
}

export function editCate(cateName:string,id:string){
     return(dispatch)=>{
         dispatch(new PromiseAction<void,SuccessEntity>(
             ()=>blogServices.editCate(cateName,id),
             EDIT_CATE.types
         ))
     }
}

export function deleteCate(id:string){
    return(dispatch)=>{
        dispatch(new PromiseAction<void,SuccessEntity>(
            ()=>blogServices.deleteCate(id),
            EDIT_CATE.types
        ))
    }
}

export function getPageListCate(page:number,queryParams?:{},sortParams?:{}){
    return(dispatch)=>{
        dispatch(new PromiseAction<void,CateTableEntity>(
            ()=>blogServices.getPageListCate(page),
            GET_PAGE_LIST_CATE.types
        ))
    }
}

export function changeHandleCateType(type:string){
    return createAction(CHANGE_HANDLE_CATE_TYPE,type);
}

export function addContent(info:ContentEntity){
    return(dispatch)=>{
        dispatch(new PromiseAction<void,SuccessEntity>(
            ()=>blogServices.addContent(info),
            SUBMIT_FORM_RESULT.types
        ))
    }
}

export function getPageListContent(page:number,queryParams?:{},sortParams?:{}){
    return(dispatch)=>{
        dispatch(new PromiseAction<void,ContentTableEntity>(
            ()=>blogServices.getPageListContent(page),
            GET_PAGE_LIST_CONTENT.types
        ))
    }
}