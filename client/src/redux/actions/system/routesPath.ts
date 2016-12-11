/**
 * Created by xiaoduan on 2016/11/16.
 */
import {push} from "route";
export module RoutesPath{

    export const RoutePath = {
        blogCate: ()=>'/admin/cate',
        blogTag:()=>'/admin/tag',
        blogAddContent:()=>'/admin/content/add',
        blogContentList:()=>'/admin/content/list',
        userLogin:()=>'/user/login',
        userReg:()=>'/user/reg',
        oldUserReg:()=>'/user/old/reg',
        adminIndex:()=>'/admin/index',
        notFound:()=>'/404',
        wareSearch: (keyWord:string)=>`/ware/search/${keyWord}`
    };
    export let menu={
        blog:
        {
            title:'MyBlog',
            key:'blog',
            children: {
                 cate: {title:'分类信息',key:RoutePath.blogCate()},
                 tag: {title:'标签信息',key:RoutePath.blogTag()},
                 addContent:{title:'发布信息',key:RoutePath.blogAddContent()},
                 contentList:{title:'信息列表',key:RoutePath.blogContentList()}
                }

        }
    };
    export function  goUserLogin(){
        return push(RoutePath.userLogin());
    }
    export function goAdminManageCate(){
        return push(RoutePath.blogCate());
    }

}