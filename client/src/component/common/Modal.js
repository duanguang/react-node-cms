export const OKButton = 'OK';
export function open(opt) {
    window.layer.open(opt);
}
export function info(content, opt) {
    opt = Object.assign({}, {
        content: content,
        btn: [OKButton]
    }, opt);
    debugger;
    open(opt);
}
export function warning(content, opt) {
    opt = Object.assign({}, {
        content: content,
        btn: [OKButton]
    }, opt);
    open(opt);
}
export function error(content, opt) {
    opt = Object.assign({}, {
        content: content,
        btn: [OKButton]
    }, opt);
    open(opt);
}
