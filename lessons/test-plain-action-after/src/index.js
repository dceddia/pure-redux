import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import reducer from './reducer';
import { addPoints } from './actions';
import './index.css';

const store = createStore(reducer);

const SchoolAdmin = ({ houses, dispatch }) => (
  <main>
    {houses.map(house => (
      <div
        key={house.id}
        onClick={() => dispatch(addPoints(house, 50))}
      >
        <img src={house.image} alt={house.name} />
        <div>{house.points} points</div>
      </div>
    ))}
  </main>
);

const mapState = state => ({
  houses: state
});

const ConnectedApp = connect(mapState)(SchoolAdmin);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.querySelector('#root')
);
