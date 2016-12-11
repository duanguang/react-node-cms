import * as React from 'react';
import { BasicTable } from "../table/BasicTable";
export default class TablePageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: []
        };
    }
    render() {
        const { source, isLoading, pagination, columns } = this.props;
        return (React.createElement(BasicTable, {columns: columns, dataSource: source, onChange: this.props.onChange.bind(this), pagination: pagination, loading: isLoading}));
    }
}
