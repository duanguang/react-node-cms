import "./css/toast.less"

import * as React from "react";
import Icon from "./Icon";
import Mask from "./Mask";

export interface IToastProps {
    icon?:string;
    iconSize?:string;
    show:boolean;
}

export default class Toast extends React.Component<IToastProps,void> {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        icon: 'toast',
        show: false,
    };

    render() {
        const {icon, show, children, iconSize} = this.props;

        return (
            <div className={icon === 'loading' ? 'weui_loading_toast' : ''} style={{display: show ? 'block' : 'none'}}>
                <Mask transparent={true}/>
                <div className="weui_toast">
                    <Icon value={icon} size={iconSize}/>
                    <p className="weui_toast_content">{children}</p>
                </div>
            </div>
        );
    }
}
