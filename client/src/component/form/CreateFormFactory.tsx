/**
 * Created by DuanG on 2016/8/24.
 */
import * as React from 'react';
import {Form} from 'antd';
import {LabelWithInputModel,default as FormInput} from 'FormInput';
import {LabelWithPassInputModel} from 'FormPassWordInput';
import {AntButtonModel} from 'FormSubmitButton';
import FormComponentProps=Antd.FormComponentProps;
import CreateFormOptions = Antd.CreateFormOptions;
import {LabelWithDatePickerModel} from "FormDatePicker";
import CreateFormComponent from "../abstract/CreateFormComponent";
import {LabelWithUploadModel} from "./FormUpload";
import {LabelWithEditorModel} from "./FormEditor";
import {LabelWithSelectModel} from "./FormSelect";


interface IFilterFormBuilderProps {
    controls: Array<any>;
    form?: CreateFormOptions;
}
class FilterFormBuilder extends CreateFormComponent<IFilterFormBuilderProps,void>{
    constructor(props:IFilterFormBuilderProps){
        super(props);
    }
    renderControl(control:any,key:number):JSX.Element{
        const form=this.props.form;
        if(control instanceof LabelWithInputModel){
           return super.createFormInput(key,control,form);
        }
        else if(control instanceof LabelWithDatePickerModel){
            return super.createFormDatePicker(key,control,form);
        }
        else if(control instanceof LabelWithPassInputModel){
            return super.createFormPassWordInput(key,control,form);
        }
        else if(control instanceof AntButtonModel){
            return super.createFormSubmitButton(key,control,form);
        }
        else if(control instanceof LabelWithUploadModel){
            return super.createFormUpload(key,control,form);
        }
        else if(control instanceof LabelWithEditorModel){
            return super.createFormEditor(key,control,form);
        }
        else if(control instanceof LabelWithSelectModel){
            return super.createFormSelect(key,control,form);
        }
        else {
            throw  new Error(`ComponentClass: Unknown control. control = ${JSON.stringify(control)}`);
        }
    }
    renderControls():JSX.Element[]{
        const controls=this.props.controls;
        return controls.map((controls:any,key:number)=>{
           return this.renderControl(controls,key);
        });
    }
    render(){
        return(
            <Form className="" horizontal>
                {this.renderControls()}
            </Form>
        );
    }
}
const FilterFormConcrete=Form.create({})(FilterFormBuilder);

export const FilterForm=(filterFormProps:IFilterFormBuilderProps)=><FilterFormConcrete {...filterFormProps}/>;
