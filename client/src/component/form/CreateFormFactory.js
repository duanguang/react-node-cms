import * as React from 'react';
import { Form } from 'antd';
import { LabelWithInputModel } from 'FormInput';
import { LabelWithPassInputModel } from 'FormPassWordInput';
import { AntButtonModel } from 'FormSubmitButton';
import { LabelWithDatePickerModel } from "FormDatePicker";
import CreateFormComponent from "../abstract/CreateFormComponent";
import { LabelWithUploadModel } from "./FormUpload";
import { LabelWithEditorModel } from "./FormEditor";
import { LabelWithSelectModel } from "./FormSelect";
class FilterFormBuilder extends CreateFormComponent {
    constructor(props) {
        super(props);
    }
    renderControl(control, key) {
        const form = this.props.form;
        if (control instanceof LabelWithInputModel) {
            return super.createFormInput(key, control, form);
        }
        else if (control instanceof LabelWithDatePickerModel) {
            return super.createFormDatePicker(key, control, form);
        }
        else if (control instanceof LabelWithPassInputModel) {
            return super.createFormPassWordInput(key, control, form);
        }
        else if (control instanceof AntButtonModel) {
            return super.createFormSubmitButton(key, control, form);
        }
        else if (control instanceof LabelWithUploadModel) {
            return super.createFormUpload(key, control, form);
        }
        else if (control instanceof LabelWithEditorModel) {
            return super.createFormEditor(key, control, form);
        }
        else if (control instanceof LabelWithSelectModel) {
            return super.createFormSelect(key, control, form);
        }
        else {
            throw new Error(`ComponentClass: Unknown control. control = ${JSON.stringify(control)}`);
        }
    }
    renderControls() {
        const controls = this.props.controls;
        return controls.map((controls, key) => {
            return this.renderControl(controls, key);
        });
    }
    render() {
        return (React.createElement(Form, {className: "", horizontal: true}, this.renderControls()));
    }
}
const FilterFormConcrete = Form.create({})(FilterFormBuilder);
export const FilterForm = (filterFormProps) => React.createElement(FilterFormConcrete, React.__spread({}, filterFormProps));
