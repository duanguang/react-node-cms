/**
 * Created by xiaoduan on 2016/11/30.
 */
import * as React from 'react';
import {Input} from 'antd';
import {IAntdProps} from "custom-antd";

export interface IVInputProps {
    clear?:boolean;
    onPressEnter?:()=>void;
    disabled?:boolean;
    addonAfter?:JSX.Element;
    addonBefore?:JSX.Element;
    autosize?:boolean|Object;//自适应内容高度，只对 type="textarea" 有效 true or { minRows: 2, maxRows: 6 } 默认false
}

export default class VInput extends React.Component<IVInputProps&IAntdProps,void>{
    constructor(props){
        super(props);
    }
    public render(){
        const {clear,onPressEnter,disabled,addonAfter,addonBefore,autosize,type,placeholder,id}=this.props;
        return(
            <Input placeholder={placeholder}
                   id={id}
                   type={type}
                   onPressEnter={onPressEnter}
                   disabled={disabled}
                   addonAfter={addonAfter}
                   addonBefore={addonBefore}
                   autosize={autosize}
                {...this.props}
            />
        );
    }

}