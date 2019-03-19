const initialState = {
  hour: 22, // 24-hours
  minute: 58
};

export function clockReducer(state = initialState, action) {
  // ADD_MINUTE, ADD_HOUR
  switch (action.type) {
    case 'ADD_MINUTE':
      return {
        ...state,
        minute: (state.minute + 1) % 60
      };
    case 'ADD_HOUR':
      return {
        ...state,
        hour: (state.hour + 1) % 24
      };
    default:
      return state;
  }
}
