import * as React from 'react';
import { Router } from 'react-router';
import { WXUtil } from './wexin';
import { ReduxAsyncConnect } from 'redux-async-connect';
export function createElement(Component, props) {
    WXUtil.setWxTitle(props.route.title);
    return (React.createElement(Component, React.__spread({}, props)));
}
export class WXRouter extends Router {
    render() {
        let props = Object.assign({}, this.props, {
            createElement: createElement,
            //render: applyRouterMiddleware(useScroll())
            render: (props) => React.createElement(ReduxAsyncConnect, React.__spread({}, props))
        });
        return (React.createElement(Router, React.__spread({}, props)));
    }
}
