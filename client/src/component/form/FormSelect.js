import * as React from 'react';
import { Form } from 'antd';
import ControlComponent from "../common/ControlComponent";
import { default as VSelect } from "../select/VSelect";
const FormItem = Form.Item;
export class LabelWithSelectModel {
    constructor(iAntdProps, rules, iFormWithSelect) {
        this.iAntdProps = iAntdProps;
        this.rules = rules;
        this.iFormWithSelect = iFormWithSelect;
    }
}
export default class FormSelect extends ControlComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { form, iAntdProps, iFormWithSelect, children, rules } = this.props;
        const { getFieldError, isFieldValidating } = form;
        let { label, labelCol, wrapperCol, help } = iFormWithSelect;
        return (React.createElement(FormItem, {id: iAntdProps.id, key: iAntdProps.id, hasFeedback: true, help: isFieldValidating(iAntdProps.name) ? help : (getFieldError(iAntdProps.name) || []).join(', '), className: iAntdProps.className, label: label, labelCol: labelCol, wrapperCol: wrapperCol}, React.createElement(VSelect, React.__spread({}, form.getFieldProps(iAntdProps.name, super.getFieldDecoratorOpts(this.props)), iFormWithSelect)), children));
    }
}
