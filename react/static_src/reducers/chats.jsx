import { CHATS_GET, CHATS_SUCCESS, CHATS_FAILURE } from "../actions/chats";
import update from 'react-addons-update';

const defaultState = {
    ids: [],
    data: {},
    isLoading: false,
    errors: [],
    visibility: false,
};

export default (chats = defaultState, action) => {
    switch (action.type) {
        case CHATS_GET:
            return update(
                chats,
                { isLoading: { $set: true } }
            );
        case CHATS_SUCCESS:
            return update(
                chats,
                {
                    isLoading: { $set: false },
                    ids: { $set: action.payload.result },
                    data: { $merge: action.payload.entities.chats || {} }
                }
            );
        case CHATS_FAILURE:
            return update(
                chats,
                {
                    isLoading: { $set: false },
                    errors: { $set: action.payload },
                }

            );
        default:
            return chats;
    }
};