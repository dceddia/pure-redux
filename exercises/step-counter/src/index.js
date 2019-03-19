import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import StepCounter from './StepCounter';
import { ADD_STEP, RESET_STEPS } from './actions';
import './index.css';

const initialState = {
  steps: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_STEP:
      return {
        steps: state.steps + 1
      };
    case RESET_STEPS:
      return {
        steps: 0
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <StepCounter />
  </Provider>,
  document.querySelector('#root')
);
