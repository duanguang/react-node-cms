/**
 * Created by xiaoduan on 2016/12/7.
 */
import { message } from 'antd';

export module SMessage{
    export const info=(messageInfo:string)=>{
        message.info(messageInfo);
    }

    export const success =(messageInfo:string)=>{
        message.success(messageInfo);
    }

    export const error =(messageInfo:string)=>{
        message.error(messageInfo);
    }

    export const warning =(messageInfo:string)=>{
        message.warning(messageInfo);
    }

    export const loading =(messageInfo:string)=>{
        const hide = message.loading(messageInfo,0);
        // 异步手动移除
        setTimeout(hide, 2500);
    }
}