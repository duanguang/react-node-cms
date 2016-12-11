/**
 * Created by DuanG on 2016/11/28.
 */

import * as React from 'react';
import {connect} from 'react-redux';
import {CateEntity, CateTableEntity} from "../../../model/blog/cateTableEntity";
import {PromiseState, PromiseStatus} from "../../../utils/redux";
import {IBlogIndexStore} from "../../../redux/reducers/blog/blogIndex";
import Dispatch = Redux.Dispatch;
import * as BlogIndexActions from '../../../redux/actions/blog/blogIndex';
import {IColumn} from "../../../component/table/BasicTable";
import {getDeleteEnumDisplayName} from "../../../utils/EnumTool";
import {showDeleteModal} from "../../../component/common/SModal";
import TablePageContainer from "../../../component/common/TablePageContainer";

interface ICateTablePageContainerStateProps{
    pageListCate?:PromiseState<CateTableEntity>;
    handleCateType?:'add'|'delete'|string;
}
interface ICateTablePageContainerDispatchProps{
    onGetPageListCate?:(page:number,queryParams?:{},sortParams?:{})=>void;
}

interface ICateTablePageContainerProps{
    onDelete?: (id: string)=>void;
    onEdit?: (cateEntity: CateEntity)=>void;
    isLoading?: boolean;
    pagination?:Object;
}

@connect<ICateTablePageContainerStateProps,ICateTablePageContainerDispatchProps,ICateTablePageContainerProps>(
    (state:IBlogIndexStore)=>{
        return{
            pageListCate:state.blogIndex.pageListCate,
            handleCateType:state.blogIndex.handleCateType
        }
    },
    (dispatch:Dispatch)=>{
        return{
            onGetPageListCate:(page:number,queryParams?:{},sortParams?:{})=>dispatch(BlogIndexActions.getPageListCate(page,queryParams,sortParams))
        }
    }
)

export default class CateTablePageContainer extends React.Component<ICateTablePageContainerStateProps&ICateTablePageContainerDispatchProps&ICateTablePageContainerProps,void>{
    private pagination={pageSize:2,total:0};
    private current=1;
    public constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.onGetPageListCate(1);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.pageListCate!=this.props.pageListCate){
            if(!nextProps.pageListCate.data&&nextProps.pageListCate.status===PromiseStatus.None)
            {
                let {total,pageSize}=this.props.pageListCate.data;
                let pageIndex=this.props.pageListCate.data.pageIndex;
                let mod=total%pageSize;
                let round=Math.floor(total/pageSize);
                /*console.log(this.current+'current');
                console.log(mod+'求余');
                console.log(this.props.pageListCate.data)
                console.log(round+'求整');*/
                if(mod==0||mod==1){//求余
                    if(this.current==round){//刷新当前页数据
                        pageIndex= round;
                    }
                    else if(this.current>round){//当前页码大于取整，则有两种情况
                        if(this.props.handleCateType=='delete'){//1：如果是删除操作，则页码减1
                            pageIndex=round;
                        }
                        else if(this.props.handleCateType=='add'){//2：如果是添加操作，则页码加1
                            pageIndex=this.current;
                        }
                    }
                }
                else {
                    pageIndex=(this.current== round)?round:round+1;
                }
                this.props.onGetPageListCate(pageIndex);
            }
        }
    }
    public getColumns(): IColumn[] {
        const {onDelete, onEdit} = this.props;
        return [
            {
                title: '序号',
                dataIndex: 'cateId',
                key: "cateId"
            },
            {
                title: '分类名称',
                dataIndex: 'cateName',
                key: "cateName"
            },
            {
                title: '删除',
                dataIndex: 'isDelete',
                type:'enum',
                key: "isDelete",
                onGetDisplayName:getDeleteEnumDisplayName.bind(this)
            },
            {
                title: '创建时间',
                type: 'date',
                dataIndex: 'createTime',
                key: "createTime"
            },
            {
                title: '操作',
                type: "operate",
                buttonArr: [
                    {
                        text: `修改`,
                        onClickCb: (cateEntity:CateEntity)=> {
                            onEdit(cateEntity);
                        }
                    },
                    {
                        text: `删除`,
                        onClickCb: (cateEntity:CateEntity)=> {
                            let id = cateEntity.id;
                            showDeleteModal(()=>onDelete(id));
                        }
                    }
                ]
            }
        ]
    }
    handleChange(e){
        this.current=e.current||1;
        this.props.onGetPageListCate(e.current||1);
    }
    public render(){
        const {pageListCate}=this.props;
        if(pageListCate.data){
            this.pagination.total=pageListCate.data.total;
            this.pagination.pageSize=pageListCate.data.pageSize;
        }
        return(
            <TablePageContainer
                columns={this.getColumns()}
                source={pageListCate.data?pageListCate.data.rows:[]}
                pagination={this.pagination}
                isLoading={pageListCate.isLoading()}
                onChange={this.handleChange.bind(this)}
            >

            </TablePageContainer>
        )
    }
}
