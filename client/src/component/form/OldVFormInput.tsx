/**
 * Created by xiaoduan on 2016/10/25.
 */
import * as React from 'react';
import {Form,Input} from 'antd';
import {IAntdProps} from 'custom-antd';
import CreateFormOptions = Antd.CreateFormOptions;
const FormItem = Form.Item;

export class OldLabelWithInputModel implements IAntdProps {
    constructor(public id: string,
                public name: string,
                public labelName: string,
                public placeholder: string,
                public options?:Object,
                public value?:string,
                public type?:string,
                public help?:string   ) {
    }
}

interface IFormWithInput{
    iAntdProps: IAntdProps;
    help?:string;
    form: CreateFormOptions;
    options?:Object;
}

export const OldVFormVInput=(props:IFormWithInput)=>{
    const iAntdProps=props.iAntdProps;
    const form=props.form;
    const help=props.help;
    let type=(iAntdProps.type==''||iAntdProps.type==undefined)?'text':iAntdProps.type;
    return(
        <FormItem id={iAntdProps.id}  key={iAntdProps.id} hasFeedback
                  help={help}
        >
            <Input placeholder={iAntdProps.placeholder} {...form.getFieldProps<IAntdProps>(iAntdProps.name,props.options)}
                   type={type}
                   
            />

        </FormItem>
    );
}