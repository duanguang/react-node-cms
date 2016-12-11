import * as React from 'react';
import './css/Overview.css';
import { Link } from 'react-router';
import GenericComponent from "../../component/abstract/GenericComponent";
export default class Overview extends GenericComponent {
    constructor(props) {
        super(props);
        this.basCls = `overview`;
    }
    replaceParamPath(path) {
        if (!path) {
            return path;
        }
        return path.replace(/(:.*)/g, "0");
    }
    renderItems() {
        return this.props.routes[0].childRoutes.map((childRoute, index) => {
            console.log(childRoute.path);
            return (React.createElement("li", {className: `${this.basCls}-item`, key: index}, React.createElement(Link, {to: this.replaceParamPath(childRoute.path)}, childRoute['title'])));
        });
    }
    render() {
        return (React.createElement("ul", {className: this.basCls}, this.renderItems()));
    }
}
