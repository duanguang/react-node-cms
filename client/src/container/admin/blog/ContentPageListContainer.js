var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as React from 'react';
import { connect } from 'react-redux';
import { PromiseStatus } from "../../../utils/redux";
import * as BlogIndexActions from '../../../redux/actions/blog/blogIndex';
import { showDeleteModal } from "../../../component/common/SModal";
import TablePageContainer from "../../../component/common/TablePageContainer";
import { ContentEntity } from "../../../model/blog/ContentEntity";
let ContentPageListContainer = class ContentPageListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.pagination = { pageSize: 2, total: 0 };
        this.current = 1;
    }
    componentDidMount() {
        this.props.onGetPageListContent(1);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.pageListContent != this.props.pageListContent) {
            if (!nextProps.pageListContent.data && nextProps.pageListContent.status === PromiseStatus.None) {
                let { total, pageSize } = this.props.pageListContent.data;
                let pageIndex = this.props.pageListContent.data.pageIndex;
                let mod = total % pageSize;
                let round = Math.floor(total / pageSize);
                /*console.log(this.current+'current');
                 console.log(mod+'求余');
                 console.log(this.props.pageListCate.data)
                 console.log(round+'求整');*/
                if (mod == 0 || mod == 1) {
                    if (this.current == round) {
                        pageIndex = round;
                    }
                    else if (this.current > round) {
                        if (this.props.handleCateType == 'delete') {
                            pageIndex = round;
                        }
                        else if (this.props.handleCateType == 'add') {
                            pageIndex = this.current;
                        }
                    }
                }
                else {
                    pageIndex = (this.current == round) ? round : round + 1;
                }
                this.props.onGetPageListContent(pageIndex);
            }
        }
    }
    getColumns() {
        const { onDelete, onEdit } = this.props;
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
                type: 'img'
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
                        onClickCb: (cateEntity) => {
                            onEdit(cateEntity);
                        }
                    },
                    {
                        text: `删除`,
                        onClickCb: (cateEntity) => {
                            let id = cateEntity.id;
                            showDeleteModal(() => onDelete(id));
                        }
                    }
                ]
            }
        ];
    }
    handleChange(e) {
        this.current = e.current || 1;
        this.props.onGetPageListContent(e.current || 1);
    }
    render() {
        const { pageListContent } = this.props;
        if (pageListContent.data) {
            this.pagination.total = pageListContent.data.total;
            this.pagination.pageSize = pageListContent.data.pageSize;
        }
        return (React.createElement(TablePageContainer, {columns: this.getColumns(), source: pageListContent.data ? ContentEntity.transSource(pageListContent.data.rows) : [], pagination: this.pagination, isLoading: pageListContent.isLoading(), onChange: this.handleChange.bind(this)}));
    }
};
ContentPageListContainer = __decorate([
    connect((state) => {
        return {
            pageListContent: state.blogIndex.pageListContent,
            handleCateType: state.blogIndex.handleCateType
        };
    }, (dispatch) => {
        return {
            onGetPageListContent: (page, queryParams, sortParams) => dispatch(BlogIndexActions.getPageListContent(page, queryParams, sortParams))
        };
    }), 
    __metadata('design:paramtypes', [Object])
], ContentPageListContainer);
export default ContentPageListContainer;
