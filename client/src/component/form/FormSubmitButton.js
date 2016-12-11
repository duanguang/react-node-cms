/**
 * Created by DuanG on 2016/8/24.
 */
import * as React from 'react';
import { Form, Button } from 'antd';
const FormItem = Form.Item;
export class AntButtonModel {
    constructor(text, onSubmitClick, className) {
        this.text = text;
        this.onSubmitClick = onSubmitClick;
        this.className = className;
    }
}
export const FormSubmitButton = (props) => {
    const antdButton = props.antdButton;
    const onSubmitClick = antdButton.onSubmitClick.bind(this);
    const { text, className } = antdButton;
    const form = props.form;
    return (React.createElement(FormItem, {key: "search-btn"}, React.createElement(Button, {type: "primary", className: className, onClick: () => {
        onSubmitClick(form);
    }}, text)));
};
