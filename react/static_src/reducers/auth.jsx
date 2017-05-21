import { LOGIN_SUCCESS, LOGIN_TRY, LOGIN_FAILURE } from '../actions/auth';

const defaultState = {
    credentials: {},
    loggedIn: false,
    errors: [],
};

export default (auth = defaultState, action) => {
    switch (action.type) {
        case LOGIN_TRY:
            return {
                credentials: action.credentials,
                loggedIn: auth.loggedIn,
                errors: auth.errors,
            };
        case LOGIN_SUCCESS:
            return {
                credentials: auth.credentials,
                loggedIn: true,
                errors: auth.errors,
            };
        case LOGIN_FAILURE:
            return {
                credentials: {},
                loggedIn: false,
                errors: action.errors,
            };
        default:
            return auth
    }
};