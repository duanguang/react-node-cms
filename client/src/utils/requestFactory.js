import { logger } from './logger';
import { StateEnumResult } from "../model/common/commonResult";
import { Modal } from 'antd';
export var requestFactory;
(function (requestFactory) {
    function emitErrorHandler(response) {
        if (!response.result) {
            logger(new Error(JSON.stringify(response)), 'fatal');
            return;
        }
        if (response.state === StateEnumResult.AuthFail) {
            rejectLogin();
        }
        /*else if (response.isCommonErrorStatus()) {
         message.error(response.message);
         }*/
    }
    requestFactory.emitErrorHandler = emitErrorHandler;
    function rejectLogin(message) {
        Modal.warning({
            title: '请先登录',
            content: '您的帐号还未登录',
            onOk() {
                setTimeout(() => {
                    window.location.hash = '#user/login';
                }, 1000);
            },
        });
    }
})(requestFactory || (requestFactory = {}));
