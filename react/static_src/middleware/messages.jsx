import { getUsers } from '../actions/users';
import { MESSAGES_SUCCESS } from '../actions/messages';


export default store => next => action => {
    switch (action.type) {
        case MESSAGES_SUCCESS:
            const userIds = [];
            const userData = store.getState().users.data;
            for (let message of action.payload) {
                if (!userData.hasOwnProperty(message.author)) {
                    userIds.push(message.author);
                }
            }
            if (userIds.length > 0) {
                store.dispatch(getUsers({id: userIds}));
            }
            break;
        default:
            break;
    }
    return next(action);
}