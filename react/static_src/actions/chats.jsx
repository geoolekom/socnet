export const CHATS_GET = 'CHATS_GET';
export const CHATS_SUCCESS = 'CHATS_SUCCESS';
export const CHATS_FAILURE = 'CHATS_FAILURE';

import { CALL_API } from 'redux-api-middleware';
import { objectToQuery } from '../helpers/web';

export const getChats = (params) => ({
    [CALL_API]: {
        endpoint: `/api/v1/chats/?${objectToQuery(params)}`,
        method: 'GET',
        types: [CHATS_GET, CHATS_SUCCESS, CHATS_FAILURE],
        credentials: 'same-origin',
    }
});

