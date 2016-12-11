/**
 * Created by XD on 2016/8/13.
 */
import * as React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import classNames from 'classnames';
const FormItem = Form.Item;
export const FormWithInput = (props) => {
    const IAntdProps = props.IAntdProps;
    const form = props.form;
    const help = props.help;
    return (React.createElement(FormItem, {id: IAntdProps.id, key: IAntdProps.id, hasFeedback: true, help: help}, React.createElement(Input, React.__spread({placeholder: IAntdProps.placeholder}, form.getFieldProps(IAntdProps.name, props.options), {type: IAntdProps.type}))));
};
const getInitialState = {
    passBarShow: false,
    rePassBarShow: false,
    passStrength: 'L',
    rePassStrength: 'L',
};
export class FormWithPassWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = getInitialState;
    }
    getPassStrenth(value, type) {
        if (value) {
            let strength;
            // 密码强度的校验规则自定义，这里只是做个简单的示例
            if (value.length < 6) {
                strength = 'L';
            }
            else if (value.length <= 9) {
                strength = 'M';
            }
            else {
                strength = 'H';
            }
            if (type === 'pass') {
                this.setState({ passBarShow: true, passStrength: strength });
            }
            else {
                this.setState({ rePassBarShow: true, rePassStrength: strength });
            }
        }
        else {
            if (type === 'pass') {
                this.setState({ passBarShow: false });
            }
            else {
                this.setState({ rePassBarShow: false });
            }
        }
    }
    checkPass(rule, value, callback) {
        let $pintu = value;
        this.getPassStrenth(value, 'pass');
        let regex = /^[A-z a-z]\w{6,15}$/;
        if (!regex.test($pintu) && value !== "") {
            callback(new Error('密码以字母开头，长度为6-15字符'));
        }
        else {
            callback();
        }
    }
    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value !== getFieldValue('Password') && value !== undefined) {
            callback(new Error('两次输入密码不一致！'));
        }
        else {
            callback();
        }
    }
    renderPassStrengthBar(type) {
        const strength = type === 'pass' ? this.state.passStrength : this.state.rePassStrength;
        const classSet = classNames({
            'ant-pwd-strength': true,
            'ant-pwd-strength-low': strength === 'L',
            'ant-pwd-strength-medium': strength === 'M',
            'ant-pwd-strength-high': strength === 'H',
        });
        const level = {
            L: '低',
            M: '中',
            H: '高',
        };
        return (React.createElement("div", null, React.createElement("ul", {className: classSet}, React.createElement("li", {className: "ant-pwd-strength-item ant-pwd-strength-item-1"}), React.createElement("li", {className: "ant-pwd-strength-item ant-pwd-strength-item-2"}), React.createElement("li", {className: "ant-pwd-strength-item ant-pwd-strength-item-3"}), React.createElement("span", {className: "ant-form-text"}, level[strength]))));
    }
    ;
    render() {
        const iAntdPassWord = this.props.iAntdPassWord;
        const iAntdRePassWord = this.props.iAntdRePassWord;
        const form = this.props.form;
        const { validateFields, getFieldValue, getFieldError } = this.props.form;
        const help = this.props.help;
        const passWordOptions = {
            validate: [{
                    rules: [
                        { required: true, message: '请输入您的密码' },
                        { validator: this.checkPass.bind(this) }
                    ],
                    trigger: ['onBlur', 'onChange']
                }
            ],
            onChange: (e) => {
                //this.getPassStrenth(e.target.value, 'pass');
                if (getFieldValue(iAntdPassWord.id)) {
                    validateFields([iAntdRePassWord.id], { force: true });
                }
            },
        };
        const rePassWordOptions = {
            validate: [{
                    rules: [
                        { required: true, message: '请再次输入密码' },
                        { validator: this.checkPass2.bind(this) }
                    ],
                    trigger: ['onBlur', 'onChange']
                }
            ],
            onChange: (e) => {
                this.getPassStrenth(e.target.value, 'rePass');
                if (getFieldValue(iAntdPassWord.id) !== e.target.value) {
                    validateFields([iAntdRePassWord.id], { force: true });
                }
            },
        };
        return (React.createElement("div", null, React.createElement(Row, null, React.createElement(Col, {span: "16"}, React.createElement(FormItem, {id: iAntdPassWord.id, key: iAntdPassWord.id, hasFeedback: true, help: help}, React.createElement(Input, React.__spread({placeholder: iAntdPassWord.placeholder}, form.getFieldProps(iAntdPassWord.name, passWordOptions), {type: iAntdPassWord.type === "password" ? iAntdPassWord.type : 'password'})))), React.createElement(Col, {span: "8"}, this.state.passBarShow ? this.renderPassStrengthBar('pass') : null)), React.createElement(Row, null, React.createElement(Col, {span: "16"}, React.createElement(FormItem, {id: iAntdRePassWord.id, key: iAntdRePassWord.id, hasFeedback: true, help: help}, React.createElement(Input, React.__spread({placeholder: iAntdRePassWord.placeholder}, form.getFieldProps(iAntdRePassWord.name, rePassWordOptions), {type: iAntdRePassWord.type === "password" ? iAntdRePassWord.type : 'password'})))), React.createElement(Col, {span: "8"}, this.state.rePassBarShow ? this.renderPassStrengthBar('rePass') : null))));
    }
}
export const SubmitButton = (props) => {
    const antdButton = props.antdButton;
    const handelSubmitClick = antdButton.handelSubmit.bind(this);
    const { text, className, textClassName } = antdButton;
    const form = props.form;
    if (text === "") {
        return (React.createElement(FormItem, {key: "search-btn"}, React.createElement(Button, {type: "primary", className: className, onClick: () => {
            handelSubmitClick(form);
        }}, React.createElement("i", {className: textClassName}))));
    }
    else {
        return (React.createElement(FormItem, {key: "search-btn"}, React.createElement(Button, {type: "primary", className: className, onClick: () => {
            handelSubmitClick(form.getFieldsValue());
        }}, text)));
    }
};
