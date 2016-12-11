import * as React from 'react';
import { default as FormInput } from "../form/FormInput";
import { ICon } from "../ico/ICon";
import Captcha from "../form/Captcha";
import { FormPassWordInput } from "../form/FormPassWordInput";
import { default as FormDatePicker } from "../form/FormDatePicker";
import { FormSubmitButton } from "../form/FormSubmitButton";
import { default as FormUpload } from "../form/FormUpload";
import { default as FormEditor } from "../form/FormEditor";
import { default as FormSelect } from "../form/FormSelect";
export default class CreateFormComponent extends React.Component {
    createFormInput(key, control, form) {
        const { iAntdProps, iFormInput, rules } = control;
        const icon = iFormInput && iFormInput.icon;
        const captcha = iFormInput && iFormInput.captcha;
        return (React.createElement(FormInput, {iAntdProps: iAntdProps, form: form, rules: rules, key: key, iFormInput: iFormInput, children: this.props.children}, React.createElement(ICon, {className: icon && icon.className, type: icon && icon.type}), React.createElement(Captcha, {className: captcha && captcha.className, obtainTokenCb: captcha && captcha.obtainTokenCb, reloadClassName: captcha && captcha.reloadClassName})));
    }
    createFormDatePicker(key, control, form) {
        let { iAntdProps, rules, iFormDatePicker } = control;
        return (React.createElement(FormDatePicker, {iAntdProps: iAntdProps, form: form, rules: rules, key: key, iFormDatePicker: iFormDatePicker, children: this.props.children}));
    }
    createFormPassWordInput(key, control, form) {
        const { iAntdPassWord, iVPassWordInput } = control;
        const icon = iVPassWordInput && iVPassWordInput.icon;
        return (React.createElement(FormPassWordInput, {iAntdPassWord: iAntdPassWord, form: form, key: key, iVPassWordInput: iVPassWordInput, children: this.props.children}, React.createElement(ICon, {className: icon && icon.className, type: icon && icon.type})));
    }
    createFormSubmitButton(key, control, form) {
        return (React.createElement(FormSubmitButton, {antdButton: control, form: form, key: key}));
    }
    createFormUpload(key, control, form) {
        let { iAntdProps, rules, iFormWithUpload } = control;
        return (React.createElement(FormUpload, {iAntdProps: iAntdProps, form: form, rules: rules, key: key, iFormWithUpload: iFormWithUpload, children: this.props.children}));
    }
    createFormEditor(key, control, form) {
        let { iAntdProps, rules, iFormEditor } = control;
        return (React.createElement(FormEditor, {iAntdProps: iAntdProps, form: form, rules: rules, key: key, iFormEditor: iFormEditor, children: this.props.children}));
    }
    createFormSelect(key, control, form) {
        let { iAntdProps, rules, iFormWithSelect } = control;
        return (React.createElement(FormSelect, {iAntdProps: iAntdProps, form: form, rules: rules, key: key, iFormWithSelect: iFormWithSelect, children: this.props.children}));
    }
}
