/*import ComponentClass = __React.ComponentClass;*/
import ReactElement = __React.ReactElement;
import RouteProps = ReactRouter.RouteProps;

declare var __DEV__:boolean;
declare var __PRODUCTION__;
interface window extends Window {
    __initialState__:any;
    devToolsExtension:Function;
    opera:any;
}

interface ITargetInst<T extends Element> {
    _currentElement:ReactElement<T>;
}

interface IReactMouseEvent<T extends Element> extends MouseEvent {
    _targetInst:ITargetInst<T>
}

interface WXRouteProps extends RouteProps {
    title?:string;
}

type IPromise = Promise<any>;
