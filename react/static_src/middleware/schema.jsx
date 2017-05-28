import { ACCEPT_REQUEST_SUCCESS, REQUESTS_SUCCESS } from '../actions/requests';
import { USERS_SUCCESS } from '../actions/users';
import { POSTS_SUCCESS } from '../actions/posts';
import { FRIENDS_SUCCESS } from '../actions/friends';
import { MESSAGES_SUCCESS } from '../actions/messages';
import { CHATS_SUCCESS } from '../actions/chats';
import { normalize } from 'normalizr';
import { user, post, comment, friend, request, message, chat } from '../helpers/schema';

export default store => next => action => {
    switch (action.type) {
        case ACCEPT_REQUEST_SUCCESS:
            action.payload = normalize(action.payload, request);
            break;
        case REQUESTS_SUCCESS:
            action.payload = normalize(action.payload, [ request ]);
            break;
        case USERS_SUCCESS:
            action.payload = normalize(action.payload, [ user ]);
            break;
        case FRIENDS_SUCCESS:
            action.payload = normalize(action.payload, [ friend ]);
            break;
        case POSTS_SUCCESS:
            action.payload = normalize(action.payload, [ post ]);
            break;
        case CHATS_SUCCESS:
            action.payload = normalize(action.payload, [ chat ]);
            break;
        case MESSAGES_SUCCESS:
            action.payload = normalize(action.payload, [ message ]);
            break;
        default:
            break;
    }
    return next(action);
}