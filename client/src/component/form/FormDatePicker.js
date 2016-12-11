import * as React from 'react';
import { Form } from 'antd';
import ControlComponent from "./../common/ControlComponent";
import { default as VDatePicker } from "../common/VDatePicker";
const FormItem = Form.Item;
export class LabelWithDatePickerModel {
    constructor(iAntdProps, rules, //验证规则
        iFormDatePicker) {
        this.iAntdProps = iAntdProps;
        this.rules = rules;
        this.iFormDatePicker = iFormDatePicker;
    }
}
export default class FormDatePicker extends ControlComponent {
    constructor(props) {
        super(props);
    }
    handleChangeDatePicker(datePickerId, value) {
        const self = this;
        const { getFieldProps } = self.props.form;
        // 由于覆盖了DatePicker通过getFieldProps()方法自动设置的onChange事件，需要手动调用一次onChange
        console.log(value);
        getFieldProps(datePickerId).onChange(value);
    }
    render() {
        const { form, iAntdProps, iFormDatePicker, children, rules } = this.props;
        const { getFieldError, isFieldValidating } = form;
        let label = iFormDatePicker && iFormDatePicker.label;
        let labelCol = iFormDatePicker && iFormDatePicker.labelCol;
        let wrapperCol = iFormDatePicker && iFormDatePicker.wrapperCol;
        /*console.log(form.getFieldProps<IAntdProps>(iAntdProps.name,super.getFieldDecoratorOpts(this.props)))*/
        return (React.createElement(FormItem, {id: iAntdProps.id, hasFeedback: true, help: isFieldValidating(iAntdProps.name) ? iFormDatePicker.help : (getFieldError(iAntdProps.name) || []).join(', '), className: iAntdProps.className, label: label, labelCol: labelCol, wrapperCol: wrapperCol}, React.createElement(VDatePicker, React.__spread({placeholder: iAntdProps.placeholder}, form.getFieldProps(iAntdProps.name, super.getFieldDecoratorOpts(this.props)), {format: iFormDatePicker.format, size: iFormDatePicker.size, showTime: iFormDatePicker.showTime, disabled: iFormDatePicker.disabled, disabledDate: iFormDatePicker.disabledDate})), children));
    }
}
