import { Modal } from 'antd';
import * as React from 'react';
export const ModalMessage = (Component) => {
    return class Modales extends React.Component {
        constructor(props, context) {
            super(props, context);
        }
        modalInfo(title, content) {
            Modal.info({
                title: title,
                content: (content),
            });
        }
        modalSuccess(title, content, okFunction) {
            Modal.success({
                title: title,
                content: content,
                onOk() {
                    if (okFunction) {
                        okFunction();
                    }
                },
            });
        }
        modalError(title, content) {
            Modal.error({
                title: title,
                content: content,
            });
        }
        modalWarning(title, content, okFunction) {
            Modal.warning({
                title: title,
                content: content,
                onOk() {
                    if (okFunction) {
                        okFunction();
                    }
                },
            });
        }
        render() {
            return (React.createElement(Component, React.__spread({modalInfo: this.modalInfo.bind(this), modalSuccess: this.modalSuccess.bind(this), modalError: this.modalError.bind(this), modalWarning: this.modalWarning.bind(this)}, this.props)));
        }
    }
    ;
};
