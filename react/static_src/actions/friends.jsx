export const FRIENDS_GET = 'FRIENDS_GET';
export const FRIENDS_SUCCESS = 'FRIENDS_SUCCESS';
export const FRIENDS_FAILURE = 'FRIENDS_FAILURE';

import { CALL_API } from 'redux-api-middleware';
import { objectToQuery } from '../utils';

export const getFriends = (params) => ({
    [CALL_API]: {
        endpoint: `/api/v1/friends/?${objectToQuery(params)}`,
        method: 'GET',
        types: [FRIENDS_GET, FRIENDS_SUCCESS, FRIENDS_FAILURE],
        credentials: 'same-origin',
    }
});
