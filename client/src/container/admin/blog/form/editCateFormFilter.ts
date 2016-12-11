/**
 * Created by xiaoduan on 2016/11/22.
 */
import {LabelWithInputModel, IFormInputProps} from "../../../../component/form/FormInput";
import {AntButtonModel} from "../../../../component/form/FormSubmitButton";
import {IAntdProps,IAntdRule} from "custom-antd";
import {icon} from "utils/icon";
import {validatorType} from "utils/regex";
import {registFormBaseCls} from "../../user/form/registFormFilter";
import {IEditCateModalProps} from "../EditCateModal";
import {CateEntity} from "../../../../model/blog/cateTableEntity";

export const loginFormBaseCls='login-form';
export var getEditCateFromFilterProps=((props:IEditCateModalProps)=>{
    let {cateEntity}=props;
    //账户参数 start
    let cateNameRules=[{
        required:true,
        errMessage:'分类名次长度为 1-10 个字符',
        regex:/^[(\u0391-\uFFE5)|(a-z)\w]{1,10}$/i,
    }];

    let cateName:IAntdProps={
        id:'CateName',
        name:'CateName',
        placeholder:'分类名称',
        className:`${loginFormBaseCls}-user`,
        initialValue:cateEntity?cateEntity.cateName:''
    };
    let cateNameOptions:IFormInputProps={

    };
    let id:IAntdProps={
        id:'Id',
        name:'Id',
        type:'hidden',
        placeholder:'分类标识',
        className:'hide',
        initialValue:cateEntity?cateEntity.id:''
    }
    let idOptions:IFormInputProps={

    }
    //end


    const filterProps=[
        new LabelWithInputModel(cateName,cateNameRules,cateNameOptions),
        new LabelWithInputModel(id,[],idOptions),
        new AntButtonModel('确定', (fields: any)=> {
            fields.validateFieldsAndScroll((errors,value)=>{
                if (!!errors) {
                    console.log('Errors in form!!!');
                    return;
                }
                else {
                    if(value.Id){
                        props.onEditCateClick(value.CateName,value.Id);
                    }
                    else {
                        props.onAddCateClick(value.CateName);
                    }

                }

            })
            //
        },'tn btn-lg btn-login btn-block')
    ];
    getEditCateFromFilterProps = (props)=> {
        let entity=CateEntity.transform(props.cateEntity||new CateEntity());
        filterProps.map((item)=>{

            if(item instanceof LabelWithInputModel){
                item.iAntdProps.initialValue=entity[item.iAntdProps.id];
            }
        })
        return filterProps;
    };
    return filterProps;
});

/*filterProps.map((item)=>{
 if(item instanceof LabelWithInputModel){
 Object.keys(props.cateEntity).forEach((key=>{
 if(equal(key.toString(),item.iAntdInput.id,StringComparison.OrdinalIgnoreCase)){
 item.iVInput.initialValue=props.cateEntity[key];
 }

 }))
 }
 })*/