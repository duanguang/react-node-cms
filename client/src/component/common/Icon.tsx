import "../../../public/css/weui_icon_font.less";

import * as React from 'react';
import  classNames from "classnames";

export interface IIconProps {
    value:string;
    size:string;
}

export default class Icon extends React.Component<IIconProps,void> {
    static defaultProps = {
        value: 'success',
        size: 'small'
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {value, size} = this.props;
        const cls = classNames({
            ['weui_icon_' + value]: true,
            weui_icon_msg: size === 'large',
            // [className]: className
        });
        if (value === 'loading') {
            let icons = [];
            for(let i = 0;i<12;i++){
                icons.push(<div key={i} className={`weui_loading_leaf weui_loading_leaf_${i}`}></div>);
            }
            return (
                <div className="weui_loading">
                    {icons}
                </div>
            );
        }
        else {
            return (
                <i className={cls}/>
            );
        }
    }
}
