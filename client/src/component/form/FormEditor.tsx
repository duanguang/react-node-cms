/**
 * Created by xiaoduan on 2016/12/3.
 */
import * as React from 'react';
import {Form} from 'antd';
import CreateFormOptions = Antd.CreateFormOptions;
import {IAntdProps,IAntdFormItemProps,IAntdRule} from "custom-antd";
import ControlComponent from "./../common/ControlComponent";
import VUeditor from "../common/VUeditor";
import {IVUeditorProps} from "../common/VUeditor";
const FormItem = Form.Item;

export class LabelWithEditorModel {
    constructor(public iAntdProps: IAntdProps,
                public rules?:IAntdRule[],//验证规则
                public iFormEditor?:IFormEditorProps) {
    }
}

export interface IFormEditorProps extends IVUeditorProps,IAntdFormItemProps{
}

interface IFormWithEditor{
    iAntdProps: IAntdProps;
    form: CreateFormOptions;
    rules?:IAntdRule[];
    iFormEditor?:IFormEditorProps;
    children?:React.ReactNode;
}

export default class FormEditor extends ControlComponent<IFormWithEditor,void>{
    constructor(props){
        super(props);
    }
    public render(){
        const {form,iAntdProps,iFormEditor,children,rules}=this.props;
        const { getFieldError, isFieldValidating }:any = form;
        let label=iFormEditor&&iFormEditor.label;
        let labelCol=iFormEditor&&iFormEditor.labelCol;
        let wrapperCol=iFormEditor&&iFormEditor.wrapperCol;
        return(
            <FormItem id={iAntdProps.id}  key={iAntdProps.id} hasFeedback
                      help={isFieldValidating(iAntdProps.name)?iFormEditor.help :(getFieldError(iAntdProps.name) || []).join(', ')}
                      className={iAntdProps.className}
                      label={label} labelCol={labelCol} wrapperCol={wrapperCol}
            >

                <VUeditor
                    {...form.getFieldProps<IAntdProps>(iAntdProps.name,super.getFieldDecoratorOpts(this.props))}


                />
                {children}
            </FormItem>
        );
    }
}