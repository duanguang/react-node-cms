/**
 * Created by xiaoduan on 2016/12/3.
 */
import * as React from 'react';
import {Form} from 'antd';
import CreateFormOptions = Antd.CreateFormOptions;
import {IAntdProps,IAntdRule,IAntdFormItemProps} from "custom-antd";
import ControlComponent from "../common/ControlComponent";
import {IVSelectProps, default as VSelect, IVOptionProps, IVOptGroupProps} from "../select/VSelect";

const FormItem = Form.Item;

export class LabelWithSelectModel{
    constructor(public iAntdProps: IAntdProps,
                public rules?:IAntdRule[],
                public iFormWithSelect?:IFormSelectProps){

    }
}
export interface IFormSelectProps extends IVSelectProps,IAntdFormItemProps{
    isSelectGroup?:boolean;
    vOptionProps?:IVOptionProps;
    vOptGroupProps?:IVOptGroupProps;
}

interface IFormWithSelect{
    iAntdProps: IAntdProps;
    form: CreateFormOptions;
    rules?:IAntdRule[];
    iFormWithSelect?:IFormSelectProps;
    children?:React.ReactNode;
}

export default class FormSelect extends ControlComponent<IFormWithSelect,void>{
    constructor(props){
        super(props);

    }
    public render(){
        const {form,iAntdProps,iFormWithSelect,children,rules}=this.props;
        const { getFieldError, isFieldValidating }:any = form;
        let {label,labelCol,wrapperCol,help}=iFormWithSelect;
        return(
            <FormItem id={iAntdProps.id}  key={iAntdProps.id} hasFeedback
                      help={isFieldValidating(iAntdProps.name)?help :(getFieldError(iAntdProps.name) || []).join(', ')}
                      className={iAntdProps.className}
                      label={label} labelCol={labelCol} wrapperCol={wrapperCol}
            >

                <VSelect
                    {...form.getFieldProps<IAntdProps>(iAntdProps.name,super.getFieldDecoratorOpts(this.props))}
                    {...iFormWithSelect}
                >
                </VSelect>
                {children}
            </FormItem>
        )
    }
}