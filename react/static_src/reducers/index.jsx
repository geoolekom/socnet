import { combineReducers } from 'redux';

import postReducer from '../reducers/posts';
import userReducer from '../reducers/users';
import displayReducer from '../reducers/display';
import authReducer from '../reducers/auth';

const rootReducer = combineReducers({
    posts: postReducer,
    users: userReducer,
    display: displayReducer,
    auth: authReducer,
});

export default rootReducer;