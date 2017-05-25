import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import postReducer from '../reducers/posts';
import userReducer from '../reducers/users';
import displayReducer from '../reducers/display';
import authReducer from '../reducers/auth';
import friendReducer from '../reducers/friends';
import requestReducer from '../reducers/requests';
import searchReducer from '../reducers/search';

const rootReducer = combineReducers({
    posts: postReducer,
    users: userReducer,
    display: displayReducer,
    auth: authReducer,
    friends: friendReducer,
    requests: requestReducer,
    router: routerReducer,
    search: searchReducer,
});

export default rootReducer;