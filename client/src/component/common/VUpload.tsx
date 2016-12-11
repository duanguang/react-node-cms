/**
 * Created by DuanG on 2016/12/1.
 */
import * as React from 'react';
import {Upload,Modal} from 'antd';
import {IAntdProps} from "custom-antd";
import FilterPropsComponent from "../abstract/FilterPropsComponent";
import 'css/VUpload.less';


/*文件状态改变的回调，返回为：
{
    file: { /!* ... *!/ },
    fileList: [ /!* ... *!/ ],
    event: { /!* ... *!/ },
}
file 当前操作的文件对象。
{
    uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
    name: 'xx.png'   // 文件名
    status: 'done',  // 状态有：uploading done error removed
    response: '{"status": "success"}',  // 服务端响应内容
}
antd@1.9.0 之前，multiple 模式下，此参数为一个对象数组 [file, ...]，antd@1.9.0 开始无论是否多选，均为一个对象。
fileList 当前的文件列表。
event 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。*/
export interface IVUploadProps {
    defaultFileList?:any[];
    fileList?:any[];
    action:string;//上传的地址
    data?:(file)=>void|Object;//上传所需参数或返回上传参数的方法
    headers?:Object;//设置上传的请求头部，IE10 以上有效
    showUploadList?:boolean;//是否展示 uploadList, 默认开启
    multiple?:boolean;//是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件。
    accept?:string;//接受上传的文件类型
    beforeUpload?:(file)=>void;//上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。注意：该方法不支持老 IE
    onChange?:(file)=>void;
    listType:'text'|'picture'|'picture-card';//上传列表的内建样式，支持两种基本样式
    onPreview?:(file)=>void;//点击文件链接时的回调
    onRemove?:(file)=>void;//点击移除文件时的回调
    supportServerRender?:boolean;//服务端渲染时需要打开这个
    disabled?:boolean;
    className?:string;
    uploadBottonStyle:JSX.Element;//上传按钮样式
}
interface IVUploadState{
    priviewVisible?: boolean;
    priviewImage?: string;
}
export default class VUpload extends FilterPropsComponent<IVUploadProps&IAntdProps,IVUploadState> {
    constructor(props) {
        super(props);
        this.state={
            priviewVisible: false,
            priviewImage: '',
        }
    }
    handleCancel() {
        this.setState({
            priviewVisible: false,
        });
    }
    handelPreview(file){
        this.props.onPreview&&this.props.onPreview(file);
        this.setState({
            priviewImage: file.url,
            priviewVisible: true,})
    }
    private renderUpload(newProps){
        if(this.props.onPreview){
            return(
                <Upload {...newProps}
                    onPreview={this.handelPreview.bind(this)}
                >
                    {this.props.uploadBottonStyle}
                </Upload>
            )
        }
        return(
            <Upload {...newProps} >
                {this.props.uploadBottonStyle}
            </Upload>
        )
    }
    private renderModal(){
        if(this.props.onPreview){
            return(
                <Modal visible={this.state.priviewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                    <img alt="example" src={this.state.priviewImage} />
                </Modal>
            )
        }
    }
    public render() {
        const newProps = super.getFilterProps();
        return (
            <div>
                {this.renderUpload(newProps)}
                {this.renderModal()}
            </div>
        )
    }
}