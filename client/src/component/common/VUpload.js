import * as React from 'react';
import { Upload, Modal } from 'antd';
import FilterPropsComponent from "../abstract/FilterPropsComponent";
import 'css/VUpload.less';
export default class VUpload extends FilterPropsComponent {
    constructor(props) {
        super(props);
        this.state = {
            priviewVisible: false,
            priviewImage: '',
        };
    }
    handleCancel() {
        this.setState({
            priviewVisible: false,
        });
    }
    handelPreview(file) {
        this.props.onPreview && this.props.onPreview(file);
        this.setState({
            priviewImage: file.url,
            priviewVisible: true, });
    }
    renderUpload(newProps) {
        if (this.props.onPreview) {
            return (React.createElement(Upload, React.__spread({}, newProps, {onPreview: this.handelPreview.bind(this)}), this.props.uploadBottonStyle));
        }
        return (React.createElement(Upload, React.__spread({}, newProps), this.props.uploadBottonStyle));
    }
    renderModal() {
        if (this.props.onPreview) {
            return (React.createElement(Modal, {visible: this.state.priviewVisible, footer: null, onCancel: this.handleCancel.bind(this)}, React.createElement("img", {alt: "example", src: this.state.priviewImage})));
        }
    }
    render() {
        const newProps = super.getFilterProps();
        return (React.createElement("div", null, this.renderUpload(newProps), this.renderModal()));
    }
}
