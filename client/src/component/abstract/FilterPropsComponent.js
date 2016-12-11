import * as React from 'react';
export default class FilterPropsComponent extends React.Component {
    getFilterProps() {
        let newProps = {};
        for (let key in this.props) {
            const targetValue = this.props[key];
            if (typeof targetValue != 'undefined' || key === 'value') {
                newProps[key] = targetValue;
            }
        }
        return newProps;
    }
}
