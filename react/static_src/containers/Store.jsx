import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

import { apiMiddleware } from 'redux-api-middleware';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

const initialStore = {};
export const history = createBrowserHistory();
const routing = routerMiddleware(history);

const enhancers = compose(
    applyMiddleware(routing, apiMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : null
);

const initStore = () => createStore(rootReducer, initialStore, enhancers);

export default initStore;