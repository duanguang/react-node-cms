/**
 * Created by xiaoduan on 2016/10/28.
 */
import GenericComponent from "../abstract/GenericComponent";
import { RegExChk } from "../../utils/regex";
export default class ControlComponent extends GenericComponent {
    constructor(props, form) {
        super(props);
        this.form = form;
    }
    getInitialValue(initialValue) {
        return initialValue || undefined;
    }
    regexValidator(r) {
        return (rule, value, callback) => {
            let regex = r.regex;
            if (regex) {
                if (!regex.test(value) && (value !== undefined) && value !== "") {
                    callback(new Error(r.errMessage));
                }
                else if (!value) {
                    callback();
                }
                else {
                    if (r.validation) {
                        setTimeout(() => {
                            if (value === r.validation.dataValue) {
                                callback([new Error(r.validation.error)]);
                            }
                            else {
                                callback();
                            }
                        }, 800);
                    }
                    else {
                        callback();
                    }
                }
            }
            else if (r.validatorType) {
                if (!RegExChk(r.validatorType, value) && (value !== undefined) && value !== "") {
                    callback(new Error(r.errMessage));
                }
                else if (!value) {
                    callback();
                }
                else {
                    if (r.validation) {
                        setTimeout(() => {
                            if (value === r.validation.dataValue) {
                                callback([new Error(r.validation.error)]);
                            }
                            else {
                                callback();
                            }
                        }, 800);
                    }
                    else {
                        callback();
                    }
                }
            }
        };
    }
    getRegexRule(rule) {
        if (rule) {
            if (rule.regex || rule.validatorType) {
                return { validator: this.regexValidator(rule) };
            }
        }
        return {};
    }
    /*normFile(e) {
        console.log(e)
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }*/
    getFieldDecoratorOpts(props) {
        const { iAntdProps, rules } = props;
        let rule = rules[0];
        let rulesOptions = {
            initialValue: this.getInitialValue(iAntdProps && iAntdProps.initialValue),
        };
        let type = 'string';
        if (rule) {
            if (rule.type == 'date') {
                rulesOptions = Object.assign(rulesOptions, {
                    getValueFromEvent: (value, timeString) => timeString,
                });
            }
            else {
                type = rule.type;
            }
            rulesOptions = Object.assign(rulesOptions, {
                validate: [{
                        rules: [
                            { required: rule ? rule.required : false, type: type, message: `请输入${iAntdProps.placeholder}` },
                            this.getRegexRule(rule)
                        ],
                        trigger: ['onBlur'],
                    }],
            });
        }
        return rulesOptions;
    }
    render() {
        return null;
    }
}
