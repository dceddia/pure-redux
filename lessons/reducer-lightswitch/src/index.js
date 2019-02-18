import { createStore } from 'redux';

// "Room", 2 lightswitches, 1 light
const initialState = {
  light: false,
  switchA: false,
  switchB: false
}
// actions? turn A on/off, turn B on/off
function lightSwitchReducer(state = initialState, action) {
  switch(action.type) {
    case "A_ON":
      return {
        switchA: true,
        switchB: state.switchB,
        light: true
      }
    case "A_OFF":
      return {
        switchA: false,
        switchB: state.switchB,
        light: state.switchB
      }
    case "B_ON":
      return {
        switchA: state.switchA,
        switchB: true,
        light: true
      }
    case "B_OFF":
      return {
        switchA: state.switchA,
        switchB: false,
        light: state.switchA
      }
    default:
      return state;
  }
}

const store = createStore(lightSwitchReducer)
console.log('initial', store.getState())
store.dispatch({ type: "A_ON" })
console.log(store.getState())
store.dispatch({ type: "B_ON" })
console.log(store.getState())
store.dispatch({ type: "A_OFF" })
console.log(store.getState())
store.dispatch({ type: "B_OFF" })
console.log(store.getState())