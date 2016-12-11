import { push } from "route";
export var RoutesPath;
(function (RoutesPath) {
    RoutesPath.RoutePath = {
        blogCate: () => '/admin/cate',
        blogTag: () => '/admin/tag',
        blogAddContent: () => '/admin/content/add',
        blogContentList: () => '/admin/content/list',
        userLogin: () => '/user/login',
        userReg: () => '/user/reg',
        oldUserReg: () => '/user/old/reg',
        adminIndex: () => '/admin/index',
        notFound: () => '/404',
        wareSearch: (keyWord) => `/ware/search/${keyWord}`
    };
    RoutesPath.menu = {
        blog: {
            title: 'MyBlog',
            key: 'blog',
            children: {
                cate: { title: '分类信息', key: RoutesPath.RoutePath.blogCate() },
                tag: { title: '标签信息', key: RoutesPath.RoutePath.blogTag() },
                addContent: { title: '发布信息', key: RoutesPath.RoutePath.blogAddContent() },
                contentList: { title: '信息列表', key: RoutesPath.RoutePath.blogContentList() }
            }
        }
    };
    function goUserLogin() {
        return push(RoutesPath.RoutePath.userLogin());
    }
    RoutesPath.goUserLogin = goUserLogin;
    function goAdminManageCate() {
        return push(RoutesPath.RoutePath.blogCate());
    }
    RoutesPath.goAdminManageCate = goAdminManageCate;
})(RoutesPath || (RoutesPath = {}));
