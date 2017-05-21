import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

import { apiMiddleware } from 'redux-api-middleware';

const initialStore = {};

const enhancers = compose(
    applyMiddleware(apiMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : null
);

const initStore = () => createStore(rootReducer, initialStore, enhancers);

export default initStore;