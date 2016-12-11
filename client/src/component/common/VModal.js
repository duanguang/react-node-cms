import * as React from 'react';
import './css/VModal.less';
import { Modal } from 'antd';
import GenericComponent from "../abstract/GenericComponent";
const baseCls = `v-modal`;
export default class VModal extends GenericComponent {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.state = {
            visible: props.visible
        };
    }
    updateState(visible) {
        this.setState({ visible });
    }
    componentWillReceiveProps(props) {
        if (this.props != props && this.state.visible != props.visible) {
            this.updateState(props.visible);
        }
    }
    handleOk() {
        this.props.handleOk && this.props.handleOk();
    }
    getChildren() {
        const { children, handleOk } = this.props;
        return super.passPropsChildren(children, { handleOk });
    }
    handleCancel() {
        const { handleCancel } = this.props;
        handleCancel();
    }
    getStandardWidth() {
        const { size } = this.props;
        if (size === 'large') {
            return '80%';
        }
        else if (size === 'small') {
            return '40%';
        }
        return;
    }
    getFilterProps() {
        let newProps = {};
        for (let key in this.props) {
            const targetValue = this.props[key];
            if (typeof targetValue != 'undefined') {
                newProps[key] = targetValue;
            }
        }
        return newProps;
    }
    render() {
        const newProps = this.getFilterProps();
        const { handleCancel, handleOk } = this;
        const { visible } = this.state;
        const children = this.getChildren();
        const width = this.props.width || this.getStandardWidth();
        const className = `${baseCls} ${this.props.className}`;
        return (React.createElement(Modal, React.__spread({}, newProps, {width: width, className: className, visible: visible, onOk: handleOk, onCancel: handleCancel}), children));
    }
}
