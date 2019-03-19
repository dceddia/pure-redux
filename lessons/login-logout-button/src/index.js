import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './App';
import Modal from 'react-modal';
import { loadCourses, loadLastUser } from './actions';
import { saveAuthToken } from './middleware';
import './index.css';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, saveAuthToken)
);
const store = createStore(reducer, enhancer);
store.dispatch(loadCourses());
store.dispatch(loadLastUser());

Modal.setAppElement('#root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
