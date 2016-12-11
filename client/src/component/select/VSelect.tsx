/**
 * Created by DuanG on 2016/12/1.
 */
import * as React from 'react';
import { Select } from 'antd';
import ReactNode=__React.ReactNode;
import {IAntdProps,IAntdSelectOption} from "custom-antd";
import FilterPropsComponent from "../abstract/FilterPropsComponent";
const Option = Select.Option;
const OptGroup = Select.OptGroup;

export interface IVSelectProps{
    multiple?:boolean;//默认false 支持多选

    allowClear?:boolean;//支持清除, 单选模式有效

    ////是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。
    filterOption?:(inputValue,option)=>void|boolean;

    tags?:boolean;//可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配

    //被选中时调用，参数为选中项的 value 值
    onSelect?:(value, option)=>void;

    //取消选中时调用，参数为选中项的 option value 值，仅在 multiple 或 tags 模式下生效
    onDeselect?:(value:string)=>void;

    //选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
    onChange?:(value:string)=>void;

    //文本框值变化时回调
    onSearch?:(value: String)=>void;

    notFoundContent?:string;//当下拉列表为空时显示的内容

    dropdownMatchSelectWidth?:boolean;//下拉菜单和选择器同宽

    optionFilterProp?:string;//搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索

    //回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 value。children （combobox 模式下为 value）
    optionLabelProp?:string;

    combobox?:boolean;//输入框自动提示模式

    size?:'large'|'small';

    showSearch?:boolean;//在选择框中显示搜索框

    disabled?:boolean;

    defaultActiveFirstOption?:boolean;//是否默认高亮第一个选项。

    //菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位
    getPopupContainer?:(triggerNode)=>void;

    //是否把每个选项的 label 包装到 value 中，决定 Select 的 value 类型。
    labelInValue?:boolean;

    style?: Object;//{ width: 200 }

    vOptionProps?:IVOptionProps;

    vOptGroupProps?:IVOptGroupProps;

    isSelectGroup?:boolean;

    options:IAntdSelectOption[];
}

export interface IVOptionProps extends IAntdSelectOption{
    disabled?:boolean;
    key?:string|number;
}

export interface IVOptGroupProps{
    label?:string|JSX.Element;
}

export default class VSelect extends FilterPropsComponent<IVSelectProps&IAntdProps,void>{
    constructor(props){
        super(props);
    }
    renderOption(): JSX.Element[]{
        let {vOptGroupProps,isSelectGroup,options}=this.props;
        let {label}=vOptGroupProps;
        if(isSelectGroup!=undefined&&isSelectGroup){
            return options&&options.map((option:IAntdSelectOption,key:number)=>{
                    const {value, text} = option;
                    return(
                        <OptGroup label={label} key={key.toString()}>
                            <Option value={value} key={key.toString()}>
                                {text}
                            </Option>
                        </OptGroup>
                    )
                });
        }
        return options&&options.map((option:IAntdSelectOption,key:number)=>{
                const {value, text} = option;
                return(
                    <Option value={value} key={key.toString()}>
                        {text}
                    </Option>
                )
            }

        )
    }
    public render(){
        const newProps=super.getFilterProps();
        return(
            <Select
                {...newProps}
            >
                {this.renderOption()}
            </Select>
        )
    }
}

