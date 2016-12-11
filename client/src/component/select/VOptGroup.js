import * as React from 'react';
import { Select } from 'antd';
const OptGroup = Select.OptGroup;
export default class VOptGroup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { label, children } = this.props;
        return (React.createElement(OptGroup, {label: label}, children));
    }
}
