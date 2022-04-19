import React from "react";
//import "./index.css";
import App from "./App.js";

import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
 import * as serviceWorker from './serviceWorker';
import { store } from './store';

// style + assets
import './assets/scss/style.scss';
import ErrorBoundary from './ErrorBoundary.js'

// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>        
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
