import { get, post } from "../../utils/fetchRequest";
import { SuccessEntity, SuccessPageEntity } from "../../model/common/successEntity";
import { CateTableEntity } from "../../model/blog/cateTableEntity";
import { ContentTableEntity } from "../../model/blog/ContentEntity";
export function addCate(cateName) {
    return post('http://127.0.0.1:3006/blog/addCate', { CateName: cateName }, SuccessPageEntity).then((result) => {
        return result;
    });
}
export function editCate(cateName, id) {
    return post('http://127.0.0.1:3006/blog/editCate', { cateName: cateName, id: id }, SuccessPageEntity).then((result) => {
        return result;
    });
}
export function deleteCate(id) {
    return get('http://127.0.0.1:3006/blog/deleteCate', { id: id }, SuccessPageEntity).then((result) => {
        return result;
    });
}
export function getPageListCate(page, queryParams, sortParams) {
    return get('http://127.0.0.1:3006/blog/GetPageCateList', { page: page }, CateTableEntity).then((result) => {
        return result;
    });
}
export function addContent(info) {
    return post('http://127.0.0.1:3006/blog/addContent', info, SuccessEntity).then((result) => {
        return result;
    });
}
export function getPageListContent(page, queryParams, sortParams) {
    return get('http://127.0.0.1:3006/blog/GetContentPageList', { page: page }, ContentTableEntity).then((result) => {
        console.log(result);
        return result;
    });
}
