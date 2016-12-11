import * as React from 'react';
export class Img extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        if (this.state.src && this.props.handleClick) {
            this.props.handleClick();
        }
    }
    imgRequest(src) {
        if (src) {
            let _this = this;
            let xhr = new XMLHttpRequest();
            xhr.open(`GET`, src, true);
            xhr.responseType = `arraybuffer`;
            xhr.withCredentials = true;
            xhr.onload = function () {
                let base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(this.response)));
                _this.props.obtainTokenCb(this.getResponseHeader('Kad_O2O_Request'));
                //todo: 根据返回的content type替换image/jpeg
                _this.setState({
                    src: `data:image/jpeg;base64,${base64String}`
                });
            };
            xhr.send();
        }
    }
    componentDidMount() {
        this.imgRequest(this.props.src);
    }
    componentWillReceiveProps(props) {
        if (this.props != props && this.props.src != props.src) {
            this.imgRequest(props.src);
        }
    }
    render() {
        const { className } = this.props;
        return React.createElement("img", {className: className, src: this.state.src, onClick: this.handleClick});
    }
}
export default class Captcha extends React.Component {
    constructor(props) {
        super(props);
        this.validateCodeUrl = `http://127.0.0.1:3006/ValidateCode`;
        this.state = {
            counter: 0
        };
    }
    handleCaptchaClick() {
        const { counter } = this.state;
        this.setState({
            counter: counter + 1
        });
    }
    render() {
        const { className, obtainTokenCb, reloadClassName } = this.props;
        if (obtainTokenCb) {
            return (React.createElement("span", null, React.createElement(Img, {className: className, src: `${this.validateCodeUrl}?${this.state.counter}`, obtainTokenCb: obtainTokenCb}), React.createElement("a", {className: reloadClassName, onClick: this.handleCaptchaClick.bind(this)}, "看不清,换一张")));
        }
        return null;
    }
}
