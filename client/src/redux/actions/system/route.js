import * as routeActions from 'react-router-redux';
export function go(num) {
    return routeActions.go(num);
}
export function goBack() {
    return routeActions.goBack();
}
export function push(path) {
    return routeActions.push(path);
}
export function replace(path) {
    return routeActions.replace(path);
}
