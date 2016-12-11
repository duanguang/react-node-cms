/**
 * Created by xiaoduan on 2016/11/20.
 */
import * as React from 'react';
import {Table} from 'antd';
import TableProps=Antd.TableProps;
import Columns=Antd.Columns;
import {formatDate, isUndefined} from "../../utils/general";

export interface IColumnButton{
    text:string;
    onClickCb:(item:any)=>void;
}

type ColumnRenderType=(text,record,index)=>JSX.Element;

export interface IColumn extends Columns{
    title:string;//列头显示文字
    dataIndex?:string;//列数据在数据项中对应key
    key?:string;//React 需要Key
    sorter?:boolean;//排序函数,本地排序使用一个函数，需要服务端排序可设
    render?:ColumnRenderType;//定制渲染
    width?:number;//宽度
    buttonArr?:IColumnButton[];//按钮列表
    type?:'link'|'text'|'operate'|'custom'|'date'|'enum'|'img';//标识当前Column的类
    customRender?:(rowData:Object,index:number)=>JSX.Element;
    onGetDisplayName?:Function;
}

interface IBasicTableProps extends TableProps{
    columns:IColumn[];
    onSelectionChange?:(selectedRowKeys:string[]|number[],rowItems:any[])=>void;
}

interface IBasicTableState{
    selectedRowKeys?:string[]|number[];//这里配置默认勾选列
}

export class BasicTable extends React.Component<IBasicTableProps,IBasicTableState>{
    constructor(props:IBasicTableProps){
        super(props);
        this.state={
            selectedRowKeys:[]
        };
    }
    getTransformColumns=(()=>{
        let cacheColumns;
        return(columns:IColumn[]):IColumn[]=>{
            if(!cacheColumns){
                cacheColumns=columns.map((column:IColumn,index:number)=>{
                   column.key=column.dataIndex||`column-${index}`;
                   column.render=this.getColumnRender(column);
                    return column;
                });
            }
            return cacheColumns;
        }
    })();

    getColumnRender(column:IColumn):ColumnRenderType{
        if(column.render){
            return column.render;
        }
        switch (column.type){
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
    enumRender(column:IColumn){
        return((rowDate:string,rowRecordData:Object,index:number)=>{
            return(
                <span>
                   {`${column.onGetDisplayName&&column.onGetDisplayName(rowDate)}`}
               </span>
            )
        });
    }
    customRenderColumn(column:IColumn){
        return((rowData:Object,rowRecordData:Object,index:number)=>{
            return column.customRender(rowRecordData,index);
        })
    }

    static linkRender(text:string){
        return(
            <span>
                <a href={text}>{text}</a>
            </span>
        )
    }

    static imgRender(text:string){
        return(
            <span>
                <img src={text}/>
            </span>
        )
    }

    static textRender(text:string){
        return(
            <span>
                {text}
            </span>
        )
    }



    dateRender(column:IColumn){
        return((rowDate:string,rowRecordData:Object,index:number)=>{
           let date=new Date(rowDate);
           let dateString=formatDate(date);
           return(
               <span>
                   {dateString}
               </span>
           )
        });
    }

    operateRenderColumn(column:IColumn){
        let self=this;
        return((rowData:Object,rowRecordData:Object,index:number)=>{
            return(
                <div>
                    {
                        column.buttonArr.map((btn:IColumnButton,i:number)=>{
                            return(
                                <span key={i}>
                                  <a onClick={btn.onClickCb.bind(self,rowData,btn)}>
                                      {btn.text}
                                  </a>
                                </span>
                            )
                        })
                    }
                </div>
            )
        })
    }

    onSelectChange(selectedRowKeys:string[]|number[],rowItems:any[]){
        this.setState({selectedRowKeys});
        this.props.onSelectionChange(selectedRowKeys,rowItems);
    };

    getRowSelection(){
        const selectedRowKeys=this.state.selectedRowKeys;
        const onSelectionChange=this.props.onSelectionChange;
        if(onSelectionChange){
            return{
               selectedRowKeys,
               onChange:this.onSelectChange
            };
        }

    }

    render(){
        const transformColumns=this.getTransformColumns(this.props.columns);
        const bordered=isUndefined(this.props.bordered)?true:this.props.bordered;
        return(
            <Table rowSelection={this.getRowSelection()} {...this.props}
                bordered={bordered} columns={transformColumns}/>
        )
    }
}