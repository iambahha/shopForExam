import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from "history";
import {ConnectedRouter, connectRouter, routerMiddleware} from "connected-react-router";
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import App from './App';
import productsReducer from "./store/reducers/productsReducer";
import categoriesReducer from "./store/reducers/categoriesReducer";
import usersReducer from "./store/reducers/usersReducer";



const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  router: connectRouter(history),
  products: productsReducer,
  categories: categoriesReducer,
  users: usersReducer,
});

const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancers);

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
