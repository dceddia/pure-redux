const RED = 'RED';
const YELLOW = 'YELLOW';
const GREEN = 'GREEN';

const initialState = {
  lightState: RED
};
export function trafficLightReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case 'ADVANCE':
      // move to next state...
      if (state.lightState === RED) {
        return {
          ...state,
          lightState: GREEN
        };
      } else if (state.lightState === GREEN) {
        return {
          ...state,
          lightState: YELLOW
        };
      } else if (state.lightState === YELLOW) {
        return {
          ...state,
          lightState: RED
        };
      }
      return state;
    case 'SET_RED':
      return {
        ...state,
        lightState: RED
      };
    case 'SET_YELLOW':
      return {
        ...state,
        lightState: YELLOW
      };
    case 'SET_GREEN':
      return {
        ...state,
        lightState: GREEN
      };
    default:
      return state;
  }
}

/// actions...?

// NEXT... ADVANCE?
// SET_RED, SET_YELLOW, SET_GREEN
