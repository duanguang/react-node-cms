/**
 * Created by xiaoduan on 2016/11/19.
 */
import * as React from 'react';
import {connect} from 'react-redux';
import {PromiseState} from "../../../utils/redux";
import {CurrentMenu} from "../../../model/menu/currentMenu";
import {IMenuIndexStore} from "../../../redux/reducers/menu/menuIndex";
import Dispatch = Redux.Dispatch;
import * as MenuIndexActions from 'redux/actions/menu/menuIndex';

/*interface ISetCurrentMenuStateProps{
    currentMenu?:PromiseState<CurrentMenu>;
}*/

interface ISetCurrentMenuDispatchProps{
    onGetCurrentMenu?:(currentMenu:CurrentMenu)=>void;
}

interface ISetCurrentMenuProps{
   currentMenu:CurrentMenu;
}

@connect<void,ISetCurrentMenuDispatchProps,ISetCurrentMenuProps>(
    (state:IMenuIndexStore)=>{
        return{}
    },
    (dispatch:Dispatch)=>{
        return{
            onGetCurrentMenu:(currentMenu:CurrentMenu)=>dispatch(MenuIndexActions.getCurrentMenu(currentMenu))
        }
    }
)
export default class SetCurrentMenu extends React.Component<ISetCurrentMenuDispatchProps&ISetCurrentMenuProps,void>{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.onGetCurrentMenu(this.props.currentMenu);
    }
    render(){
        return null;
    }
}