import { MESSAGES_GET, MESSAGES_SUCCESS, MESSAGES_FAILURE } from "../actions/messages";
import update from 'react-addons-update';

const defaultState = {
    ids: [],
    data: {},
    isLoading: false,
    errors: []
};

export default (messages = defaultState, action) => {
    switch (action.type) {
        case MESSAGES_GET:
            return update(
                messages,
                { isLoading: { $set: true } }
            );
        case MESSAGES_SUCCESS:
            console.log(action);
            return update(
                messages,
                {
                    isLoading: { $set: false },
                    ids: { $set: action.payload.result },
                    data: { $merge: action.payload.entities.messages || {} }
                }
            );
        case MESSAGES_FAILURE:
            return update(
                messages,
                {
                    isLoading: { $set: false },
                    errors: { $set: action.payload },
                }

            );
        default:
            return messages;
    }
};