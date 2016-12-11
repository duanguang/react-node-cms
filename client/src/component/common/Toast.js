import "./css/toast.less";
import * as React from "react";
import Icon from "./Icon";
import Mask from "./Mask";
export default class Toast extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { icon, show, children, iconSize } = this.props;
        return (React.createElement("div", {className: icon === 'loading' ? 'weui_loading_toast' : '', style: { display: show ? 'block' : 'none' }}, React.createElement(Mask, {transparent: true}), React.createElement("div", {className: "weui_toast"}, React.createElement(Icon, {value: icon, size: iconSize}), React.createElement("p", {className: "weui_toast_content"}, children))));
    }
}
Toast.defaultProps = {
    icon: 'toast',
    show: false,
};
