import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import flags from './flags';
import './index.css';

const initialState = [
  {
    id: 0,
    name: 'Gryffindor',
    image: flags.gryffindor,
    points: 50
  },
  {
    id: 1,
    name: 'Ravenclaw',
    image: flags.ravenclaw,
    points: 100
  },
  {
    id: 2,
    name: 'Hufflepuff',
    image: flags.hufflepuff,
    points: 50
  }
  // one is missing...
];

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_HOUSE_BEFORE':
      const copy = [...state];
      copy.unshift(action.house);
      return copy;
    // return [action.house, ...state];

    case 'ADD_HOUSE_AFTER':
      // or array.push (on a copy)
      return [...state, action.house];

    case 'ADD_HOUSE_MIDDLE':
      return [
        ...state.slice(0, 2),
        action.house,
        ...state.slice(2)
      ];
    case 'ADD_HOUSE_MIDDLE_SPLICE':
      const newState = [...state];
      newState.splice(2, 0, action.house);
      return newState;
    case 'REMOVE_HOUSE_BY_NAME':
      return state.filter((item, index) => {
        return item.name !== action.name;
      });
    case 'REMOVE_HOUSE_BY_INDEX':
      return state.filter((item, index) => {
        return index !== action.index;
      });
    case 'ADD_POINTS':
      return state.map((item, index) => {
        if (item === action.house) {
          return {
            ...action.house,
            points: action.house.points + action.points
          };
        } else {
          return item;
        }
      });
    default:
      return state;
  }
}

const slytherin = {
  id: 3,
  name: 'Slytherin',
  image: flags.slytherin,
  points: 0
};

const store = createStore(reducer);
store.dispatch({
  type: 'ADD_HOUSE_MIDDLE_SPLICE',
  house: slytherin
});
store.dispatch({
  type: 'REMOVE_HOUSE_BY_INDEX',
  index: 2
});

function addPoints(house, points) {
  return {
    type: 'ADD_POINTS',
    house,
    points
  };
}

const SchoolAdmin = ({ houses, addPoints }) => (
  <main>
    {houses.map(house => (
      <div
        key={house.id}
        onClick={() => addPoints(house, 50)}
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

const mapDispatch = {
  addPoints
};

const ConnectedApp = connect(
  mapState,
  mapDispatch
)(SchoolAdmin);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.querySelector('#root')
);
