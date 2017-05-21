import { POST_CREATED, POST_DELETE, POSTS_GET, POSTS_SUCCESS, POSTS_FAILURE } from "../actions/posts";
import update from 'react-addons-update';

const defaultState = {
    ids: [],
    data: {},
    isLoading: false,
    errors: []
};

export default (posts = defaultState, action) => {
    switch (action.type) {
        case POSTS_GET:
            return update(
                posts,
                { isLoading: { $set: true } }
            );
        case POSTS_SUCCESS:
            return update(
                posts,
                {
                    isLoading: { $set: false },
                    ids: { $set: action.payload.map(post => post.id) },
                    data: { $merge: action.payload.reduce((dict, post) => {dict[post.id] = post; return dict; }, {}) }
                }
            );
        case POSTS_FAILURE:
            return update(
                posts,
                {
                    isLoading: { $set: false },
                    errors: { $set: action.payload },
                }

            );
        default:
            return posts;
    }
};