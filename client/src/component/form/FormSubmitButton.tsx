/**
 * Created by DuanG on 2016/8/24.
 */

import * as React from 'react';
import {Form,Button} from 'antd';
import {IAntButton} from 'custom-antd';
import CreateFormOptions = Antd.CreateFormOptions;
import * as classNames from 'classnames';
const FormItem = Form.Item;

export class AntButtonModel implements IAntButton {
    constructor(public text: string,
                public onSubmitClick: (fields: Form) => void,
                public className?:string){
    }
}
interface ISubmitButton{
    antdButton:IAntButton;
    form: CreateFormOptions;
}

export const FormSubmitButton=(props:ISubmitButton)=>{
    const antdButton=props.antdButton;
    const onSubmitClick=antdButton.onSubmitClick.bind(this);
    const {text,className}=antdButton;
    const form=props.form;
    return(
        <FormItem key="search-btn">
            <Button type="primary" className={className} onClick={()=>{
           onSubmitClick(form);
           }}>
                {text}
            </Button>
        </FormItem>
    )

}