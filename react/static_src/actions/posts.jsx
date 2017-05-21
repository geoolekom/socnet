export const POST_CREATED = 'POST_CREATED';
export const POST_DELETE = 'POST_DELETE';
export const POSTS_GET = 'POSTS_GET';
export const POSTS_SUCCESS = 'POSTS_SUCCESS';
export const POSTS_FAILURE = 'POST_FAILURE';

import { CALL_API } from 'redux-api-middleware';

export const getPosts = () => ({
    [CALL_API]: {
        endpoint: '/api/v1/posts/',
        method: 'GET',
        types: [POSTS_GET, POSTS_SUCCESS, POSTS_FAILURE]
    }
});

export const getPostsSuccess = (posts) => ({
    type: POSTS_SUCCESS,
    posts: posts
});

export const getPostsFailure = () => ({
    type: POSTS_FAILURE
});