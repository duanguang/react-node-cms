/**
 * Created by DuanG on 2016/8/24.
 */
import * as React from 'react';
import {Form,Input,Row, Col} from 'antd';
import CreateFormOptions = Antd.CreateFormOptions;
import  classNames from 'classnames';
import {IAntdPassWordInputProps} from "custom-antd";
import {IAntdIConProps} from "custom-antd";
import {format} from "morgan";
import { RegExChk} from "../../utils/regex";
const FormItem = Form.Item;

export class LabelWithPassInputModel{
    constructor(public iAntdPassWord: IAntdPassWordInputProps,
                public iVPassWordInput?:IFormPassWordInputProps ) {

    }
}

interface IFormWithPassWord{
    iAntdPassWord: IAntdPassWordInputProps;
    form: CreateFormOptions;
    iVPassWordInput?:IFormPassWordInputProps;
    children?:React.ReactNode;
}

export interface IFormPassWordInputProps{
    clear?:boolean;
    onEnter?:()=>void;
    labelCol?:Object;
    wrapperCol?:Object;
    disabled?:boolean;
    addonAfter?:JSX.Element;
    addonBefore?:JSX.Element;
    icon?:IAntdIConProps;
    initialValue?:string;
    help?:string;
    regex?:any;
    errMessage?:string;
}

interface IPassWordState{
    passBarShow?:boolean;
    rePassBarShow?:boolean;
    passStrength?:string;
    rePassStrength?:string;
}
export class  FormPassWordInput extends React.Component<IFormWithPassWord,IPassWordState>{
    constructor(props){
        super(props);
        this.state={
            passBarShow: false, // 是否显示密码强度提示条
            rePassBarShow: false,
            passStrength: 'L', // 密码强度
            rePassStrength: 'L',
        };
    }
    getPassStrenth(value, type):void {
        if (value) {
            let strength;
            // 密码强度的校验规则自定义，这里只是做个简单的示例
            if (value.length < 6) {
                strength = 'L';
            } else if (value.length <= 9) {
                strength = 'M';
            } else {
                strength = 'H';
            }
            if (type === 'pass') {
                this.setState({ passBarShow: true, passStrength: strength });
            } else {
                this.setState({ rePassBarShow: true, rePassStrength: strength });
            }
        } else {
            if (type === 'pass') {
                this.setState({ passBarShow: false });
            } else {
                this.setState({ rePassBarShow: false });
            }
        }
    }
    checkPass(rule, value, callback) {
        let $pintu=value;
        this.getPassStrenth(value, 'pass');
        //let regex=/^[A-z a-z]\w{6,15}$/;
        let {iVPassWordInput}=this.props;
        let regex=iVPassWordInput&&iVPassWordInput.regex;
        if(regex) {
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
    checkPass2(rule, value, callback){
        const {getFieldValue }:any=this.props.form;

        if(value!==getFieldValue(this.props.iAntdPassWord.id)&&value!==undefined&&value!==""){
            callback(new Error('两次输入密码不一致！'));
        } else {
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
        return (
            <div>
                <ul className={classSet}>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-1"></li>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-2"></li>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-3"></li>
          <span className="ant-form-text">
            {level[strength]}
          </span>
                </ul>
            </div>
        );
    };
    render() {
        const {iAntdPassWord,form,iVPassWordInput,children}=this.props;
        let labelCol=iVPassWordInput&&iVPassWordInput.labelCol;
        let wrapperCol=iVPassWordInput&&iVPassWordInput.wrapperCol;
        const {validateFields,getFieldValue,getFieldError}:any = form;
        const passWordOptions={
            validate:[{
                rules: [
                    {required: true, message: '请输入您的密码'},
                    {validator: this.checkPass.bind(this)}
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
        const rePassWordOptions={
            validate:[{
                rules: [
                    {required: true, message: '请再次输入密码'},
                    {validator: this.checkPass2.bind(this)}
                ],
                trigger: ['onBlur']
            }
            ],
            onBlur: (e) => {
                this.getPassStrenth(e.target.value, 'rePass');
                if(getFieldValue(iAntdPassWord.id)!==e.target.value) {
                    validateFields([iAntdPassWord.reId], {force: true});
                }
            },
        }
        return (
            <div>
                <Row>
                    <Col span="16">
                        <FormItem id={iAntdPassWord.id} key={iAntdPassWord.id} hasFeedback
                                  className={iAntdPassWord.className}
                                  label={iAntdPassWord.labelName} labelCol={labelCol} wrapperCol={wrapperCol}
                        >

                            <Input
                                placeholder={iAntdPassWord.placeholder} {...form.getFieldProps<IAntdPassWordInputProps>(iAntdPassWord.name, passWordOptions)}
                                type='password'
                            />
                            {children}
                        </FormItem>
                    </Col>
                    <Col span="8">
                        {this.state.passBarShow ? this.renderPassStrengthBar('pass') : null}
                    </Col>
                </Row>

                <Row>
                    <Col span="16">
                        <FormItem id={iAntdPassWord.reId} key={iAntdPassWord.reId} hasFeedback
                                  className={iAntdPassWord.className}
                                  label={iAntdPassWord.reLabelName} labelCol={labelCol} wrapperCol={wrapperCol}
                                  >
                            <Input  placeholder='确认密码' {...form.getFieldProps<IAntdPassWordInputProps>(iAntdPassWord.reName, rePassWordOptions)}
                                    type='password'

                            />
                            {children}
                        </FormItem>
                    </Col>
                    <Col span="8">
                        {this.state.rePassBarShow ? this.renderPassStrengthBar('rePass') : null}
                    </Col>
                </Row>
            </div>
        );
    }
}