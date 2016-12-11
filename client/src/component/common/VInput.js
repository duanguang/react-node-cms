import * as React from 'react';
import { Input } from 'antd';
export default class VInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { clear, onPressEnter, disabled, addonAfter, addonBefore, autosize, type, placeholder, id } = this.props;
        return (React.createElement(Input, React.__spread({placeholder: placeholder, id: id, type: type, onPressEnter: onPressEnter, disabled: disabled, addonAfter: addonAfter, addonBefore: addonBefore, autosize: autosize}, this.props)));
    }
}
