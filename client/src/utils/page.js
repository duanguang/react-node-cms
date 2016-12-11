import * as React from 'react';
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
let mountedContainerInstance = null;
const mountedWrapperInstances = [];
export class PageContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            submitting: false,
            progress: false
        };
    }
    getChildContext() {
        return {
            page: {
                loading: this.state.loading,
                submitting: this.state.submitting,
                progress: this.state.progress
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
        return React.createElement("div", null, this.props.children);
    }
}
PageContainer.childContextTypes = {
    page: React.PropTypes.any
};
function emitChange() {
    let newState = { loading: false, submitting: false, progress: false };
    mountedWrapperInstances.forEach((wrapper) => {
        let temp = wrapper.mapPropsToPageState(wrapper.instance.props);
        newState.loading = newState.loading || temp.loading;
        newState.submitting = newState.submitting || temp.submitting;
        newState.progress = newState.progress || temp.progress;
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
    constructor(instance, mapPropsToPageState) {
        this.instance = instance;
        this.mapPropsToPageState = mapPropsToPageState;
    }
}
export function page(mapPropsToPageState) {
    return (component) => {
        return React.createClass({
            displayName: 'page(' + getDisplayName(component) + ')',
            contextTypes: { page: React.PropTypes.any },
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
                    var index = mountedWrapperInstances.findIndex((item) => item.instance == this);
                    mountedWrapperInstances.splice(index, 1);
                    emitChange();
                }
            },
            render: function render() {
                return React.createElement(component, Object.assign({}, this.props, { page: this.context.page }));
            }
        });
    };
}
export function noSubmitting(target, propertyKey, descriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function () {
        if (this.props.page && this.props.page.submitting) {
            return;
        }
        oldValue.apply(this, arguments);
    };
    return descriptor;
}
