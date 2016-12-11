/**
 * Created by xiaoduan on 2016/11/13.
 */
import * as React from 'react';
import Progress from 'react-progress-2';
/*import {IStoreState} from "../../redux/reducers/rootReducer";*/
import {page, IPageContextProps} from "../../utils/page";
interface IPageProgressStateProps extends IPageContextProps{
   // loaded?: boolean;
}
/*@connect(
    (state: IStoreState): IPageProgressStateProps => {
        return {loaded: state.reduxAsyncConnect.loaded}
    }
)*/
@page()
export class PageProgress extends React.Component<IPageProgressStateProps,void>{
    private isMount = false;
    constructor(props, context) {
        super(props, context);
    }
    public handleVisibility(){
        const {progress} = this.props.page;
        return progress ? Progress.show() : Progress.hide();
    }
    
    public componentDidMount(){
        this.isMount = true;
    }

    render() {
        this.isMount && this.handleVisibility();
        return (
            <Progress.Component />
        )
    }
}