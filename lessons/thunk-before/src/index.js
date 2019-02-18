import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reddit from './Reddit';
import './index.css';

const initialState = {
  posts: []
};

function reducer(state = initialState, action) {
  return state;
}

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Reddit />
  </Provider>,
  document.querySelector('#root')
);
