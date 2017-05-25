export const LOGIN_TRY = 'LOGIN_TRY';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

import { CALL_API } from 'redux-api-middleware';

export const login = (username, password) => {
    return {
        [CALL_API]: {
            endpoint: '/api/v1/auth/',
            method: 'POST',
            types: [LOGIN_TRY, LOGIN_SUCCESS, LOGIN_FAILURE],
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        }
    }
};
