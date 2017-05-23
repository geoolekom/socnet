import { FRIENDS_GET, FRIENDS_SUCCESS, FRIENDS_FAILURE } from '../actions/friends';
import { ACCEPT_REQUEST_SUCCESS } from '../actions/requests';
import update from 'react-addons-update';

const defaultState = {
    ids: [],
    data: {},
    isLoading: false,
    errors: []
};

export default (friends = defaultState, action) => {
    switch (action.type) {
        case FRIENDS_GET:
            return update(
                friends,
                { isLoading: { $set: true } }
            );
        case FRIENDS_SUCCESS:
            return update(
                friends,
                {
                    isLoading: { $set: false },
                    ids: { $set: action.payload.map(friend => friend.id) },
                    data: { $merge: action.payload.reduce((dict, friend) => {dict[friend.id] = friend; return dict; }, {}) }
                }
            );
        case FRIENDS_FAILURE:
            return update(
                friends,
                {
                    isLoading: { $set: false },
                    errors: { $set: action.payload },
                }
            );
        default:
            return friends;
    }
};