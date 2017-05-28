import { FRIENDS_GET, FRIENDS_SUCCESS, FRIENDS_FAILURE } from '../actions/friends';
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
                    ids: { $set: action.payload.result },
                    data: { $merge: action.payload.entities.friends || {} }
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