///<reference path="../../../../typings/node/node.d.ts"/>
export type IModalButton = 'OK'
export const OKButton:IModalButton = 'OK';

interface IModalOption {
    content?:string;
    btn?:IModalButton[];
    end?:()=>void;
}

interface IModal {
    open(opt:IModalOption):void;
}

declare global {
    interface Window {
        layer:IModal
    }
}

export function open(opt:IModalOption) {
    window.layer.open(opt);
}

export function info(content:string, opt?:IModalOption) {
    opt = Object.assign({}, {
        content: content,
        btn: [OKButton]
    }, opt);
    debugger;
    open(opt);
}

export function warning(content:string, opt?:IModalOption) {
    opt = Object.assign({}, {
        content: content,
        btn: [OKButton]
    }, opt);
    open(opt);
}

export function error(content:string, opt?:IModalOption) {
    opt = Object.assign({}, {
        content: content,
        btn: [OKButton]
    }, opt);
    open(opt);
}