import * as React from 'react';
import './css/mask.less';
import  classNames from "classnames";

export interface IMaskProps{
    transparent:boolean;
}

export default class Mask extends React.Component<IMaskProps,any>{
    constructor(props){
        super(props);
    }

    render(){
        const transparent = this.props.transparent;
        const className = classNames({
            'kad_mask': !transparent,
            'kad_mask_transparent': transparent
        });

        return (
            <div className={className}></div>
        );
    }
}