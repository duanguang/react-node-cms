/**
 * Created by DuanG on 2016/10/29.
 */
import * as React from 'react';
import {Icon} from 'antd';

interface IIConProps{
    className?:string;
    type:string;
}

export const ICon=(props:IIConProps)=>{
    let {className,type}=props;
    if(type){
        return(
            <Icon className={className} type={type}/>
        );
    }
    else {
        return null;
    }
}
