import {
    GET_POSTS,
    POST_ERROR,
    UDPATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
} from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
            };

        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false,
            };

        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts], // latest post on top
                loading: false,
            };

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false,
            };

        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };

        case UDPATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === payload.post_id ? { ...post, likes: payload.likes } : post
                ),
                loading: false,
            };

        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false,
            };

        case REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload),
                },
                loading: false,
            };

        default:
            return state;
    }
};