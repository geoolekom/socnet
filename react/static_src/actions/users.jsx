export const USER_CREATED = 'USER_CREATED';
export const USERS_GET = 'USERS_GET';
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';

import { CALL_API } from 'redux-api-middleware';
import { objectToQuery } from '../helpers/web';

export const getUsers = (params) => ({
    [CALL_API]: {
        endpoint: `/api/v1/users/${objectToQuery(params)}`,
        method: 'GET',
        types: [USERS_GET, USERS_SUCCESS, USERS_FAILURE]
    }
});
