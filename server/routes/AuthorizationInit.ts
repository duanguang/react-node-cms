/**
 * Created by DuanG on 2016/11/23.
 */
import {app} from './app';
import {requireAuthorization} from "../api/Authorization/requireAuthorization";
import {blogRouteInit} from "./blogRouteInit";
export let AuthorizationInit=()=>{
    app.use(requireAuthorization);
    blogRouteInit();
}