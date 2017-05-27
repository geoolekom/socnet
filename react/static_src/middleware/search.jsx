import { SEARCH_SUCCESS } from '../actions/search';
import { getPosts } from '../actions/posts';
import { getFriends } from '../actions/friends';
import { getUsers } from '../actions/users';


export default store => next => action => {
    const result = next(action);
    switch (result.type) {
        case SEARCH_SUCCESS:
            const results = action.payload;
            if (results.hasOwnProperty('post')) {
                store.dispatch(getPosts({id: results.post}));
            }
            if (results.hasOwnProperty('user')) {
                store.dispatch(getUsers({id: results.user}));
            }
            if (results.hasOwnProperty('friendship')) {
                store.dispatch(getFriends({id: results.friendship}));
            }
            if (results.hasOwnProperty('message')) {
                // store.dispatch(getMessages({id: results.message}));
            }
            break;
        default:
            break;
    }
    return result;
}