/**
 * Created by XD on 2016/9/17.
 */
import * as React from 'react';

interface IPageContext {
    page:IPageContextState
}

export interface IPageContextProps {
    page?:IPageContextState
}

interface IPageContextState {
    loading?:boolean;
    submitting?:boolean;
    progress?:boolean;
}

export interface IPageChildState {
    loading?:boolean;
    submitting?:boolean;
    progress?:boolean;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

let mountedContainerInstance = null;
const mountedWrapperInstances = [];

interface IPageContainerProps {

}

interface IPageContainerState extends IPageContextState {

}

export class PageContainer extends React.Component<IPageContainerProps,IPageContainerState> {
    static childContextTypes:React.ValidationMap<any> = {
        page: React.PropTypes.any
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            submitting: false,
            progress:false
        }
    }

    getChildContext():IPageContext {
        return {
            page: {
                loading: this.state.loading,
                submitting: this.state.submitting,
                progress:this.state.progress
            }
        };
    }

    componentWillMount() {
        if (mountedContainerInstance) {
            throw new Error("page container must single.");
        }
        mountedContainerInstance = this;
    }

    componentWillUnmount() {
        mountedContainerInstance = null;
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}

function emitChange() {
    let newState:IPageContextState = {loading: false, submitting: false,progress:false};
    mountedWrapperInstances.forEach((wrapper:PageWrapper) => {
        let temp = wrapper.mapPropsToPageState(wrapper.instance.props);
        newState.loading = newState.loading || temp.loading;
        newState.submitting = newState.submitting || temp.submitting;
        newState.progress=newState.progress||temp.progress;
    });

    let state = mountedContainerInstance.state;
    for (let key in newState) {
        if (newState[key] != state[key]) {
            mountedContainerInstance.setState(newState);
            break;
        }
    }
}

class PageWrapper {
    instance:React.ReactElement<any>;
    mapPropsToPageState:(props)=>IPageChildState;

    constructor(instance, mapPropsToPageState) {
        this.instance = instance;
        this.mapPropsToPageState = mapPropsToPageState;
    }
}

export function page(mapPropsToPageState?:(props)=>IPageChildState):(component:React.ComponentClass<any>)=>any {
    return (component)=> {
        return React.createClass<any,any>({
            displayName: 'page(' + getDisplayName(component) + ')',
            contextTypes: {page: React.PropTypes.any},
            componentWillMount: function componentWillMount() {

                if (this.context.page && mapPropsToPageState) {
                    mountedWrapperInstances.push(new PageWrapper(this, mapPropsToPageState));
                    emitChange();
                }
            },

            componentDidUpdate: function componentDidUpdate() {
                if (this.context.page && mapPropsToPageState) {
                    emitChange();
                }
            },

            componentWillUnmount: function componentWillUnmount() {
                if (this.context.page && mapPropsToPageState) {
                    var index = mountedWrapperInstances.findIndex((item)=>item.instance == this);
                    mountedWrapperInstances.splice(index, 1);
                    emitChange();
                }
            },

            render: function render() {
                return React.createElement(component, Object.assign({}, this.props, {page: this.context.page}));
            }
        });
    };
}


export function noSubmitting(target:any, propertyKey:string, descriptor:PropertyDescriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function () {
        if (this.props.page && this.props.page.submitting) {
            return;
        }
        oldValue.apply(this, arguments);
    };
    return descriptor;
}
