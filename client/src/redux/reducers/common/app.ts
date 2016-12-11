import {IAction, combineReducers} from 'redux';


export interface IAppReducer {
    user:any;
    modal:any;
    loading:number;
}

const initState:IAppReducer = {
    user: null,
    modal: null,
    loading: 0
};

function user(state = initState.user, action:IAction) {
    return state;
}

function modal(state = initState.modal, action:IAction) {
    return state;
}

function loading(state = initState.loading, action:IAction) {
    return state;
}

export default combineReducers({
    user,
    modal,
    loading
})