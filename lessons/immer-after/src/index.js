import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import flags from './flags';
import './index.css';
import produce from 'immer';

const slytherin = {
  id: 3,
  name: 'Slytherin',
  image: flags.slytherin,
  points: 0
};

const initialState = {
  selectedHouse: null,
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

const reducer = produce((draft, action) => {
  if (action.type === 'SELECT_HOUSE') {
    draft.selectedHouse = action.house.id;
  } else if (action.type === 'ADD_POINTS') {
    draft.houses[action.house.id].points += action.points;
  }
}, initialState);

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

function selectHouse(house) {
  return {
    type: 'SELECT_HOUSE',
    house
  };
}

function addPoints(house, points) {
  return {
    type: 'ADD_POINTS',
    house,
    points
  };
}

const SchoolAdmin = ({
  houses,
  selectedHouse,
  selectHouse,
  addPoints
}) => (
  <main>
    {houses.map(house => (
      <div
        key={house.id}
        onClick={() => selectHouse(house)}
        onDoubleClick={() => addPoints(house, 50)}
        className={
          house.id === selectedHouse
            ? `selected ${house.name}`
            : ''
        }
      >
        <img src={house.image} alt={house.name} />
        <div>{house.points} points</div>
      </div>
    ))}
  </main>
);

const mapState = state => ({
  houses: Object.values(state.houses),
  selectedHouse: state.selectedHouse
});

const ConnectedApp = connect(
  mapState,
  { selectHouse, addPoints }
)(SchoolAdmin);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.querySelector('#root')
);
