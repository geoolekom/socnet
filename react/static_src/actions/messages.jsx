export const MESSAGES_GET = 'MESSAGES_GET';
export const MESSAGES_SUCCESS = 'MESSAGES_SUCCESS';
export const MESSAGES_FAILURE = 'MESSAGES_FAILURE';

import { CALL_API } from 'redux-api-middleware';
import { objectToQuery } from '../helpers/web';

export const getMessages = (params) => ({
    [CALL_API]: {
        endpoint: `/api/v1/messages/?${objectToQuery(params)}`,
        method: 'GET',
        types: [MESSAGES_GET, MESSAGES_SUCCESS, MESSAGES_FAILURE],
        credentials: 'same-origin',
    }
});
