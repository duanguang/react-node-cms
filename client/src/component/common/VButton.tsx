/**
 * Created by xiaoduan on 2016/11/21.
 */

import * as React from 'react';
import {Button} from 'antd';

interface IButtonProps{
    onClick?:Function;
    className?:string;
    type?:'primary'|'ghost'|'dashed';
    size?:"large"|"small";
}

interface IButtonStates{

}

export default class VButton extends React.Component<IButtonProps,IButtonStates>{
    private baseCls='btn';
    handleClick(){
        this.props.onClick&&this.props.onClick()
    }
    public render(){
        const {onClick,children,className}=this.props;
        return(
            <Button className={`${this.baseCls} ${className}`}
                    type={this.props.type?this.props.type:'primary'}
                    size={this.props.size}
                    onClick={this.handleClick.bind(this)}>
                {children}
            </Button>
        )
    }
}