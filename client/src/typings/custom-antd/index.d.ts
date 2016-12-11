
/**
 * Created by allen on 2016/8/4 0004.
 */

declare module 'custom-antd' {
   export interface IAntdCaptchaProps {
        obtainTokenCb: (captchaToken: string)=>void;
        className?: string;
        reloadClassName?:string;
        handleClick?: ()=>void;
    }

    interface IValidation{
        error?:string,
        dataValue?:string,
    }
    export interface IAntdRule{
        regex?:RegExp,
        validatorType?:number;
        errMessage?:string;
        required?:boolean;
        validation?:IValidation;
        type?:'array'|'date'|'upload';
    }

    export interface IAntdProps {
        id: string;
        name: string;
        placeholder: string;
        type?:string;
        value?:any;
        className?:string;
        initialValue?:string|{}[];
    }

    export interface IAntdFormItemProps{
        labelCol?:Object;
        wrapperCol?:Object;
        help?:string;
        label?: string;
    }

    export interface IAntdIConProps{
        className?:string;
        type:string;
    }
    export interface IAntdPassWordInputProps{
        id:string;
        name:string;
        labelName?: string;
        placeholder: string;
        reId:string;
        reName:string;
        reLabelName?:string;
        className?:string;
    }
    export interface IAntdSelectOption {
        text: string;
        value: string;
    }

/*    export interface IAntdSelect {
        id: string;
        name: string;
        labelName?: string;
        defaultValue?: string;
        options?: IAntdSelectOption[];
        placeholder?:string;
    }*/
    
    
    export interface ITable<IColumn> {
        dataSource: Array<any>; // 数据数组
        columns: IColumn[]; //表格列的配置描述，具体项见下表
        loading: boolean; //页面是否加载中
        size?: "default" | "small" //正常或迷你类型，default or small
        rowClassName?: (record, index: number) => string; //表格行的类名
        onChange?: (pagination, filters, sorter) => void; //分页、排序、筛选变化时触发
        locale?: {
            filterConfirm: string; //确定
            filterReset: string; //'重置'
            emptyText: string; //'暂无数据'
        } // 默认文案设置，目前包括排序、过滤、空数据文案
        scroll?: {
            x: number | boolean;
            y: number | boolean;
        }
        indentSize?: number; //展示树形数据时，每层缩进的宽度，以 px 为单位
        onRowClick?: (record, index: number) => void;//处理行点击事件
        useFixedHeader?: boolean; //是否固定表头 default:false
        bordered?: boolean; //是否展示外边框和列边框 default:false
        showHeader?: boolean; //是否显示表头 default:true
    }
    export interface IAntButton {
        onSubmitClick: (fields: any) => void;
        text: string;
        className?:string;
    }

    export interface IAntdCascaderOption{
        value:string;
        label:string;
        children:IAntdCascaderOption[];
    }

    export interface IAntdCascader{
        options:IAntdCascaderOption[];
        defaultValue?:any;
        value?:any;

    }
}




