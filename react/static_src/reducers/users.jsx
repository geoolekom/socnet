import { USER_CREATED, USERS_GET, USERS_SUCCESS, USERS_FAILURE } from "../actions/users";
import update from 'react-addons-update';

const defaultState = {
    ids: [],
    data: {},
    isLoading: false,
    errors: []
};

export default (users = defaultState, action) => {
    switch (action.type) {
        case USERS_GET:
            return update(
                users,
                { isLoading: { $set: true } }
            );
        case USERS_SUCCESS:
            return update(
                users,
                {
                    isLoading: { $set: false },
                    ids: { $set: action.payload.map(user => user.id) },
                    data: { $merge: action.payload.reduce((dict, user) => {dict[user.id] = user; return dict; }, {}) }
                }
            );
        case USERS_FAILURE:
            return update(
                users,
                {
                    isLoading: { $set: false },
                    errors: { $set: action.payload },
                }

            );
        default:
            return users;
    }
};