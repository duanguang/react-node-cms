import { LabelWithInputModel } from "../../../../component/form/FormInput";
import { AntButtonModel } from "../../../../component/form/FormSubmitButton";
import { icon } from "../../../../utils/icon";
import { validatorType } from "../../../../utils/regex";
export const loginFormBaseCls = 'login-form';
export var getLoginFromFilterProps = ((props) => {
    //账户参数 start
    let userNameRules = [{
            required: true,
            validatorType: validatorType.username,
            errMessage: '账户名以英文字母开头，长度不少于4个字符'
        }];
    let userName = {
        id: 'UserName',
        name: 'UserName',
        placeholder: '账户',
        className: `${loginFormBaseCls}-user`
    };
    let userNameOptions = {
        icon: { type: icon.getIConUser(), className: `${loginFormBaseCls}-icon` },
    };
    //end
    let passWordRules = [{
            required: true,
        }];
    let passWord = {
        id: 'Password',
        name: 'Password',
        placeholder: '密码',
        className: `${loginFormBaseCls}-user`,
        type: 'password'
    };
    let passWordOptions = {
        icon: { type: icon.getIConLock(), className: `${loginFormBaseCls}-icon` }
    };
    let captchaRules = [{
            required: true,
        }];
    let captcha = {
        id: 'captcha',
        name: 'captcha',
        placeholder: '验证码',
        className: `${loginFormBaseCls}-captcha-input`
    };
    let captchaOptions = {
        captcha: {
            obtainTokenCb: (xx) => { },
            className: `${loginFormBaseCls}-captcha-img`,
            reloadClassName: `${loginFormBaseCls}-captcha-link`
        }
    };
    const filterProps = [
        new LabelWithInputModel(userName, userNameRules, userNameOptions),
        new LabelWithInputModel(passWord, passWordRules, passWordOptions),
        new LabelWithInputModel(captcha, captchaRules, captchaOptions),
        new AntButtonModel('登录', (fields) => {
            fields.validateFieldsAndScroll((errors, value) => {
                if (!!errors) {
                    console.log('Errors in form!!!');
                    return;
                }
                else {
                    props.onSubmit(value.UserName, value.Password, value.captcha);
                }
            });
            //
        }, 'tn btn-lg btn-login btn-block')
    ];
    getLoginFromFilterProps = () => {
        //return filterProps;
        return filterProps;
    };
    return filterProps;
});
