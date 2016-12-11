import * as React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;
export class OldLabelWithInputModel {
    constructor(id, name, labelName, placeholder, options, value, type, help) {
        this.id = id;
        this.name = name;
        this.labelName = labelName;
        this.placeholder = placeholder;
        this.options = options;
        this.value = value;
        this.type = type;
        this.help = help;
    }
}
export const OldVFormVInput = (props) => {
    const iAntdProps = props.iAntdProps;
    const form = props.form;
    const help = props.help;
    let type = (iAntdProps.type == '' || iAntdProps.type == undefined) ? 'text' : iAntdProps.type;
    return (React.createElement(FormItem, {id: iAntdProps.id, key: iAntdProps.id, hasFeedback: true, help: help}, React.createElement(Input, React.__spread({placeholder: iAntdProps.placeholder}, form.getFieldProps(iAntdProps.name, props.options), {type: type}))));
};
