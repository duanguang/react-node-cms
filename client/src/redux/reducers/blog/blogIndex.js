import { PromiseState, PromiseStatus } from "../../../utils/redux";
import { combineReducers } from "redux";
import * as ActionTypes from 'redux/actions/blog/blogIndex';
import { StateEnumResult } from "../../../model/common/commonResult";
const initState = {
    editCateResult: new PromiseState(),
    pageListCate: new PromiseState(),
    handleCateType: '',
    submitFormResult: new PromiseState(),
    pageListContent: new PromiseState()
};
function editCateResult(state = initState.editCateResult, action) {
    let newEditResult = null;
    switch (action.type) {
        case ActionTypes.EDIT_CATE.REQUEST:
            newEditResult = new PromiseState(PromiseStatus.Loading);
            break;
        case ActionTypes.EDIT_CATE.SUCCESS:
            newEditResult = state.success(action.payload);
            break;
        case ActionTypes.EDIT_CATE.FAIL:
            newEditResult = state.fail(action.error);
            break;
    }
    if (!newEditResult) {
        return state;
    }
    return newEditResult;
}
function submitFormResult(state = initState.submitFormResult, action) {
    let newResult = null;
    switch (action.type) {
        case ActionTypes.SUBMIT_FORM_RESULT.REQUEST:
            newResult = new PromiseState(PromiseStatus.Loading);
            break;
        case ActionTypes.SUBMIT_FORM_RESULT.SUCCESS:
            newResult = state.success(action.payload);
            break;
        case ActionTypes.SUBMIT_FORM_RESULT.FAIL:
            newResult = state.fail(action.error);
            break;
    }
    if (!newResult) {
        return state;
    }
    return newResult;
}
function pageListCate(state = initState.pageListCate, action) {
    let newPageListCate = null;
    switch (action.type) {
        case ActionTypes.GET_PAGE_LIST_CATE.REQUEST:
            newPageListCate = new PromiseState(PromiseStatus.Loading);
            break;
        case ActionTypes.GET_PAGE_LIST_CATE.SUCCESS:
            newPageListCate = state.success(action.payload);
            break;
        case ActionTypes.EDIT_CATE.SUCCESS:
            let result = action.payload;
            if (result.state === StateEnumResult.Success) {
                newPageListCate = initState.pageListCate;
            }
            break;
        case ActionTypes.GET_PAGE_LIST_CATE.FAIL:
            newPageListCate = state.fail(action.error);
            break;
    }
    if (!newPageListCate) {
        return state;
    }
    return newPageListCate;
}
function pageListContent(state = initState.pageListContent, action) {
    let newPageListContent = null;
    switch (action.type) {
        case ActionTypes.GET_PAGE_LIST_CONTENT.REQUEST:
            newPageListContent = new PromiseState(PromiseStatus.Loading);
            break;
        case ActionTypes.GET_PAGE_LIST_CONTENT.SUCCESS:
            newPageListContent = state.success(action.payload);
            break;
        case ActionTypes.EDIT_CATE.SUCCESS:
            let result = action.payload;
            if (result.state === StateEnumResult.Success) {
                newPageListContent = initState.pageListContent;
            }
            break;
        case ActionTypes.GET_PAGE_LIST_CONTENT.FAIL:
            newPageListContent = state.fail(action.error);
            break;
    }
    if (!newPageListContent) {
        return state;
    }
    return newPageListContent;
}
function handleCateType(state = initState.handleCateType, action) {
    switch (action.type) {
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
});
