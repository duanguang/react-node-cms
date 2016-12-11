import * as React from 'react';
import { Col } from 'antd';
export const VCol = (props) => {
    return (React.createElement(Col, {span: props.span, order: props.order, offset: props.offset, push: props.push, pull: props.pull, className: props.className}, props.children));
};
