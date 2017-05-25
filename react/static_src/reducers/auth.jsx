import { LOGIN_SUCCESS, LOGIN_TRY, LOGIN_FAILURE, LOGOUT } from '../actions/auth';
import { PROFILE_GET, PROFILE_SUCCESS, PROFILE_FAILURE } from "../actions/auth";
import update from 'react-addons-update';

const defaultState = {
    token: null,
    user: null,
    isLoading: false,
    errors: [],
    cookies: document.cookie.split('; ').reduce((dict, c) => {
        let pair = c.split('=');
        dict[pair[0]] = pair[1];
        return dict;
    }, {}),
};

export default (auth = defaultState, action) => {
    switch (action.type) {
        case LOGIN_TRY:
        case PROFILE_GET:
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
        case PROFILE_SUCCESS:
            return update(
                auth,
                {
                    isLoading: { $set: false },
                    user: { $set: action.payload[0] }
                }
            );
        case LOGIN_FAILURE:
        case PROFILE_FAILURE:
            return update(
                auth,
                { isLoading: { $set: false } }
            );
        case LOGOUT:
            return update(
                auth,
                {
                    token: { $set: null },
                    user: { $set: null }
                }
            );
        default:
            return auth
    }
};