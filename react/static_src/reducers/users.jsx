import {USER_CREATED} from "../actions/users"

const defaultState = {
    ids: [],
    data: {},
    isLoading: false,
    errors: []
};

export default (users = defaultState, action) => {
    switch (action.type) {
        case USER_CREATED:
            return {
                ids: [...users.ids, action.user.id],
                data: {...users.data, [action.user.id]: action.user},
                isLoading: users.isLoading,
                errors: users.errors,
            };
        default:
            return users;
    }
};