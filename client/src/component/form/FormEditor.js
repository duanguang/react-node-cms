import * as React from 'react';
import { Form } from 'antd';
import ControlComponent from "./../common/ControlComponent";
import VUeditor from "../common/VUeditor";
const FormItem = Form.Item;
export class LabelWithEditorModel {
    constructor(iAntdProps, rules, //验证规则
        iFormEditor) {
        this.iAntdProps = iAntdProps;
        this.rules = rules;
        this.iFormEditor = iFormEditor;
    }
}
export default class FormEditor extends ControlComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { form, iAntdProps, iFormEditor, children, rules } = this.props;
        const { getFieldError, isFieldValidating } = form;
        let label = iFormEditor && iFormEditor.label;
        let labelCol = iFormEditor && iFormEditor.labelCol;
        let wrapperCol = iFormEditor && iFormEditor.wrapperCol;
        return (React.createElement(FormItem, {id: iAntdProps.id, key: iAntdProps.id, hasFeedback: true, help: isFieldValidating(iAntdProps.name) ? iFormEditor.help : (getFieldError(iAntdProps.name) || []).join(', '), className: iAntdProps.className, label: label, labelCol: labelCol, wrapperCol: wrapperCol}, React.createElement(VUeditor, React.__spread({}, form.getFieldProps(iAntdProps.name, super.getFieldDecoratorOpts(this.props)))), children));
    }
}
