import * as React from 'react';
import {connect} from 'react-redux';
import {DeviceUtil} from '../../utils/device';
import * as FastClick from "fastclick";
import {PageContainer} from "../../utils/page";
import PageToast from "../../component/common/PageToast";
import 'react-progress-2/main.css';
import {PageProgress} from "../../component/common/PageProgress";
/*
class App extends React.Component<any,any> {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return state.app;
    },
    (dispatch) => {
        return {
        };
    }
)(App)*/

interface IAppStateProps {
}

interface IAppDispatchProps {

}

@connect<IAppStateProps,IAppDispatchProps,void>(
    (state) => {
        return state.app;
    },
    (dispatch)=> {
        return {}
    }
)
export default class App extends React.Component<IAppStateProps & IAppDispatchProps,void> {
    /*    static childContextTypes:React.ValidationMap<any> = {
     page: React.PropTypes.any
     };*/

    constructor(props, context) {
        super(props, context);
    }

    /*    getChildContext():IPageContext {
     return {page: {loading: true}};
     }*/

    componentDidMount() {
        // if (DeviceUtil.isIOS()) {
       // new FastClick(document.body);
        // }
    }

    render() {
        return (
            <PageContainer>
                <PageToast/>
                <PageProgress />
                {this.props.children}
            </PageContainer>
        );
    }
}