import "../../../public/css/weui_icon_font.less";
import * as React from 'react';
import classNames from "classnames";
export default class Icon extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const { value, size } = this.props;
        const cls = classNames({
            ['weui_icon_' + value]: true,
            weui_icon_msg: size === 'large',
        });
        if (value === 'loading') {
            let icons = [];
            for (let i = 0; i < 12; i++) {
                icons.push(React.createElement("div", {key: i, className: `weui_loading_leaf weui_loading_leaf_${i}`}));
            }
            return (React.createElement("div", {className: "weui_loading"}, icons));
        }
        else {
            return (React.createElement("i", {className: cls}));
        }
    }
}
Icon.defaultProps = {
    value: 'success',
    size: 'small'
};
