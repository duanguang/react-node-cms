/**
 * Created by DuanG on 2016/11/21.
 */
import * as React from 'react';
import {Row} from 'antd';

import RowProps=Antd.RowProps;
import ReactNode=__React.ReactNode;
interface IRowProps extends RowProps{
    type?:'flex';
    gutter?:number;
    justify?:'start'|'end'|'center'|'space-around'|'space-between';
    align?:'top'|'middle'|'bottom';
    className?:string;
    children?:ReactNode;
}
export const VRow=(props:IRowProps)=>{
    return(
        <Row type={props.type}
             gutter={props.gutter}
             align={props.align}
             className={props.className}
             justify={props.justify}
        >
            {props.children}
        </Row>
    )
}