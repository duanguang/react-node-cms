/**
 * Created by DuanG on 2016/11/24.
 */
import {get,post} from "../../utils/fetchRequest";
import {SuccessEntity, SuccessPageEntity} from "../../model/common/successEntity";
import {CateTableEntity} from "../../model/blog/cateTableEntity";
import {ContentEntity, ContentTableEntity} from "../../model/blog/ContentEntity";
import {PromiseState} from "../../utils/redux";

export function addCate(cateName:string):Promise<SuccessPageEntity>{
    return post('http://127.0.0.1:3006/blog/addCate',{CateName:cateName},SuccessPageEntity).then((result)=>{
        return result;
    });
}

export function editCate(cateName:string,id:string):Promise<SuccessEntity>{
    return post('http://127.0.0.1:3006/blog/editCate',{cateName:cateName,id:id},SuccessPageEntity).then((result)=>{
        return result;
    })
}

export function deleteCate(id:string):Promise<SuccessEntity>{
    return get('http://127.0.0.1:3006/blog/deleteCate',{id:id},SuccessPageEntity).then((result)=>{
        return result;
    })
}

export function getPageListCate(page:number,queryParams?:{},sortParams?:{}):Promise<CateTableEntity>{
    return get('http://127.0.0.1:3006/blog/GetPageCateList',{page:page},CateTableEntity).then((result)=>{
       return result;
    });
}

export function addContent(info:ContentEntity):Promise<SuccessEntity>{
    return post('http://127.0.0.1:3006/blog/addContent',info,SuccessEntity).then((result)=>{
        return result;
    })
}

export function getPageListContent(page:number,queryParams?:{},sortParams?:{}):Promise<ContentTableEntity>{
    return get('http://127.0.0.1:3006/blog/GetContentPageList',{page:page},ContentTableEntity).then((result)=>{
        console.log(result)
        return result;
    });
}