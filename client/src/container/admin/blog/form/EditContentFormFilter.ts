/**
 * Created by DuanG on 2016/11/29.
 */
import {LabelWithInputModel, IFormInputProps} from "../../../../component/form/FormInput";
import {AntButtonModel} from "../../../../component/form/FormSubmitButton";
import {IAntdProps,IAntdRule} from "custom-antd";
import {LabelWithDatePickerModel, IFormDatePickerProps} from "../../../../component/form/FormDatePicker";
import {IFormUploadProps, LabelWithUploadModel} from "../../../../component/form/FormUpload";
import * as React from 'react';
import {VCardUpload} from "../../../../component/common/VUploadBottonStyle";
import {IFormEditorProps, LabelWithEditorModel} from "../../../../component/form/FormEditor";
import {getContent} from "../../../../utils/ueditor";
import {IFormSelectProps, LabelWithSelectModel} from "../../../../component/form/FormSelect";
import { CateEntity} from "../../../../model/blog/cateTableEntity";
import {SMessage} from '../../../../component/common/SMessage'
import {isEmpty} from "../../../../utils/general";
import {IEditContentFormProps} from "../EditContent";
import {ContentEntity} from "../../../../model/blog/ContentEntity";

export const editContentFormBaseCls='Content-form';
export var getEditContentFormFilterProps=(props:IEditContentFormProps)=>{

    let titleRules:IAntdRule[]=[{
        required:true,
        errMessage:'昵称首字母必须为英文字母，长度为 2-50 个字符',
        regex:/^[\u0391-\uFFE5_a-zA-Z_0-9_]{2,50}$/i,
    }]
    let title:IAntdProps={
        id:'Title',
        name:'Title',
        placeholder:'标题',
        className:`${editContentFormBaseCls}-title`
    };
    let titleOptions:IFormInputProps={
        label:'标题',
        labelCol: { span: 3 },
        wrapperCol: { span: 12 }
    };


    let cate:IAntdProps={
        id:'Cate',
        name:'Cate',
        placeholder:'分类',
        className:`${editContentFormBaseCls}-cate`
    };
    let cateRules:IAntdRule[]=[{
        required:true,
    }];

    let cateOptions:IFormSelectProps={
        label:'分类',
        labelCol: { span: 3 },
        wrapperCol: { span: 12 },
        vOptGroupProps:{label:'cate'},
        options:[]
    };

    let author:IAntdProps={
        id:'Author',
        name:'Author',
        placeholder:'作者',
        className:`${editContentFormBaseCls}-author`
    };
    let authorRules:IAntdRule[]=[{

    }];

    let authorOptions:IFormInputProps={
        label:'作者',
        labelCol: { span: 3 },
        wrapperCol: { span: 12 }
    };

    let summary:IAntdProps={
        id:'Summary',
        name:'Summary',
        placeholder:'简介',
        className:`${editContentFormBaseCls}-summary`,
        type:'textarea'
    };
    let summaryRules:IAntdRule[]=[{

    }];

    let summaryOptions:IFormInputProps={
        label:'简介',
        labelCol: { span: 3 },
        wrapperCol: { span: 12 }
    };

    let dateRules:IAntdRule[]=[{
        required:true,
        type:'date',
    }]
    let date:IAntdProps={
        id:'CreateDate',
        name:'CreateDate',
        placeholder:'发布日期',
        className:`${editContentFormBaseCls}-date`,
    };
    let dateOptions:IFormDatePickerProps={
        /*showTime :true,*/
        format:"yyyy-MM-dd HH:mm:ss",
        /*disabledDate:(current)=>{
            return current && current.getTime() > Date.now();
        }*/
        label:'发布时间',
        labelCol: { span: 3 },
        wrapperCol: { span: 12 },
        /*onChange:(dateArr: Date, stringDateArr: string)=>{}*/
    };

    let uploadRules:IAntdRule[]=[{
        required:false,
        /*errMessage:'图片不能为空',*/
    }];
    let defaultFileList=[{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    }];
    let upload:IAntdProps={
        id:'UploadFile',
        name:'UploadFile',
        placeholder:'图片',
        className:`${editContentFormBaseCls}-upload`,
    };
    var file={fileName:undefined,thumbUrl:undefined};
    let uploadOptions:IFormUploadProps={
        action:'http://127.0.0.1:3006/chkUserLogin',
        accept:'image',
        listType:'picture-card',
        /*defaultFileList: defaultFileList,*/
        onChange:(info)=>{
            console.log(info)
            if (info.file.status !== 'uploading') {
                console.log(info.file);
                console.log(info.fileList);
                file.fileName=`${info.file.lastModified}.${info.file.type.substr(6)}`;
                file.thumbUrl=info.file.thumbUrl;
            }
        },
        onPreview: (file) => {
            console.log(file);
        },
        beforeUpload(file) {
            if (file.type.search('image')<0) {
                SMessage.error('只能上传 图片 文件哦！');
                return false;
            }
            return true;
        },
        uploadBottonStyle: React.createElement(VCardUpload, Object.assign({}, props)),
        label:'标题图',
        labelCol: { span: 3 },
        wrapperCol: { span: 16 }
    };


    let desc:IAntdProps={
        id:'Desc',
        name:'Desc',
        placeholder:'内容',
        className:`${editContentFormBaseCls}-desc`,
        value:''
    };
    let descRules:IAntdRule[]=[{

    }];

    let descOptions:IFormEditorProps={
        label:'内容',
        labelCol: { span: 3 },
        wrapperCol: { span: 20 },
    };
    const filterProps=[
        new LabelWithInputModel(title,titleRules,titleOptions),
        new LabelWithSelectModel(cate,cateRules,cateOptions),
        new LabelWithInputModel(author,authorRules,authorOptions),
        new LabelWithInputModel(summary,summaryRules,summaryOptions),
        new LabelWithDatePickerModel(date,dateRules,dateOptions),
        new LabelWithUploadModel(upload,uploadRules,uploadOptions),
        new LabelWithEditorModel(desc,descRules,descOptions),
        new AntButtonModel('确定', (fields: any)=> {
            fields.validateFieldsAndScroll((errors,value)=>{
                value.UploadFile=file;
                value.Desc=getContent('Desc');
                console.log(value)
                if (!!errors) {
                    console.log(errors);
                    return;
                }
                else {
                    if(!value.UploadFile.fileName){
                        SMessage.warning('请上传标题图片')
                    }
                    else if(isEmpty(value.Desc)){
                        SMessage.warning('请填写内容')
                    }
                    else {
                        let info=new ContentEntity();
                        info.cateId=value.Cate;
                        info.author=value.Author;
                        info.title=value.Title;
                        info.summary=value.Summary;
                        info.createDate=value.CreateDate;
                        info.content=value.Desc;
                        info.saveFolder=value.UploadFile.thumbUrl;
                        info.imageName=value.UploadFile.fileName;
                        props.onAddContent(info);
                        info=null;
                    }
                }

            })
            //
        },'tn btn-lg btn-login btn-block')
    ];
    getEditContentFormFilterProps = (props)=> {
        console.log(props);
        filterProps.map((item)=>{
            /*if(item instanceof LabelWithInputModel){
                item.iAntdProps.initialValue=entity[item.iAntdProps.id];
            }*/
            if(item instanceof LabelWithSelectModel){
                props.pageListCate.data&&props.pageListCate.data.rows.map((entity:CateEntity)=>{
                    item.iFormWithSelect.options.push({value:entity.id,text:entity.cateName});
                })
            }
        })

        return filterProps;
    };
    return filterProps;
}