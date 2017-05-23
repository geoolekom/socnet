export const REQUESTS_GET = 'REQUESTS_GET';
export const REQUESTS_SUCCESS = 'REQUESTS_SUCCESS';
export const REQUESTS_FAILURE = 'REQUESTS_FAILURE';

export const ACCEPT_REQUEST = 'ACCEPT_REQUEST_GET';
export const ACCEPT_REQUEST_SUCCESS = 'ACCEPT_REQUEST_SUCCESS';
export const ACCEPT_REQUEST_FAILURE = 'ACCEPT_REQUEST_FAILURE';

export const REFUSE_REQUEST = 'REFUSE_REQUEST_GET';
export const REFUSE_REQUEST_SUCCESS = 'REFUSE_REQUEST_SUCCESS';
export const REFUSE_REQUEST_FAILURE = 'REFUSE_REQUEST_FAILURE';

import { CALL_API } from 'redux-api-middleware';

export const getRequests = () => ({
    [CALL_API]: {
        endpoint: '/api/v1/requests/',
        method: 'GET',
        types: [REQUESTS_GET, REQUESTS_SUCCESS, REQUESTS_FAILURE],
        credentials: 'same-origin',
    }
});

export const acceptRequest = (id, token) => ({
    [CALL_API]: {
        endpoint: `/api/v1/requests/${id}/`,
        method: 'PATCH',
        types: [ACCEPT_REQUEST, ACCEPT_REQUEST_SUCCESS, ACCEPT_REQUEST_FAILURE],
        credentials: 'same-origin',
        body: JSON.stringify({
            accepted: true
        }),
        headers: {
            'X-CSRFToken': token,
            'Content-Type': 'application/json'
        }
    }
});

export const refuseRequest = (id, token) => ({
    [CALL_API]: {
        endpoint: `/api/v1/requests/${id}/`,
        method: 'PATCH',
        types: [REFUSE_REQUEST, REFUSE_REQUEST_SUCCESS, REFUSE_REQUEST_FAILURE],
        credentials: 'same-origin',
        body: JSON.stringify({
            accepted: false
        }),
        headers: {
            'X-CSRFToken': token,
            'Content-Type': 'application/json'
        }
    }
});
