/**
 * Created by DuanG on 2016/12/1.
 */
import * as React from 'react';
import {LabelWithInputModel,default as FormInput} from "../form/FormInput";
import CreateFormOptions = Antd.CreateFormOptions;
import {ICon} from "../ico/ICon";
import Captcha from "../form/Captcha";
import {LabelWithPassInputModel,FormPassWordInput} from "../form/FormPassWordInput";
import {LabelWithDatePickerModel,default as FormDatePicker} from "../form/FormDatePicker";
import {AntButtonModel,FormSubmitButton} from "../form/FormSubmitButton";
import {LabelWithUploadModel, default as FormUpload} from "../form/FormUpload";
import {LabelWithEditorModel, default as FormEditor} from "../form/FormEditor";
import {LabelWithSelectModel, default as FormSelect} from "../form/FormSelect";

export default class CreateFormComponent<Props,State> extends React.Component<Props,State>{

    protected createFormInput(key:number,control:LabelWithInputModel,form:CreateFormOptions){
        const {iAntdProps,iFormInput,rules}=control;
        const icon=iFormInput&&iFormInput.icon;
        const captcha=iFormInput&&iFormInput.captcha;
        return(
            <FormInput iAntdProps={iAntdProps}
                       form={form}
                       rules={rules}
                       key={key}
                       iFormInput={iFormInput}
                       children={this.props.children}
            >
                <ICon className={icon&&icon.className} type={icon&&icon.type}/>
                <Captcha className={captcha&&captcha.className}
                         obtainTokenCb={captcha&&captcha.obtainTokenCb} reloadClassName={captcha&&captcha.reloadClassName}/>
            </FormInput>
        );
    }

    protected createFormDatePicker(key:number,control:LabelWithDatePickerModel,form:CreateFormOptions){
        let {iAntdProps,rules,iFormDatePicker}=control;
        return(
            <FormDatePicker iAntdProps={iAntdProps}
                            form={form}
                            rules={rules}
                            key={key}
                            iFormDatePicker={iFormDatePicker}
                            children={this.props.children}
            >
            </FormDatePicker>
        );
    }

    protected createFormPassWordInput(key:number,control:LabelWithPassInputModel,form:CreateFormOptions){
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

    protected createFormSubmitButton(key:number,control:AntButtonModel,form:CreateFormOptions){
        return(
            <FormSubmitButton  antdButton={control}
                               form={form}
                               key={key}
            />
        );
    }

    protected createFormUpload(key:number,control:LabelWithUploadModel,form:CreateFormOptions){
        let {iAntdProps,rules,iFormWithUpload}=control;
        return(
            <FormUpload
                iAntdProps={iAntdProps}
                form={form}
                rules={rules}
                key={key}
                iFormWithUpload={iFormWithUpload}
                children={this.props.children}
            >

            </FormUpload>
        )
    }

    protected createFormEditor(key:number,control:LabelWithEditorModel,form:CreateFormOptions){
        let {iAntdProps,rules,iFormEditor}=control;
        return(
            <FormEditor
                iAntdProps={iAntdProps}
                form={form}
                rules={rules}
                key={key}
                iFormEditor={iFormEditor}
                children={this.props.children}
            >

            </FormEditor>
        )
    }

    protected createFormSelect(key:number,control:LabelWithSelectModel,form:CreateFormOptions){
        let {iAntdProps,rules,iFormWithSelect}=control;
        return(
            <FormSelect
                iAntdProps={iAntdProps}
                form={form}
                rules={rules}
                key={key}
                iFormWithSelect={iFormWithSelect}
                children={this.props.children}
            >

            </FormSelect>
        )
    }
}