import { POSTS_SUCCESS } from '../actions/posts';
import { getUsers } from '../actions/users';


export default store => next => action => {
    const result = next(action);
    switch (result.type) {
        case POSTS_SUCCESS:
            const userIds = [];
            const userData = store.getState().users.data;
            for (let post of action.payload) {
                if (!userData.hasOwnProperty(post.author)) {
                    userIds.push(post.author);
                }
            }
            store.dispatch(getUsers({id: userIds}));
            break;
        default:
            break;
    }
    return result;
}