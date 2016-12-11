import * as React from 'react';
import { Row } from 'antd';
export const VRow = (props) => {
    return (React.createElement(Row, {type: props.type, gutter: props.gutter, align: props.align, className: props.className, justify: props.justify}, props.children));
};
