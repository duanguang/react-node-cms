import * as React from 'react';
import { Select } from 'antd';
import FilterPropsComponent from "../abstract/FilterPropsComponent";
const Option = Select.Option;
const OptGroup = Select.OptGroup;
export default class VSelect extends FilterPropsComponent {
    constructor(props) {
        super(props);
    }
    renderOption() {
        let { vOptGroupProps, isSelectGroup, options } = this.props;
        let { label } = vOptGroupProps;
        if (isSelectGroup != undefined && isSelectGroup) {
            return options && options.map((option, key) => {
                const { value, text } = option;
                return (React.createElement(OptGroup, {label: label, key: key.toString()}, React.createElement(Option, {value: value, key: key.toString()}, text)));
            });
        }
        return options && options.map((option, key) => {
            const { value, text } = option;
            return (React.createElement(Option, {value: value, key: key.toString()}, text));
        });
    }
    render() {
        const newProps = super.getFilterProps();
        return (React.createElement(Select, React.__spread({}, newProps), this.renderOption()));
    }
}
