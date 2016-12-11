import * as React from 'react';
import {Router} from 'react-router';
import RouteProps = ReactRouter.RouteProps;
//import {Router, applyRouterMiddleware} from 'react-router';
//import useScroll from 'react-router-scroll'
import {WXUtil} from './wexin';
import {ReduxAsyncConnect} from 'redux-async-connect';
interface WXRouteProps extends RouteProps {
    title?:string;
}

export function createElement(Component, props) {
    WXUtil.setWxTitle(props.route.title);
    return (
        <Component {...props} />
    )
}

export class WXRouter extends Router {
    render() {
        let props = Object.assign({}, this.props, {
            createElement: createElement,
            //render: applyRouterMiddleware(useScroll())
            render:(props) => <ReduxAsyncConnect {...props}/>
        });
        return (
            <Router {...props as any}/>
        )
    }
}