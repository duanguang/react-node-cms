import * as React from 'react';
import { Form } from 'antd';
import ControlComponent from "./../common/ControlComponent";
import { default as VInput } from "../common/VInput";
const FormItem = Form.Item;
export class LabelWithInputModel {
    constructor(iAntdProps, rules, //验证规则
        iFormInput) {
        this.iAntdProps = iAntdProps;
        this.rules = rules;
        this.iFormInput = iFormInput;
    }
}
export default class FormInput extends ControlComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { form, iAntdProps, iFormInput, children, rules } = this.props;
        const { getFieldError, isFieldValidating } = form;
        let label = iFormInput && iFormInput.label;
        let labelCol = iFormInput && iFormInput.labelCol;
        let wrapperCol = iFormInput && iFormInput.wrapperCol;
        /*let type=(iAntdProps.type==''||iAntdProps.type==undefined)?'text':iAntdProps.type;*/
        let onEnter = iFormInput && iFormInput.onPressEnter;
        let disabled = iFormInput && iFormInput.disabled;
        let addonAfter = iFormInput && iFormInput.addonAfter;
        let addonBefore = iFormInput && iFormInput.addonBefore;
        return (React.createElement(FormItem, {id: iAntdProps.id, key: iAntdProps.id, hasFeedback: true, help: isFieldValidating(iAntdProps.name) ? iFormInput.help : (getFieldError(iAntdProps.name) || []).join(', '), className: iAntdProps.className, label: label, labelCol: labelCol, wrapperCol: wrapperCol}, React.createElement(VInput, React.__spread({placeholder: iAntdProps.placeholder}, form.getFieldProps(iAntdProps.name, super.getFieldDecoratorOpts(this.props)), {type: iAntdProps.type, onPressEnter: onEnter, disabled: disabled, addonAfter: addonAfter, addonBefore: addonBefore, autosize: iFormInput.autosize})), children));
    }
}
/*export const QVInput=(props:IFormWithInput)=>{
    const {form,iAntdInput,iVInput,children}=props;
    let type=(iAntdInput.type==''||iAntdInput.type==undefined)?'text':iAntdInput.type;
    const { getFieldError, isFieldValidating }:any = form;
    const rule=props.rules[0];
    //console.log(iAntdInput.value)
    const rulesOptions={
        validate:[{
            rules:[
                {required:rule.required,message:`请输入${iAntdInput.placeholder}`},
                getRegexRule(rule)
            ],
            trigger:['onBlur']
        }],
        initialValue: iVInput.initialValue,
    };
    return(
        <FormItem id={iAntdInput.id}  key={iAntdInput.id} hasFeedback
                  help={isFieldValidating(iAntdInput.name)?iVInput.help :(getFieldError(iAntdInput.name) || []).join(', ')}
                  className={iAntdInput.className}
                  label={iVInput.label} labelCol={iVInput.labelCol} wrapperCol={iVInput.wrapperCol}
        >
            <Input placeholder={iAntdInput.placeholder} {...form.getFieldProps<IAntdInputProps>(iAntdInput.name,rulesOptions)}
                   type={type} onPressEnter={iVInput.onEnter} disabled={iVInput.disabled} addonAfter={iVInput.addonAfter}
                   addonBefore={iVInput.addonBefore}
            />
            {children}
        </FormItem>
    );
}*/
