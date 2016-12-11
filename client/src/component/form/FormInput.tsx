/**
 * Created by DuanG on 2016/8/24.
 */
import * as React from 'react';
import {Form} from 'antd';
import {IAntdProps,IAntdFormItemProps} from 'custom-antd';
import CreateFormOptions = Antd.CreateFormOptions;
import {IAntdIConProps,IAntdRule,IAntdCaptchaProps} from "custom-antd";
import ControlComponent from "./../common/ControlComponent";
import {IVInputProps, default as VInput} from "../common/VInput";
const FormItem = Form.Item;

export class LabelWithInputModel {
    constructor(public iAntdProps: IAntdProps,
                public rules?:IAntdRule[],//验证规则
                public iFormInput?:IFormInputProps) {
    }
}

export interface IFormInputProps extends IVInputProps,IAntdFormItemProps{
    icon?:IAntdIConProps;
    captcha?:IAntdCaptchaProps;
}

interface IFormWithInput{
    iAntdProps: IAntdProps;
    form: CreateFormOptions;
    rules?:IAntdRule[];
    iFormInput?:IFormInputProps;
    children?:React.ReactNode;
}

export default class FormInput extends ControlComponent<IFormWithInput,void>{
    constructor(props){
        super(props);
    }
    public render(){
        const {form,iAntdProps,iFormInput,children,rules}=this.props;
        const { getFieldError, isFieldValidating }:any = form;
        let label=iFormInput&&iFormInput.label;
        let labelCol=iFormInput&&iFormInput.labelCol;
        let wrapperCol=iFormInput&&iFormInput.wrapperCol;
        /*let type=(iAntdProps.type==''||iAntdProps.type==undefined)?'text':iAntdProps.type;*/
        let onEnter=iFormInput&&iFormInput.onPressEnter;
        let disabled=iFormInput&&iFormInput.disabled;
        let addonAfter=iFormInput&&iFormInput.addonAfter;
        let addonBefore=iFormInput&&iFormInput.addonBefore;
        return(
            <FormItem id={iAntdProps.id}  key={iAntdProps.id} hasFeedback
                      help={isFieldValidating(iAntdProps.name)?iFormInput.help :(getFieldError(iAntdProps.name) || []).join(', ')}
                      className={iAntdProps.className}
                      label={label} labelCol={labelCol} wrapperCol={wrapperCol}
            >
                <VInput placeholder={iAntdProps.placeholder}
                        {...form.getFieldProps<IAntdProps>(iAntdProps.name,super.getFieldDecoratorOpts(this.props))}
                        type={iAntdProps.type}
                        onPressEnter={onEnter}
                        disabled={disabled}
                        addonAfter={addonAfter}
                        addonBefore={addonBefore}
                        autosize={iFormInput.autosize}
                />
                {children}
            </FormItem>
        );
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
