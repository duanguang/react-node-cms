/**
 * Created by DuanG on 2016/10/25.
 */
import * as React from 'react';
import {Form} from 'antd';
import {OldVFormVInput,OldLabelWithInputModel} from 'OldVFormInput';
import {FormPassWordInput,LabelWithPassInputModel} from 'FormPassWordInput';
import {FormSubmitButton,AntButtonModel} from 'FormSubmitButton';
import FormComponentProps=Antd.FormComponentProps;
import CreateFormOptions = Antd.CreateFormOptions;
import {ICon} from "../ico/ICon";
interface IFilterFormBuilderProps {
    controls: Array<any>;
    form?: CreateFormOptions;
}

class OldFilterFormBuilder extends React.Component<IFilterFormBuilderProps,void>{
    constructor(props:IFilterFormBuilderProps){
        super(props);
    }
    renderControl(control:any,key:number):JSX.Element{
        const form=this.props.form;
        const { getFieldError, isFieldValidating }:any = this.props.form;
        if(control instanceof OldLabelWithInputModel){
            if(control.help!==undefined){
                return(
                    <OldVFormVInput iAntdProps={control}
                                   help={isFieldValidating(control.name)?'校验中...' :(getFieldError(control.name) || []).join(', ')}
                                   form={form}
                                   options={control.options} key={key}
                    />
                );
            }
            else {
                return(
                    <OldVFormVInput iAntdProps={control}
                                   form={form}
                                   options={control.options}
                                   key={key}
                    />
                );

            }
        }
        else if(control instanceof LabelWithPassInputModel){
            const {iAntdPassWord,iVPassWordInput}=control;
            const icon=iVPassWordInput&&iVPassWordInput.icon;
            return (
                <FormPassWordInput iAntdPassWord={iAntdPassWord}
                                form={form}
                                key={key}
                                iVPassWordInput={iVPassWordInput}
                                children={this.props.children}
                >
                    <ICon className={icon&&icon.className} type={icon&&icon.type}/>
                </FormPassWordInput>
            );
        }
        else if(control instanceof AntButtonModel){
            return(
                <FormSubmitButton  antdButton={control}
                               form={form}
                               key={key}
                />
            );
        }
        else {
            throw  new Error(`RegistFilterForm.tsx: Unknown control. control = ${JSON.stringify(control)}`);
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
            <Form className="filter-form" horizontal >
                {this.renderControls()}
            </Form>
        );
    }
}
const OldFilterFormConcrete=Form.create({})(OldFilterFormBuilder);

export const OldFilterForm=(filterFormProps:IFilterFormBuilderProps)=><OldFilterFormConcrete {...filterFormProps}/>;
