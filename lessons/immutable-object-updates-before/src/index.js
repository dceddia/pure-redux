import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import flags from './flags';
import './index.css';

const slytherin = {
  id: 3,
  name: 'Slytherin',
  image: flags.slytherin,
  points: 0
};

const initialState = {
  houses: {
    0: {
      id: 0,
      name: 'Gryffindor',
      image: flags.gryffindor,
      points: 50
    },
    1: {
      id: 1,
      name: 'Ravenclaw',
      image: flags.ravenclaw,
      points: 100
    },
    2: {
      id: 2,
      name: 'Hufflepuff',
      image: flags.hufflepuff,
      points: 50
    }
    // one is missing...
  }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const store = createStore(reducer);

const SchoolAdmin = ({ houses }) => (
  <main>
    {houses.map(house => (
      <div key={house.id}>
        <img src={house.image} alt={house.name} />
        <div>{house.points} points</div>
      </div>
    ))}
  </main>
);

const mapState = state => ({
  houses: Object.values(state.houses)
});

const ConnectedApp = connect(mapState)(SchoolAdmin);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.querySelector('#root')
);
