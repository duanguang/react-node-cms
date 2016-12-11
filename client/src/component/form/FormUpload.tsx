/**
 * Created by xiaoduan on 2016/12/1.
 */
import * as React from 'react';
import {Form} from 'antd';
import CreateFormOptions = Antd.CreateFormOptions;
import {IAntdProps,IAntdRule,IAntdFormItemProps} from "custom-antd";
import {IVUploadProps, default as VUpload} from "../common/VUpload";
import ControlComponent from "../common/ControlComponent";
const FormItem = Form.Item;

export class LabelWithUploadModel{
    constructor(public iAntdProps: IAntdProps,
                public rules?:IAntdRule[],
                public iFormWithUpload?:IFormUploadProps){
        
    }
}
export interface IFormUploadProps extends IVUploadProps,IAntdFormItemProps{
}

interface IFormWithUpload{
    iAntdProps: IAntdProps;
    form: CreateFormOptions;
    rules?:IAntdRule[];
    iFormWithUpload?:IFormUploadProps;
    children?:React.ReactNode;
}

export default class FormUpload extends ControlComponent<IFormWithUpload,void>{
      constructor(props){
          super(props);

      }

      public render(){
          const {form,iAntdProps,iFormWithUpload,children,rules}=this.props;
          const { getFieldError, isFieldValidating }:any = form;
          let label=iFormWithUpload&&iFormWithUpload.label;
          let labelCol=iFormWithUpload&&iFormWithUpload.labelCol;
          let wrapperCol=iFormWithUpload&&iFormWithUpload.wrapperCol;
          return(
              <FormItem id={iAntdProps.id}  key={iAntdProps.id} hasFeedback
                        help={isFieldValidating(iAntdProps.name)?iFormWithUpload.help :(getFieldError(iAntdProps.name) || []).join(', ')}
                        className={iAntdProps.className}
                        label={label} labelCol={labelCol} wrapperCol={wrapperCol}
              >

                  <VUpload
                      {...form.getFieldProps<IAntdProps>(iAntdProps.name,super.getFieldDecoratorOpts(this.props))}
                      fileList={iFormWithUpload.fileList}
                      defaultFileList={iFormWithUpload.defaultFileList}
                      data={iFormWithUpload.data}
                      headers={iFormWithUpload.headers}
                      showUploadList={iFormWithUpload.showUploadList}
                      multiple={iFormWithUpload.multiple}
                      accept={iFormWithUpload.accept}
                      beforeUpload={iFormWithUpload.beforeUpload}
                      onChange={iFormWithUpload.onChange}
                      onPreview={iFormWithUpload.onPreview}
                      onRemove={iFormWithUpload.onRemove}
                      action={iFormWithUpload.action}
                      supportServerRender={iFormWithUpload.supportServerRender}
                      disabled={iFormWithUpload.disabled}
                      className={iFormWithUpload.className}
                      listType={iFormWithUpload.listType}
                      uploadBottonStyle={iFormWithUpload.uploadBottonStyle}
                  />
                  {children}
              </FormItem>
          )
      }
}