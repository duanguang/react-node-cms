/**
 * Created by xiaoduan on 2016/10/28.
 */

import * as React from 'react';
import * as objectAssign from 'object-assign';
import CreateFormOptions=Antd.CreateFormOptions;
import GenericComponent from "../abstract/GenericComponent";
import { RegExChk} from "../../utils/regex";
import {IAntdProps,IAntdRule} from "custom-antd";

export interface IFilterItem<IExtra>{
    value?:string;
    element:JSX.Element;
    extra:IExtra
}

export interface IRule extends IAntdRule{
}
export interface IControlComponent {
    iAntdProps: IAntdProps;
    form: CreateFormOptions;
    rules?:IRule[];
}
export default class ControlComponent<P extends IControlComponent,S> extends GenericComponent<P,S>{
    public form:CreateFormOptions;

    public constructor(props:P,form?:CreateFormOptions){
        super(props);
        this.form=form;
    }
    
    private getInitialValue(initialValue:any){
        return initialValue||undefined;
    }

    private regexValidator(r:IRule){
        return (rule,value,callback)=>{
            let regex = r.regex;
            if(regex){
                if (!regex.test(value) && (value !== undefined) && value !== "") {
                    callback(new Error(r.errMessage));
                } else if(!value){
                    callback();
                }else {
                    if(r.validation) {
                        setTimeout(() => {
                            if (value === r.validation.dataValue) {
                                callback([new Error(r.validation.error)]);
                            } else {
                                callback();
                            }
                        }, 800);
                    }
                    else {
                        callback();
                    }
                }
            }
            else if(r.validatorType){
                if(!RegExChk(r.validatorType,value)&&(value!==undefined)&&value!==""){
                    callback(new Error(r.errMessage));
                }
                else if(!value){
                    callback();
                }else {
                    if(r.validation) {
                        setTimeout(() => {
                            if (value === r.validation.dataValue) {
                                callback([new Error(r.validation.error)]);
                            } else {
                                callback();
                            }
                        }, 800);
                    }
                    else {
                        callback();
                    }
                }
            }
        }
    }

    private getRegexRule(rule:IRule){
        if(rule) {
            if(rule.regex||rule.validatorType) {
                return  {validator: this.regexValidator(rule)} as any;
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
    protected getFieldDecoratorOpts(props: P) {
        const {iAntdProps,rules}=props;
        let rule=rules[0];
        let rulesOptions={
            initialValue: this.getInitialValue(iAntdProps&&iAntdProps.initialValue),
        };
        let type='string';
        if(rule){
            if(rule.type=='date'){//当需要把日期转成字符串时，那么验证类型type 应该也为字符串类型
                rulesOptions=Object.assign(rulesOptions,{
                    getValueFromEvent: (value, timeString) => timeString,//将日期转成字符串
                });
            }
            /*else if(rule.type=='upload'){
                rulesOptions=Object.assign(rulesOptions,{
                    valuePropName: 'fileList',
                    normalize: this.normFile.bind(this),
                });
                type='array';
            }*/
            else {
                type=rule.type;
            }
            rulesOptions=Object.assign(rulesOptions,{
                validate:[{
                    rules:[
                        {required:rule?rule.required:false,type:type,message:`请输入${iAntdProps.placeholder}`},
                        this.getRegexRule(rule)
                    ],
                    trigger:['onBlur'],
                }],
            })
        }
        return rulesOptions;
    }
    public render(){
        return null;
    }
}

