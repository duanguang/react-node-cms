import { PromiseActionType, PromiseAction, createAction } from "../../../utils/redux";
import * as blogServices from 'api/blog/blogService';
export const EDIT_CATE = new PromiseActionType('blog/blogIndex/ADD_CATE');
export const GET_PAGE_LIST_CATE = new PromiseActionType('blog/blogIndex/GET_PAGE_LIST_CATE');
export const CHANGE_HANDLE_CATE_TYPE = 'blog/blogIndex/CHANGE_HANDLE_CATE_TYPE';
export const SUBMIT_FORM_RESULT = new PromiseActionType('blog/blogIndex/SUBMIT_FORM_RESULT');
export const GET_PAGE_LIST_CONTENT = new PromiseActionType('blog/blogIndex/GET_PAGE_LIST_CONTENT');
export function addCate(cateName) {
    return (dispatch) => {
        dispatch(new PromiseAction(() => blogServices.addCate(cateName), EDIT_CATE.types));
    };
}
export function editCate(cateName, id) {
    return (dispatch) => {
        dispatch(new PromiseAction(() => blogServices.editCate(cateName, id), EDIT_CATE.types));
    };
}
export function deleteCate(id) {
    return (dispatch) => {
        dispatch(new PromiseAction(() => blogServices.deleteCate(id), EDIT_CATE.types));
    };
}
export function getPageListCate(page, queryParams, sortParams) {
    return (dispatch) => {
        dispatch(new PromiseAction(() => blogServices.getPageListCate(page), GET_PAGE_LIST_CATE.types));
    };
}
export function changeHandleCateType(type) {
    return createAction(CHANGE_HANDLE_CATE_TYPE, type);
}
export function addContent(info) {
    return (dispatch) => {
        dispatch(new PromiseAction(() => blogServices.addContent(info), SUBMIT_FORM_RESULT.types));
    };
}
export function getPageListContent(page, queryParams, sortParams) {
    return (dispatch) => {
        dispatch(new PromiseAction(() => blogServices.getPageListContent(page), GET_PAGE_LIST_CONTENT.types));
    };
}
