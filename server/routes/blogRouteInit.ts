/**
 * Created by DuanG on 2016/11/23.
 */
import {app} from './app';

export let blogRouteInit=()=>{
    app.get('/blog/GetPageCateList',require('../api/user/blogControl'));
    app.get('/blog/GetContentPageList', require('../api/user/blogControl'));
    app.get('/blog/deleteCate', require('../api/user/blogControl'));
    app.post('/blog/addCate', require('../api/user/blogControl'));
    app.post('/blog/editCate', require('../api/user/blogControl'));
    app.post('/blog/addContent', require('../api/user/blogControl'));
}