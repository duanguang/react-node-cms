/**
 * Created by DuanG on 2016/11/16.
 */
import * as routeActions from 'react-router-redux';
import LocationDescriptor = HistoryModule.LocationDescriptor;

export function go(num: number) {
    return routeActions.go(num);
}

export function goBack() {
    return routeActions.goBack();
}

export function push(path:LocationDescriptor) {
    return routeActions.push(path);
}

export function replace(path:LocationDescriptor) {
    return routeActions.replace(path);
}