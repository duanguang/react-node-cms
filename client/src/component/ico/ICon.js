import * as React from 'react';
import { Icon } from 'antd';
export const ICon = (props) => {
    let { className, type } = props;
    if (type) {
        return (React.createElement(Icon, {className: className, type: type}));
    }
    else {
        return null;
    }
};
