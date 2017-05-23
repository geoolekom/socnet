import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import middlewareList from '../middleware';

import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

const initialStore = {};
export const history = createBrowserHistory();
const routing = routerMiddleware(history);

const enhancers = compose(
    applyMiddleware(routing, ...middlewareList),
    window.devToolsExtension ? window.devToolsExtension() : null
);

const initStore = () => createStore(rootReducer, initialStore, enhancers);

export default initStore;