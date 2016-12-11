import * as React from 'react';
import { Form } from 'antd';
import { default as VUpload } from "../common/VUpload";
import ControlComponent from "../common/ControlComponent";
const FormItem = Form.Item;
export class LabelWithUploadModel {
    constructor(iAntdProps, rules, iFormWithUpload) {
        this.iAntdProps = iAntdProps;
        this.rules = rules;
        this.iFormWithUpload = iFormWithUpload;
    }
}
export default class FormUpload extends ControlComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { form, iAntdProps, iFormWithUpload, children, rules } = this.props;
        const { getFieldError, isFieldValidating } = form;
        let label = iFormWithUpload && iFormWithUpload.label;
        let labelCol = iFormWithUpload && iFormWithUpload.labelCol;
        let wrapperCol = iFormWithUpload && iFormWithUpload.wrapperCol;
        return (React.createElement(FormItem, {id: iAntdProps.id, key: iAntdProps.id, hasFeedback: true, help: isFieldValidating(iAntdProps.name) ? iFormWithUpload.help : (getFieldError(iAntdProps.name) || []).join(', '), className: iAntdProps.className, label: label, labelCol: labelCol, wrapperCol: wrapperCol}, React.createElement(VUpload, React.__spread({}, form.getFieldProps(iAntdProps.name, super.getFieldDecoratorOpts(this.props)), {fileList: iFormWithUpload.fileList, defaultFileList: iFormWithUpload.defaultFileList, data: iFormWithUpload.data, headers: iFormWithUpload.headers, showUploadList: iFormWithUpload.showUploadList, multiple: iFormWithUpload.multiple, accept: iFormWithUpload.accept, beforeUpload: iFormWithUpload.beforeUpload, onChange: iFormWithUpload.onChange, onPreview: iFormWithUpload.onPreview, onRemove: iFormWithUpload.onRemove, action: iFormWithUpload.action, supportServerRender: iFormWithUpload.supportServerRender, disabled: iFormWithUpload.disabled, className: iFormWithUpload.className, listType: iFormWithUpload.listType, uploadBottonStyle: iFormWithUpload.uploadBottonStyle})), children));
    }
}
