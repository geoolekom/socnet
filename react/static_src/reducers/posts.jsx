import { POST_CREATED, POST_DELETE, POSTS_GET, POSTS_SUCCESS, POSTS_FAILURE } from "../actions/posts"

const defaultState = {
    ids: [],
    data: {},
    isLoading: false,
    errors: []
};

export default (posts = defaultState, action) => {
    switch (action.type) {
        case POST_CREATED:
            return {
                ids: [...posts.ids, action.post.id],
                data: {...posts.data, [action.post.id]: action.post},
                isLoading: posts.isLoading,
                errors: posts.errors
            };
        case POST_DELETE:
            return posts;
        case POSTS_GET:
            return {
                ids: posts.ids,
                data: posts.data,
                isLoading: true,
                errors: posts.errors
            };
        case POSTS_SUCCESS:
            return {
                ids: [...posts.ids, ...action.payload.map(post => post.id)],
                data: {...posts.data, ...action.payload.reduce((dict, post) => {dict[post.id] = post; return dict; }, {}) },
                isLoading: false,
                errors: posts.errors
            };
        case POSTS_FAILURE:
            return {
                ids: posts.ids,
                posts: posts.data,
                isLoading: false,
                errors: action.errors
            };
        default:
            return posts;
    }
};