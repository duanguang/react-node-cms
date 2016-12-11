/**
 * Created by xiaoduan on 2016/10/28.
 */

import * as React from 'react';
import {message,Modal} from 'antd';
import * as objectAssign from 'object-assign';
import ReactNode=__React.ReactNode;
import ReactChild=__React.ReactChild;
import ReactElement=__React.ReactElement;
import CreateFormOptions=Antd.CreateFormOptions;

export default class GenericComponent<Props,State> extends React.Component<Props,State>{
    private confirm= Modal.confirm;
    protected passPropsChildren<T>(children:ReactNode,reducedProps:T){
        return React.Children.map(children,
            (child:ReactElement<any>)=>React.cloneElement(child,reducedProps)
        );
    }
    /*protected progressHide(time?:number){
        let times=time?time:500;
        setTimeout(()=> {
            Progress.hide();
        }, times)
    }*/
    protected showConfirm(title:string,content:string,okFunction?:Function,cancelFunction?:Function){
        this.confirm({
            title: title,
            content: content?content:'',
            onOk() {
                if(okFunction){
                    okFunction();
                }
            },
            onCancel() {
                if(cancelFunction){
                    cancelFunction();
                }
            },
        } as any);
    }
    protected showSuccessMessage(msg:string){
        message.success(msg);
    }
    protected showErrorMessage(msg:string){
        message.error(msg);
    }
    protected showWarningMessage(msg:string){
        message.warning(msg);
    }
}
