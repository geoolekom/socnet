export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_TRY = 'LOGIN_TRY';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const tryLogIn = (username, password) => ({
    type: LOGIN_TRY,
    credentials: { username, password }
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS
});

export const loginFailure = () => ({
    type: LOGIN_FAILURE
});