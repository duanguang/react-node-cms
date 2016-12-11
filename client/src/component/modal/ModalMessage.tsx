/**
 * Created by XD on 2016/9/6.
 */
import  {Modal} from 'antd';
import * as React from 'react';
import ComponentClass = __React.ComponentClass;

export interface IModalMessageProps{
    modalInfo?:(title:string,content:any)=>void;
    modalSuccess?:(title:string,content:any,okFunction?:Function)=>void;
    modalError?:(title:string,content:any)=>void;
    modalWarning?:(title:string,content:any,okFunction?:Function)=>void;
}
export const ModalMessage=(Component: ComponentClass<any>)=>{
     return class Modales extends React.Component<void,void>{
         constructor(props, context) {
             super(props, context);
         }
         modalInfo(title:string,content:any){//信息提示样式
             Modal.info({
                 title:title,
                 content: (
                     content
                 ),
             } as any);
         }

         modalSuccess(title:string,content:any,okFunction?:Function){
             Modal.success({
                 title: title,
                 content: content,
                 onOk() {
                     if(okFunction){
                         okFunction();
                     }
                 },
             } as any);
         }
         modalError(title:string,content:any){
             Modal.error({
                 title: title,
                 content: content,
             } as any);
         }
         modalWarning(title:string,content:any,okFunction?:Function){
             Modal.warning({
                 title: title,
                 content: content,
                 onOk() {
                     if(okFunction){
                         okFunction();
                     }
                 },
             } as any);
         }
         render(){
             return(
                 <Component
                     modalInfo={this.modalInfo.bind(this)}
                     modalSuccess={this.modalSuccess.bind(this)}
                     modalError={this.modalError.bind(this)}
                     modalWarning={this.modalWarning.bind(this)}
                     {...this.props} />
             )
         }
     } as any;
}