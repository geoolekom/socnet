import { CALL_API } from 'redux-api-middleware';
import { LOGIN_SUCCESS, getProfile } from '../actions/auth';

export const authentication = store => next => action => {
    const token = store.getState().auth.token;
    if (token !== null && action.hasOwnProperty(CALL_API)) {
        if (!action[CALL_API].headers) {
            action[CALL_API].headers = {};
        }
        action[CALL_API].headers['Authorization'] = `Token ${token}`;
    }
    return next(action);
};

export default store => next => action => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            store.dispatch(getProfile());
            break;
        default:
            break;
    }
    return next(action)
};
