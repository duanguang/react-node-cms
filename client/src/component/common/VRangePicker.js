import * as React from 'react';
import { DatePicker } from 'antd';
import FilterPropsComponent from "../abstract/FilterPropsComponent";
const RangePicker = DatePicker.RangePicker;
export default class VMonthPicker extends FilterPropsComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const newProps = super.getFilterProps();
        ;
        return (React.createElement(RangePicker, React.__spread({}, newProps)));
    }
}
