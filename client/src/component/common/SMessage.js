import { message } from 'antd';
export var SMessage;
(function (SMessage) {
    SMessage.info = (messageInfo) => {
        message.info(messageInfo);
    };
    SMessage.success = (messageInfo) => {
        message.success(messageInfo);
    };
    SMessage.error = (messageInfo) => {
        message.error(messageInfo);
    };
    SMessage.warning = (messageInfo) => {
        message.warning(messageInfo);
    };
    SMessage.loading = (messageInfo) => {
        const hide = message.loading(messageInfo, 0);
        // 异步手动移除
        setTimeout(hide, 2500);
    };
})(SMessage || (SMessage = {}));
