/**
 * Created by DuanG on 2016/11/28.
 */
import * as React from 'react';
import {IColumn,BasicTable} from "../table/BasicTable";
interface ICatePageTableProps {
    source?: Array<any>;
    isLoading?: boolean;
    pagination?:Object;
    onChange?:Function;
    columns:IColumn[];
}
interface ICatePageTableStates {
    selectedRowKeys: Array<number>;
}

export default class TablePageContainer extends React.Component<ICatePageTableProps,ICatePageTableStates> {

    public constructor(props: ICatePageTableProps) {
        super(props);
        this.state = {
            selectedRowKeys: []
        }
    }
 
    public render() {
        const {source, isLoading,pagination,columns} = this.props;
        return (
            <BasicTable columns={columns} dataSource={source}
                        onChange={this.props.onChange.bind(this)}
                        pagination={pagination}
                        loading={isLoading}
            />
        )
    }
}