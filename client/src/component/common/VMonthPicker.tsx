/**
 * Created by DuanG on 2016/12/1.
 */
import * as React from 'react';
import {MonthPicker} from 'antd';
import {IAntdProps} from "custom-antd";
import FilterPropsComponent from "../abstract/FilterPropsComponent";

export interface IVMonthPickerProps {
    onChange?: (dateArr: Date, stringDateArr: string)=>void; // 时间发生变化的回调，发生在用户选择时间时
    disabledDate?:(currDate:Date)=>void;//不可选择的日期
    disabled?:boolean;//禁用
    style?:Object;//自定义输入框样式{}
    size?:'large'|'small';//输入框大小，large 高度为 32px，small 为 22px，默认是 28px
    format?: string; // 展示的日期格式 default:"yyyy-MM-dd HH:mm:ss"
}

export default class VMonthPicker extends FilterPropsComponent<IVMonthPickerProps&IAntdProps,void>{
    constructor(props){
        super(props);
    }
    public render(){
        const newProps=super.getFilterProps();

        return(
            <MonthPicker
                {...newProps}
            />
        );
    }
}