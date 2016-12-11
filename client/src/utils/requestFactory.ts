/**
 * Created by xiaoduan on 2016/11/12.
 */
import {IResponseModel} from './fetchRequest';
import {logger} from './logger';
import {StateEnumResult} from "../model/common/commonResult";
import  {Modal} from 'antd';
export module requestFactory{
    export function emitErrorHandler(response: IResponseModel) {
        if (!response.result) {
            logger(new Error(JSON.stringify(response)), 'fatal');
            return;
        }
        if (response.state===StateEnumResult.AuthFail) {
            rejectLogin();
        }
        /*else if (response.isCommonErrorStatus()) {
         message.error(response.message);
         }*/
    }
    function rejectLogin(message?: string) {
        Modal.warning({
            title: '请先登录',
            content: '您的帐号还未登录',
            onOk() {
                setTimeout(()=>{
                    window.location.hash = '#user/login'
                },1000)

            },
        } as any);
    }
}
