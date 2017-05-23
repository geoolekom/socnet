import { getFriends } from '../actions/friends';
import { ACCEPT_REQUEST_SUCCESS } from '../actions/requests';


export default store => next => action => {
    const result = next(action);
    switch (result.type) {
        case ACCEPT_REQUEST_SUCCESS:
            store.dispatch(getFriends());
            break;
        default:
            break;
    }
}