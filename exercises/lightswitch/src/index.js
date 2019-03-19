import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const initialState = {
  isLightOn: true
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FLIP':
      return {
        ...state,
        isLightOn: !state.isLightOn
      };
    default:
      return state;
  }
}
const store = createStore(reducer);

class Room extends React.Component {
  flipLight = () => {
    this.props.dispatch({ type: 'FLIP' });
  };

  render() {
    const lightedness = this.props.isLightOn
      ? 'lit'
      : 'dark';
    return (
      <div className={`room ${lightedness}`}>
        the room is {lightedness}
        <br />
        <button onClick={this.flipLight}>flip</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLightOn: state.isLightOn
});
const ConnectedRoom = connect(mapStateToProps)(Room);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRoom />
  </Provider>,
  document.getElementById('root')
);
