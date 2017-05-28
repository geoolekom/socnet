import { getFriends } from '../actions/friends';
import { getUsers } from '../actions/users';
import { ACCEPT_REQUEST_SUCCESS, REQUESTS_SUCCESS } from '../actions/requests';


export default store => next => action => {
    switch (action.type) {
        case ACCEPT_REQUEST_SUCCESS:
            store.dispatch(getFriends({id: action.payload.id}));
            break;
        case REQUESTS_SUCCESS:
            const userIds = [];
            const userData = store.getState().users.data;
            for (let request of action.payload) {
                if (!userData.hasOwnProperty(request.author)) {
                    userIds.push(request.author);
                }
            }
            store.dispatch(getUsers({id: userIds}));
            break;
        default:
            break;
    }
    return next(action);
}