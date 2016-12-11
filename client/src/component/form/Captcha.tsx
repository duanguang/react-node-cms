/**
 * Created by xiaoduan on 2016/10/30.
 */
import * as React from 'react';
import {IAntdCaptchaProps} from "custom-antd";

interface IImgProps{
    src: string;
    obtainTokenCb: (captchaToken: string)=>void;
    handleClick?: Function;
    className?: string;
}

interface IImgState{
    src:string;
}

export class Img extends React.Component<IImgProps,IImgState>{
    constructor(props:IImgProps){
        super(props);
        this.state={
            src:''
        };
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick() {
        if (this.state.src && this.props.handleClick) {
            this.props.handleClick();
        }
    }

    imgRequest(src: string) {
        if (src) {
            let _this = this;
            let xhr = new XMLHttpRequest();
            xhr.open(`GET`, src, true);
            xhr.responseType = `arraybuffer`;
            xhr.withCredentials=true;
            xhr.onload = function () {
                let base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(this.response)));
                _this.props.obtainTokenCb(this.getResponseHeader('Kad_O2O_Request'));
                //todo: 根据返回的content type替换image/jpeg
                _this.setState({
                    src: `data:image/jpeg;base64,${base64String}`
                })
            };
            xhr.send();
        }
    }
    componentDidMount() {
        this.imgRequest(this.props.src);
    }
    componentWillReceiveProps(props: IImgProps) {
        if (this.props != props && this.props.src != props.src) {
            this.imgRequest(props.src);
        }
    }
    render(){
        const {className}=this.props;
        return <img className={className} src={this.state.src} onClick={this.handleClick}/>;
    }
}

interface ICaptchaProps extends IAntdCaptchaProps{

}

interface ICaptchaStates {
    counter: number
}

export default class Captcha extends React.Component<ICaptchaProps,ICaptchaStates> {
    private validateCodeUrl = `http://127.0.0.1:3006/ValidateCode`;

    constructor(props: ICaptchaProps) {
        super(props);
        this.state={
            counter:0
        }
    }
    handleCaptchaClick(){
        const {counter} = this.state;
        this.setState({
            counter: counter + 1
        })
    }
    render() {
        const {className,obtainTokenCb,reloadClassName} = this.props;
        if(obtainTokenCb){
            return (
                <span>
                    <Img className={className} src={`${this.validateCodeUrl}?${this.state.counter}`} obtainTokenCb={obtainTokenCb}/>
                    <a className={reloadClassName} onClick={this.handleCaptchaClick.bind(this)}>看不清,换一张</a>
                </span>

            )
        }
        return null;
    }
}