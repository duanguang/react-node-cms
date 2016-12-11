import * as React from 'react';
import { MonthPicker } from 'antd';
import FilterPropsComponent from "../abstract/FilterPropsComponent";
export default class VMonthPicker extends FilterPropsComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const newProps = super.getFilterProps();
        return (React.createElement(MonthPicker, React.__spread({}, newProps)));
    }
}
