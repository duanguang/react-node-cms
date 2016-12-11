import * as React from 'react';
import { DatePicker } from 'antd';
import FilterPropsComponent from "../abstract/FilterPropsComponent";
export default class VDatePicker extends FilterPropsComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
    handelChange(dateArr, stringDateArr) {
        this.props.onChange && this.props.onChange(dateArr, stringDateArr);
        console.log(typeof stringDateArr);
        /*this.setState({
            value:stringDateArr
        })*/
    }
    render() {
        const newProps = super.getFilterProps();
        return (React.createElement(DatePicker, React.__spread({}, newProps)));
    }
}
