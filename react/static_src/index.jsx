/**
 * Created by geoolekom on 21.05.17.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { syncHistoryWithStore } from 'react-router-redux';

import initStore from "./containers/Store"
import App from "./containers/App"

const store = initStore();

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
