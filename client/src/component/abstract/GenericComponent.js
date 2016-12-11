/**
 * Created by xiaoduan on 2016/10/28.
 */
import * as React from 'react';
import { message, Modal } from 'antd';
export default class GenericComponent extends React.Component {
    constructor(...args) {
        super(...args);
        this.confirm = Modal.confirm;
    }
    passPropsChildren(children, reducedProps) {
        return React.Children.map(children, (child) => React.cloneElement(child, reducedProps));
    }
    /*protected progressHide(time?:number){
        let times=time?time:500;
        setTimeout(()=> {
            Progress.hide();
        }, times)
    }*/
    showConfirm(title, content, okFunction, cancelFunction) {
        this.confirm({
            title: title,
            content: content ? content : '',
            onOk() {
                if (okFunction) {
                    okFunction();
                }
            },
            onCancel() {
                if (cancelFunction) {
                    cancelFunction();
                }
            },
        });
    }
    showSuccessMessage(msg) {
        message.success(msg);
    }
    showErrorMessage(msg) {
        message.error(msg);
    }
    showWarningMessage(msg) {
        message.warning(msg);
    }
}
