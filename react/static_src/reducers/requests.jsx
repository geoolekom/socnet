import { REQUESTS_GET, REQUESTS_SUCCESS, REQUESTS_FAILURE } from '../actions/requests';
import { ACCEPT_REQUEST, ACCEPT_REQUEST_SUCCESS, ACCEPT_REQUEST_FAILURE } from '../actions/requests';
import { REFUSE_REQUEST, REFUSE_REQUEST_SUCCESS, REFUSE_REQUEST_FAILURE } from '../actions/requests';
import update from 'react-addons-update';

const defaultState = {
    ids: [],
    data: {},
    isLoading: false,
    errors: []
};

export default (requests = defaultState, action) => {
    switch (action.type) {
        case REQUESTS_FAILURE:
        case ACCEPT_REQUEST_FAILURE:
        case REFUSE_REQUEST_FAILURE:
            return update(
                requests,
                {
                    isLoading: { $set: false },
                    errors: { $set: action.payload },
                }

            );
        case REQUESTS_GET:
        case ACCEPT_REQUEST:
        case REFUSE_REQUEST:
            return update(
                requests,
                { isLoading: { $set: true } }
            );
        case REQUESTS_SUCCESS:
            return update(
                requests,
                {
                    isLoading: { $set: false },
                    ids: { $set: action.payload.result },
                    data: { $merge: action.payload.entities.requests }
                }
            );
        case ACCEPT_REQUEST_SUCCESS:
        case REFUSE_REQUEST_SUCCESS:
            return update(
                requests,
                {
                    isLoading: { $set: false },
                    data: { $merge: action.payload.entities.requests },
                }
            );
        default:
            return requests;
    }
};