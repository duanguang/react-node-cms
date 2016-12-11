/**
 * Created by DuanG on 2016/11/28.
 */
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
import { getDeleteEnumDisplayName } from "../../../utils/EnumTool";
import { showDeleteModal } from "../../../component/common/SModal";
import TablePageContainer from "../../../component/common/TablePageContainer";
let CateTablePageContainer = class CateTablePageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.pagination = { pageSize: 2, total: 0 };
        this.current = 1;
    }
    componentDidMount() {
        this.props.onGetPageListCate(1);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.pageListCate != this.props.pageListCate) {
            if (!nextProps.pageListCate.data && nextProps.pageListCate.status === PromiseStatus.None) {
                let { total, pageSize } = this.props.pageListCate.data;
                let pageIndex = this.props.pageListCate.data.pageIndex;
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
                this.props.onGetPageListCate(pageIndex);
            }
        }
    }
    getColumns() {
        const { onDelete, onEdit } = this.props;
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
                type: 'enum',
                key: "isDelete",
                onGetDisplayName: getDeleteEnumDisplayName.bind(this)
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
        this.props.onGetPageListCate(e.current || 1);
    }
    render() {
        const { pageListCate } = this.props;
        if (pageListCate.data) {
            this.pagination.total = pageListCate.data.total;
            this.pagination.pageSize = pageListCate.data.pageSize;
        }
        return (React.createElement(TablePageContainer, {columns: this.getColumns(), source: pageListCate.data ? pageListCate.data.rows : [], pagination: this.pagination, isLoading: pageListCate.isLoading(), onChange: this.handleChange.bind(this)}));
    }
};
CateTablePageContainer = __decorate([
    connect((state) => {
        return {
            pageListCate: state.blogIndex.pageListCate,
            handleCateType: state.blogIndex.handleCateType
        };
    }, (dispatch) => {
        return {
            onGetPageListCate: (page, queryParams, sortParams) => dispatch(BlogIndexActions.getPageListCate(page, queryParams, sortParams))
        };
    }), 
    __metadata('design:paramtypes', [Object])
], CateTablePageContainer);
export default CateTablePageContainer;
