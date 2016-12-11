import * as React from 'react';
import { Form } from 'antd';
import { OldVFormVInput, OldLabelWithInputModel } from 'OldVFormInput';
import { FormPassWordInput, LabelWithPassInputModel } from 'FormPassWordInput';
import { FormSubmitButton, AntButtonModel } from 'FormSubmitButton';
import { ICon } from "../ico/ICon";
class OldFilterFormBuilder extends React.Component {
    constructor(props) {
        super(props);
    }
    renderControl(control, key) {
        const form = this.props.form;
        const { getFieldError, isFieldValidating } = this.props.form;
        if (control instanceof OldLabelWithInputModel) {
            if (control.help !== undefined) {
                return (React.createElement(OldVFormVInput, {iAntdProps: control, help: isFieldValidating(control.name) ? '校验中...' : (getFieldError(control.name) || []).join(', '), form: form, options: control.options, key: key}));
            }
            else {
                return (React.createElement(OldVFormVInput, {iAntdProps: control, form: form, options: control.options, key: key}));
            }
        }
        else if (control instanceof LabelWithPassInputModel) {
            const { iAntdPassWord, iVPassWordInput } = control;
            const icon = iVPassWordInput && iVPassWordInput.icon;
            return (React.createElement(FormPassWordInput, {iAntdPassWord: iAntdPassWord, form: form, key: key, iVPassWordInput: iVPassWordInput, children: this.props.children}, React.createElement(ICon, {className: icon && icon.className, type: icon && icon.type})));
        }
        else if (control instanceof AntButtonModel) {
            return (React.createElement(FormSubmitButton, {antdButton: control, form: form, key: key}));
        }
        else {
            throw new Error(`RegistFilterForm.tsx: Unknown control. control = ${JSON.stringify(control)}`);
        }
    }
    renderControls() {
        const controls = this.props.controls;
        return controls.map((controls, key) => {
            return this.renderControl(controls, key);
        });
    }
    render() {
        return (React.createElement(Form, {className: "filter-form", horizontal: true}, this.renderControls()));
    }
}
const OldFilterFormConcrete = Form.create({})(OldFilterFormBuilder);
export const OldFilterForm = (filterFormProps) => React.createElement(OldFilterFormConcrete, React.__spread({}, filterFormProps));
