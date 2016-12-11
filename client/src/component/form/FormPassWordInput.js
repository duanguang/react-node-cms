import * as React from 'react';
import { Form, Input, Row, Col } from 'antd';
import classNames from 'classnames';
import { RegExChk } from "../../utils/regex";
const FormItem = Form.Item;
export class LabelWithPassInputModel {
    constructor(iAntdPassWord, iVPassWordInput) {
        this.iAntdPassWord = iAntdPassWord;
        this.iVPassWordInput = iVPassWordInput;
    }
}
export class FormPassWordInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passBarShow: false,
            rePassBarShow: false,
            passStrength: 'L',
            rePassStrength: 'L',
        };
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
        //let regex=/^[A-z a-z]\w{6,15}$/;
        let { iVPassWordInput } = this.props;
        let regex = iVPassWordInput && iVPassWordInput.regex;
        if (regex) {
            if (regex instanceof RegExp) {
                if (!iVPassWordInput.regex.test($pintu) && value !== "" && value !== undefined) {
                    callback(new Error(iVPassWordInput.errMessage || 'warning:the password error message IS Null'));
                }
                else {
                    callback();
                }
            }
            else if (!isNaN(iVPassWordInput.regex)) {
                if (!RegExChk(iVPassWordInput.regex, value) && value !== "" && value !== undefined) {
                    callback(new Error(iVPassWordInput.errMessage || 'warning:the password error message IS Null'));
                }
                else {
                    callback();
                }
            }
            else {
                callback();
            }
        }
        else {
            callback();
        }
    }
    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value !== getFieldValue(this.props.iAntdPassWord.id) && value !== undefined && value !== "") {
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
        const { iAntdPassWord, form, iVPassWordInput, children } = this.props;
        let labelCol = iVPassWordInput && iVPassWordInput.labelCol;
        let wrapperCol = iVPassWordInput && iVPassWordInput.wrapperCol;
        const { validateFields, getFieldValue, getFieldError } = form;
        const passWordOptions = {
            validate: [{
                    rules: [
                        { required: true, message: '请输入您的密码' },
                        { validator: this.checkPass.bind(this) }
                    ],
                    trigger: ['onBlur']
                }
            ],
            onBlur: (e) => {
                //this.getPassStrenth(e.target.value, 'pass');
                if (getFieldValue(iAntdPassWord.id)) {
                    validateFields([iAntdPassWord.reId], { force: true });
                }
            },
        };
        const rePassWordOptions = {
            validate: [{
                    rules: [
                        { required: true, message: '请再次输入密码' },
                        { validator: this.checkPass2.bind(this) }
                    ],
                    trigger: ['onBlur']
                }
            ],
            onBlur: (e) => {
                this.getPassStrenth(e.target.value, 'rePass');
                if (getFieldValue(iAntdPassWord.id) !== e.target.value) {
                    validateFields([iAntdPassWord.reId], { force: true });
                }
            },
        };
        return (React.createElement("div", null, React.createElement(Row, null, React.createElement(Col, {span: "16"}, React.createElement(FormItem, {id: iAntdPassWord.id, key: iAntdPassWord.id, hasFeedback: true, className: iAntdPassWord.className, label: iAntdPassWord.labelName, labelCol: labelCol, wrapperCol: wrapperCol}, React.createElement(Input, React.__spread({placeholder: iAntdPassWord.placeholder}, form.getFieldProps(iAntdPassWord.name, passWordOptions), {type: 'password'})), children)), React.createElement(Col, {span: "8"}, this.state.passBarShow ? this.renderPassStrengthBar('pass') : null)), React.createElement(Row, null, React.createElement(Col, {span: "16"}, React.createElement(FormItem, {id: iAntdPassWord.reId, key: iAntdPassWord.reId, hasFeedback: true, className: iAntdPassWord.className, label: iAntdPassWord.reLabelName, labelCol: labelCol, wrapperCol: wrapperCol}, React.createElement(Input, React.__spread({placeholder: '确认密码'}, form.getFieldProps(iAntdPassWord.reName, rePassWordOptions), {type: 'password'})), children)), React.createElement(Col, {span: "8"}, this.state.rePassBarShow ? this.renderPassStrengthBar('rePass') : null))));
    }
}
