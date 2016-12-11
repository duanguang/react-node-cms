/**
 * Created by DuanG on 2016/12/9.
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
import {ContentTableEntity, ContentEntity} from "../../../model/blog/ContentEntity";

interface IContentPageListContainerStateProps{
    pageListContent?:PromiseState<ContentTableEntity>;
    handleCateType?:'add'|'delete'|string;
}
interface IContentPageListContainerDispatchProps{
    onGetPageListContent?:(page:number,queryParams?:{},sortParams?:{})=>void;
}

interface IContentPageListContainerProps{
    onDelete?: (id: string)=>void;
    onEdit?: (cateEntity: CateEntity)=>void;
    isLoading?: boolean;
    pagination?:Object;
}

@connect<IContentPageListContainerStateProps,IContentPageListContainerDispatchProps,IContentPageListContainerProps>(
    (state:IBlogIndexStore)=>{
        return{
            pageListContent:state.blogIndex.pageListContent,
            handleCateType:state.blogIndex.handleCateType
        }
    },
    (dispatch:Dispatch)=>{
        return{
            onGetPageListContent:(page:number,queryParams?:{},sortParams?:{})=>dispatch(BlogIndexActions.getPageListContent(page,queryParams,sortParams))
        }
    }
)

export default class ContentPageListContainer extends React.Component<IContentPageListContainerStateProps&IContentPageListContainerDispatchProps&IContentPageListContainerProps,void>{
    private pagination={pageSize:2,total:0};
    private current=1;
    public constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.onGetPageListContent(1);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.pageListContent!=this.props.pageListContent){
            if(!nextProps.pageListContent.data&&nextProps.pageListContent.status===PromiseStatus.None)
            {
                let {total,pageSize}=this.props.pageListContent.data;
                let pageIndex=this.props.pageListContent.data.pageIndex;
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
                this.props.onGetPageListContent(pageIndex);
            }
        }
    }
    public getColumns(): IColumn[] {
        const {onDelete, onEdit} = this.props;
        return [
            {
                title: '标题',
                dataIndex: 'title',
                key: "title"
            },
            {
                title: '分类',
                dataIndex: 'cateName',
                key: "cateName"
            },
            {
                title: '缩略图',
                dataIndex: 'thumbUrl',
                key: "thumbUrl",
                type:'img'
            },
            {
                title: '创建时间',
                type: 'date',
                dataIndex: 'createDate',
                key: "createDate"
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
        this.props.onGetPageListContent(e.current||1);
    }
    public render(){
        const {pageListContent}=this.props;
        if(pageListContent.data){
            this.pagination.total=pageListContent.data.total;
            this.pagination.pageSize=pageListContent.data.pageSize;
        }
        return(
            <TablePageContainer
                columns={this.getColumns()}
                source={pageListContent.data?ContentEntity.transSource(pageListContent.data.rows):[]}
                pagination={this.pagination}
                isLoading={pageListContent.isLoading()}
                onChange={this.handleChange.bind(this)}
            >

            </TablePageContainer>
        )
    }
}