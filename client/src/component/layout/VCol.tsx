/**
 * Created by DuanG on 2016/11/21.
 */
import * as React from 'react';
import {Col} from 'antd';

import ColProps=Antd.ColProps;
import ReactNode=__React.ReactNode;
interface IColProps extends ColProps{
    span?:number;
    order?:number;
    offset?:number;
    push?:number;
    pull?:number;
    className?: string;
    children?:ReactNode;
}

export const VCol=(props:IColProps)=>{
    return(
        <Col  span={props.span}
              order={props.order}
              offset={props.offset}
              push={props.push}
              pull={props.pull}
              className={props.className}
        >
            {props.children}
        </Col>
    )
}