/**
 * Created by xiaoduan on 2016/11/15.
 */
import * as React from 'react';
import { Link } from 'react-router';
import 'css/errorPage.less';
export default class NotFound extends React.Component {
    constructor(...args) {
        super(...args);
        this.basCls = `Error-Page`;
    }
    render() {
        return (React.createElement("div", {className: this.basCls}, React.createElement("section", null, React.createElement("div", {className: `${this.basCls}-container`}, React.createElement("section", {className: "error-wrapper text-center"}, React.createElement("h1", null, React.createElement("img", {alt: "", src: "common/libs/images/404-error.png"})), React.createElement("h2", null, "抱歉！页面无法访问……"), React.createElement("p", null, "可能因为："), React.createElement("h3", null, "网址有错误>请检查地址是否完整或存在多余字符"), React.createElement(Link, {to: 'user-login', className: "back-btn"}, "Back To Login"))))));
    }
}
