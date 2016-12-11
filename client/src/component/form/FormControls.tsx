/**
 * Created by XD on 2016/8/13.
 */

//已废弃
import * as React from 'react';
import {Form,Input,Button,Row, Col} from 'antd';
import {IAntdProps} from 'custom-antd';
import CreateFormOptions = Antd.CreateFormOptions;
import  classNames from 'classnames';
const FormItem = Form.Item;

interface IFormWithInput{
    IAntdProps: IAntdProps;
    help?:string;
    form: CreateFormOptions;
    options?:Object;
}
export const FormWithInput=(props:IFormWithInput)=>{
    const IAntdProps=props.IAntdProps;
    const form=props.form;
    const help=props.help;
    return(
       <FormItem id={IAntdProps.id}  key={IAntdProps.id} hasFeedback
                 help={help}
       >
          <Input placeholder={IAntdProps.placeholder} {...form.getFieldProps<IAntdProps>(IAntdProps.name,props.options)}
              type={IAntdProps.type}
          />
       </FormItem>
    );
}

interface IFormWithPassWord{
    iAntdPassWord: IAntdProps;
    iAntdRePassWord:IAntdProps;
    help?:string;
    form: CreateFormOptions;
    options?:Object;
}
interface IPassWordState{
    passBarShow:boolean;
    rePassBarShow:boolean;
    passStrength:string;
    rePassStrength:string;
}
const getInitialState:IPassWordState= {
        passBarShow: false, // 是否显示密码强度提示条
        rePassBarShow: false,
        passStrength: 'L', // 密码强度
        rePassStrength: 'L',
}
export class  FormWithPassWord extends React.Component<IFormWithPassWord,any>{
    constructor(props){
        super(props);
        this.state=getInitialState;
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
        let regex=/^[A-z a-z]\w{6,15}$/;
        if(!regex.test($pintu)&&value!=="")
        {
            callback(new Error('密码以字母开头，长度为6-15字符'));
        }
        else {
            callback();
        }
    }
    checkPass2(rule, value, callback){
        const {getFieldValue }:any=this.props.form;
        if(value!==getFieldValue('Password')&&value!==undefined){
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
        const iAntdPassWord=this.props.iAntdPassWord;
        const iAntdRePassWord=this.props.iAntdRePassWord;
        const form=this.props.form;
        const {validateFields,getFieldValue,getFieldError}:any = this.props.form;
        const help=this.props.help;
        const passWordOptions={
            validate:[{
                rules: [
                    {required: true, message: '请输入您的密码'},
                    {validator: this.checkPass.bind(this)}
                ],
                trigger: ['onBlur','onChange']
            }
            ],
            onChange: (e) => {
                //this.getPassStrenth(e.target.value, 'pass');
                if (getFieldValue(iAntdPassWord.id)) {
                    validateFields([iAntdRePassWord.id], { force: true });
                }
            },
        };
        const rePassWordOptions={
            validate:[{
                rules: [
                    {required: true, message: '请再次输入密码'},
                    {validator: this.checkPass2.bind(this)}
                ],
                trigger: ['onBlur','onChange']
            }
            ],
            onChange: (e) => {
                this.getPassStrenth(e.target.value, 'rePass');
                if(getFieldValue(iAntdPassWord.id)!==e.target.value) {
                    validateFields([iAntdRePassWord.id], {force: true});
                }
            },
        }
        return (
            <div>
              <Row>
                <Col span="16">
                    <FormItem id={iAntdPassWord.id} key={iAntdPassWord.id} hasFeedback
                              help={help}
                    >

                        <Input
                            placeholder={iAntdPassWord.placeholder} {...form.getFieldProps<IAntdProps>(iAntdPassWord.name, passWordOptions)}
                            type={iAntdPassWord.type==="password"?iAntdPassWord.type:'password'}
                        />
                    </FormItem>
                </Col>
                <Col span="8">
                    {this.state.passBarShow ? this.renderPassStrengthBar('pass') : null}
                </Col>
              </Row>

                <Row>
                    <Col span="16">
                        <FormItem id={iAntdRePassWord.id} key={iAntdRePassWord.id} hasFeedback
                                  help={help}>
                            <Input  placeholder={iAntdRePassWord.placeholder} {...form.getFieldProps<IAntdProps>(iAntdRePassWord.name, rePassWordOptions)}
                                    type={iAntdRePassWord.type==="password"?iAntdRePassWord.type:'password'}

                            />
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


export interface IAntButton {
    handelSubmit: (fields: any) => void;
    text: string;
    className?:string;
    textClassName?:string;
}
interface ISubmitButton{
    antdButton:IAntButton;
    form: CreateFormOptions;
}
export const SubmitButton=(props:ISubmitButton)=>{
    const antdButton=props.antdButton;
    const handelSubmitClick=antdButton.handelSubmit.bind(this);
    const {text,className,textClassName}=antdButton;
    const form=props.form;
    if(text===""){
        return(
            <FormItem key="search-btn">
                <Button type="primary" className={className} onClick={()=>{
           handelSubmitClick(form);
           }}>
                    <i className={textClassName}></i>
                </Button>
            </FormItem>
        )
    }
    else{
        return(
            <FormItem key="search-btn">
                <Button type="primary" className={className} onClick={()=>{
           handelSubmitClick(form.getFieldsValue());
           }}>
                    {text}
                </Button>
            </FormItem>
        )
    }

}
