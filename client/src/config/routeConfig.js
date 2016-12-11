import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, hashHistory, IndexRoute, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { WXRouter } from 'utils/route';
import App from 'container/common/App';
import UserLogin from "container/admin/user/UserLogin";
import UserIndex from "container/admin/user/UserIndex";
import AdminManage from "container/admin/AdminManage";
import Overview from 'container/common/Overview';
import NotFound from "../component/common/NotFound";
import { store } from "../store/index";
import TagPageManage from "../container/admin/blog/TagPageManage";
import CatePageManage from "../container/admin/blog/CatePageManage";
import ContentList from "../container/admin/blog/ContentList";
import { RoutesPath } from 'redux/actions/system/routesPath';
var RoutePath = RoutesPath.RoutePath;
import EditContent from "../container/admin/blog/EditContent";
/**
 * 第二个参数可以设置初始状态。 这对开发同构应用时非常有用，
 * 可以用于把服务器端生成的 state 转变后在浏览器端传给应用
 */
/*const store = configureStore({});*/
const history = syncHistoryWithStore(hashHistory, store);
if (__DEV__) {
    React.__spread = Object.assign = require('object-assign');
}
export const routes = (React.createElement(Provider, {store: store}, React.createElement(WXRouter, {history: history}, React.createElement(Route, {path: "/", component: App}, React.createElement(IndexRoute, {title: "概览", component: Overview}), React.createElement(Route, {path: RoutePath.userLogin(), title: "开发中-登录", component: UserLogin}), React.createElement(Route, {path: RoutePath.userReg(), title: "开发中-注册", component: UserIndex}), React.createElement(Route, {path: RoutePath.adminIndex(), title: "开发中-主页面", component: AdminManage}, React.createElement(Route, {path: RoutePath.blogCate(), title: "开发中-分类信息", component: CatePageManage}), React.createElement(Route, {path: RoutePath.blogTag(), title: "开发中-标签信息", component: TagPageManage}), React.createElement(Route, {path: RoutePath.blogAddContent(), title: "开发中-发布信息", component: EditContent}), React.createElement(Route, {path: RoutePath.blogContentList(), title: "开发中-发布信息", component: ContentList})), React.createElement(Route, {path: RoutePath.notFound(), component: NotFound, title: "对不起，您访问的页面不存在"}), React.createElement(Redirect, {from: '*', to: RoutePath.notFound()})))));
