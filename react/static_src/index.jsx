/**
 * Created by geoolekom on 21.05.17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import initStore from "./containers/Store";
import App from "./containers/App";

const store = initStore();
import { history } from 'containers/Store';

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
