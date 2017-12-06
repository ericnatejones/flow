import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunk from "redux-thunk";

import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";

import authReducer from "./redux/reducers/auth";
import mainReducer from "./redux/reducers";

import App from './main/App';

const reducer = combineReducers({authReducer, mainReducer});

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
, document.getElementById('root'));
