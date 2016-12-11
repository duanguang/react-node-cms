/**
 * Created by xiaoduan on 2016/11/22.
 */
import * as React from 'react';
import './css/VModal.less';
import {Modal,Button} from 'antd';
import GenericComponent from "../abstract/GenericComponent";

export interface IVModelPassDown {
    handleOk?: Function;
}

interface IVModalProps extends IVModelPassDown {
    title: string;
    visible: boolean;
    confirmLoading?: boolean;
    handleCancel?: Function;
    className?: string;
    width?: string;
    size?: 'large'|'small';
    footer?: React.ReactNode | string
}

interface IVModalStates {
    visible: boolean;
}

const baseCls = `v-modal`;

export default class VModal extends GenericComponent<IVModalProps,IVModalStates> {

    public constructor(props: IVModalProps) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.state = {
            visible: props.visible
        }
    }

    public updateState(visible: boolean) {
        this.setState({visible});
    }

    public componentWillReceiveProps(props: IVModalProps) {
        if (this.props != props && this.state.visible != props.visible) {
            this.updateState(props.visible);
        }
    }

    public handleOk() {
        this.props.handleOk&&this.props.handleOk();
    }

    public getChildren(): JSX.Element[] {
        const {children, handleOk} =this.props;
        return super.passPropsChildren(children, {handleOk});
    }

    public handleCancel() {
        const {handleCancel} = this.props;
        handleCancel();
    }

    public getStandardWidth(): string {
        const {size} = this.props;
        if (size === 'large') {
            return '80%';
        }
        else if (size === 'small') {
            return '40%';
        }
        return;
    }
    private getFilterProps() {
        let newProps = {};
        for (let key in this.props) {
            const targetValue = this.props[key];
            if (typeof targetValue != 'undefined') {
                newProps[key] = targetValue;
            }
        }
        return newProps
    }
    public render() {
        const newProps=this.getFilterProps();
        const {handleCancel, handleOk} = this;
        const {visible} = this.state;
        const children = this.getChildren();
        const width = this.props.width || this.getStandardWidth();
        const className = `${baseCls} ${this.props.className}`;
        return (
            <Modal {...newProps}
                   width={width}
                   className={className}
                   visible={visible}
                   onOk={handleOk}
                   onCancel={handleCancel}
            >
                {children}
            </Modal>
        )
    }
}