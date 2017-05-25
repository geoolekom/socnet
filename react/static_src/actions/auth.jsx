export const LOGIN_TRY = 'LOGIN_TRY';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const PROFILE_GET = 'PROFILE_GET';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';

export const LOGOUT = 'LOGOUT';

import { CALL_API } from 'redux-api-middleware';

export const login = (username, password) => ({
    [CALL_API]: {
        endpoint: '/api/v1/auth/',
        method: 'POST',
        types: [LOGIN_TRY, LOGIN_SUCCESS, LOGIN_FAILURE],
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-Type': 'application/json'
        },
    }
});

export const logout = () => ({ type: LOGOUT });

export const getProfile = () => ({
    [CALL_API]: {
        endpoint: '/api/v1/profile/',
        method: 'GET',
        types: [PROFILE_GET, PROFILE_SUCCESS, PROFILE_FAILURE],
        headers: {
            'Content-Type': 'application/json'
        },
    }
});