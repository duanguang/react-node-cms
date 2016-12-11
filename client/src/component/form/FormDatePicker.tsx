/**
 * Created by DuanG on 2016/11/29.
 */
import * as React from 'react';
import {Form} from 'antd';
import CreateFormOptions = Antd.CreateFormOptions;
import {IAntdProps,IAntdFormItemProps,IAntdRule} from "custom-antd";
import ControlComponent from "./../common/ControlComponent";
import {IVDatePickerProps, default as VDatePicker} from "../common/VDatePicker";
const FormItem = Form.Item;

export class LabelWithDatePickerModel {
    constructor(public iAntdProps: IAntdProps,
                public rules?:IAntdRule[],//验证规则
                public iFormDatePicker?:IFormDatePickerProps) {
    }
}

export interface IFormDatePickerProps extends IVDatePickerProps,IAntdFormItemProps{
}

interface IFormWithDatePicker{
    iAntdProps: IAntdProps;
    form: CreateFormOptions;
    rules?:IAntdRule[];
    iFormDatePicker?:IFormDatePickerProps;
    children?:React.ReactNode;
}

export default class FormDatePicker extends ControlComponent<IFormWithDatePicker,void>{
    constructor(props){
        super(props);
    }
    handleChangeDatePicker(datePickerId, value) {
        const self=this;
        const { getFieldProps } :any= self.props.form;
        // 由于覆盖了DatePicker通过getFieldProps()方法自动设置的onChange事件，需要手动调用一次onChange
        console.log(value)
        getFieldProps(datePickerId).onChange(value);
    }
    public render(){
        const {form,iAntdProps,iFormDatePicker,children,rules}=this.props;
        const { getFieldError, isFieldValidating }:any = form;
        let label=iFormDatePicker&&iFormDatePicker.label;
        let labelCol=iFormDatePicker&&iFormDatePicker.labelCol;
        let wrapperCol=iFormDatePicker&&iFormDatePicker.wrapperCol;
        /*console.log(form.getFieldProps<IAntdProps>(iAntdProps.name,super.getFieldDecoratorOpts(this.props)))*/
        return(
            <FormItem id={iAntdProps.id}   hasFeedback
                      help={isFieldValidating(iAntdProps.name)?iFormDatePicker.help :(getFieldError(iAntdProps.name) || []).join(', ')}
                      className={iAntdProps.className}
                      label={label} labelCol={labelCol} wrapperCol={wrapperCol}
            >
                <VDatePicker
                    placeholder={iAntdProps.placeholder}
                    {...form.getFieldProps<IAntdProps>(iAntdProps.name,super.getFieldDecoratorOpts(this.props))}
                    format={iFormDatePicker.format}
                    size={iFormDatePicker.size}
                    showTime={iFormDatePicker.showTime}
                    disabled={iFormDatePicker.disabled}
                    disabledDate={iFormDatePicker.disabledDate}
                />

                {children}
            </FormItem>
        );
    }
}