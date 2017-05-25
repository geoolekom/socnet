import { SEARCH_TRY, SEARCH_SUCCESS, SEARCH_FAILURE } from '../actions/search';
import update from 'react-addons-update';

const defaultState = {
    isLoading: false,
    results: {},
    errors: []
};

export default (search = defaultState, action) => {
    switch (action.type) {
        case SEARCH_FAILURE:
            return update(
                search,
                {
                    isLoading: { $set: false },
                    errors: { $set: action.payload },
                }

            );
        case SEARCH_TRY:
            return update(
                search,
                { isLoading: { $set: true } }
            );
        case SEARCH_SUCCESS:
            return update(
                search,
                {
                    isLoading: { $set: false },
                    results: { $merge: action.payload }
                }
            );
        default:
            return search;
    }
};