import { CALL_API } from 'redux-api-middleware';

export default store => next => action => {
    if (store.getState().auth.token !== null && action.hasOwnProperty(CALL_API)) {
        console.log(action);
    }
    return next(action);
}