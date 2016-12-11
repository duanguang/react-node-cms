/**
 * Created by xiaoduan on 2016/11/21.
 */
import * as React from 'react';
import { Button } from 'antd';
export default class VButton extends React.Component {
    constructor(...args) {
        super(...args);
        this.baseCls = 'btn';
    }
    handleClick() {
        this.props.onClick && this.props.onClick();
    }
    render() {
        const { onClick, children, className } = this.props;
        return (React.createElement(Button, {className: `${this.baseCls} ${className}`, type: this.props.type ? this.props.type : 'primary', size: this.props.size, onClick: this.handleClick.bind(this)}, children));
    }
}
