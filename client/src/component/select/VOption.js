import * as React from 'react';
import { Select } from 'antd';
const Option = Select.Option;
export default class VOption extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { value, text, disabled, key } = this.props;
        return (React.createElement(Option, {value: value, disabled: disabled}, text));
    }
}
