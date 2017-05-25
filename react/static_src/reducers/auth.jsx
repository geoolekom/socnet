import { LOGIN_SUCCESS, LOGIN_TRY, LOGIN_FAILURE } from '../actions/auth';
import update from 'react-addons-update';

const defaultState = {
    token: null,
    isLoading: false,
    errors: [],
    cookies: document.cookie.split('; ').reduce((dict, c) => {
        let pair = c.split('=');
        dict[pair[0]] = pair[1];
        return dict;
    }, {})
};

export default (auth = defaultState, action) => {
    switch (action.type) {
        case LOGIN_TRY:
            return update(
                auth,
                { isLoading: { $set: true } }
            );
        case LOGIN_SUCCESS:
            return update(
                auth,
                {
                    token: { $set: action.payload.token },
                    isLoading: { $set: false }
                }
            );
        case LOGIN_FAILURE:
            return update(
                auth,
                { isLoading: { $set: false } }
            );
        default:
            return auth
    }
};