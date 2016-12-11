import { combineReducers } from 'redux';
const initState = {
    user: null,
    modal: null,
    loading: 0
};
function user(state = initState.user, action) {
    return state;
}
function modal(state = initState.modal, action) {
    return state;
}
function loading(state = initState.loading, action) {
    return state;
}
export default combineReducers({
    user,
    modal,
    loading
});
