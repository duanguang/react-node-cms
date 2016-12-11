import * as React from 'react';
import { Table } from 'antd';
import { formatDate, isUndefined } from "../../utils/general";
export class BasicTable extends React.Component {
    constructor(props) {
        super(props);
        this.getTransformColumns = (() => {
            let cacheColumns;
            return (columns) => {
                if (!cacheColumns) {
                    cacheColumns = columns.map((column, index) => {
                        column.key = column.dataIndex || `column-${index}`;
                        column.render = this.getColumnRender(column);
                        return column;
                    });
                }
                return cacheColumns;
            };
        })();
        this.state = {
            selectedRowKeys: []
        };
    }
    getColumnRender(column) {
        if (column.render) {
            return column.render;
        }
        switch (column.type) {
            case 'link':
                return BasicTable.linkRender;
            case 'operate':
                return this.operateRenderColumn(column);
            case 'date':
                return this.dateRender(column);
            case 'custom':
                return this.customRenderColumn(column);
            case 'enum':
                return this.enumRender(column);
            case 'img':
                return BasicTable.imgRender;
            case 'text':
            default:
                return BasicTable.textRender;
        }
    }
    enumRender(column) {
        return ((rowDate, rowRecordData, index) => {
            return (React.createElement("span", null, `${column.onGetDisplayName && column.onGetDisplayName(rowDate)}`));
        });
    }
    customRenderColumn(column) {
        return ((rowData, rowRecordData, index) => {
            return column.customRender(rowRecordData, index);
        });
    }
    static linkRender(text) {
        return (React.createElement("span", null, React.createElement("a", {href: text}, text)));
    }
    static imgRender(text) {
        return (React.createElement("span", null, React.createElement("img", {src: text})));
    }
    static textRender(text) {
        return (React.createElement("span", null, text));
    }
    dateRender(column) {
        return ((rowDate, rowRecordData, index) => {
            let date = new Date(rowDate);
            let dateString = formatDate(date);
            return (React.createElement("span", null, dateString));
        });
    }
    operateRenderColumn(column) {
        let self = this;
        return ((rowData, rowRecordData, index) => {
            return (React.createElement("div", null, column.buttonArr.map((btn, i) => {
                return (React.createElement("span", {key: i}, React.createElement("a", {onClick: btn.onClickCb.bind(self, rowData, btn)}, btn.text)));
            })));
        });
    }
    onSelectChange(selectedRowKeys, rowItems) {
        this.setState({ selectedRowKeys });
        this.props.onSelectionChange(selectedRowKeys, rowItems);
    }
    ;
    getRowSelection() {
        const selectedRowKeys = this.state.selectedRowKeys;
        const onSelectionChange = this.props.onSelectionChange;
        if (onSelectionChange) {
            return {
                selectedRowKeys,
                onChange: this.onSelectChange
            };
        }
    }
    render() {
        const transformColumns = this.getTransformColumns(this.props.columns);
        const bordered = isUndefined(this.props.bordered) ? true : this.props.bordered;
        return (React.createElement(Table, React.__spread({rowSelection: this.getRowSelection()}, this.props, {bordered: bordered, columns: transformColumns})));
    }
}
