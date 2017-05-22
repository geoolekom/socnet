import { REQUESTS_GET, REQUESTS_SUCCESS, REQUESTS_FAILURE } from '../actions/requests';
import { ACCEPT_REQUEST, ACCEPT_REQUEST_SUCCESS, ACCEPT_REQUEST_FAILURE } from '../actions/requests';
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
            return update(
                requests,
                {
                    isLoading: { $set: false },
                    errors: { $set: action.payload },
                }

            );
        case REQUESTS_GET:
            return update(
                requests,
                { isLoading: { $set: true } }
            );
        case REQUESTS_SUCCESS:
            return update(
                requests,
                {
                    isLoading: { $set: false },
                    ids: { $set: action.payload.map(request => request.id) },
                    data: { $merge: action.payload.reduce((dict, request) => {dict[request.id] = request; return dict; }, {}) }
                }
            );
        case ACCEPT_REQUEST:
            return update(
                requests,
                { isLoading: { $set: true } }
            );
        case ACCEPT_REQUEST_SUCCESS:
            return update(
                requests,
                {
                    isLoading: { $set: false },
                    ids: { $splice: [[requests.ids.indexOf(action.payload.id), 1]] },
                }
            );
        default:
            return requests;
    }
};