import flags from './flags';

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
      return [action.house, ...state];

    case 'ADD_HOUSE_AFTER':
      return [...state, action.house];

    case 'ADD_HOUSE_MIDDLE':
      return [
        ...state.slice(0, 2),
        action.house,
        ...state.slice(2)
      ];

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

export default reducer;