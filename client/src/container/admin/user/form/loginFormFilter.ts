/**
 * Created by xiaoduan on 2016/10/30.
 */
import {UserRegistInfo} from "../../../../model/userRegistInfo";
import {LabelWithInputModel, IFormInputProps} from "../../../../component/form/FormInput";
import {AntButtonModel} from "../../../../component/form/FormSubmitButton";
import {IAntdProps,IAntdRule} from "custom-antd";
import {icon} from "../../../../utils/icon";
import {validatorType} from "../../../../utils/regex";
export const loginFormBaseCls='login-form';
export var getLoginFromFilterProps=((props:any)=>{
    //账户参数 start
    let userNameRules=[{
        required:true,
        validatorType:validatorType.username,
        errMessage:'账户名以英文字母开头，长度不少于4个字符'
    }];

    let userName:IAntdProps={
        id:'UserName',
        name:'UserName',
        placeholder:'账户',
        className:`${loginFormBaseCls}-user`
    };
    let userNameOptions:IFormInputProps={
        icon:{type:icon.getIConUser(),className:`${loginFormBaseCls}-icon`},
    };
    //end
    
    let passWordRules=[{
        required:true,
    }];
    let passWord:IAntdProps={
        id:'Password',
        name:'Password',
        placeholder:'密码',
        className:`${loginFormBaseCls}-user`,
        type:'password'
    };
    let passWordOptions:IFormInputProps={
        icon:{type:icon.getIConLock(),className:`${loginFormBaseCls}-icon`}
    };
    let captchaRules:IAntdRule[]=[{
        required:true,
    }];
    let captcha:IAntdProps={
        id:'captcha',
        name:'captcha',
        placeholder:'验证码',
        className:`${loginFormBaseCls}-captcha-input`
    };
    let captchaOptions:IFormInputProps={
        captcha:{
            obtainTokenCb:(xx)=>{},
            className:`${loginFormBaseCls}-captcha-img`,
            reloadClassName:`${loginFormBaseCls}-captcha-link`
        }
    }
    const filterProps=[
        new LabelWithInputModel(userName,userNameRules,userNameOptions),
        new LabelWithInputModel(passWord,passWordRules,passWordOptions),
        new LabelWithInputModel(captcha,captchaRules,captchaOptions),
        new AntButtonModel('登录', (fields: any)=> {
            fields.validateFieldsAndScroll((errors,value)=>{
                if (!!errors) {
                    console.log('Errors in form!!!');
                    return;
                }
                else {

                    props.onSubmit(value.UserName,value.Password,value.captcha);
                }

            })
            //
        },'tn btn-lg btn-login btn-block')
    ];
    getLoginFromFilterProps = ()=> {

        //return filterProps;
        return filterProps;
    };
    return filterProps;
});