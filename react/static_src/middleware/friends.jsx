import { getUsers } from '../actions/users';
import { FRIENDS_SUCCESS } from '../actions/friends';


export default store => next => action => {
    switch (action.type) {
        case FRIENDS_SUCCESS:
            const userIds = [];
            const userData = store.getState().users.data;
            for (let friend of action.payload) {
                if (!userData.hasOwnProperty(friend.friend)) {
                    userIds.push(friend.friend);
                }
            }
            store.dispatch(getUsers({id: userIds}));
            break;
        default:
            break;
    }
    return next(action);
}