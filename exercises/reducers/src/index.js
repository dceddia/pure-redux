import { createStore } from 'redux';
import { trafficLightReducer } from './trafficLight';
import { clockReducer } from './clock';
import { loginReducer } from './login';

/*
const store = createStore(trafficLightReducer);
console.log(store.getState());
store.dispatch({ type: 'ADVANCE' });
console.log(store.getState());
store.dispatch({ type: 'ADVANCE' });
console.log(store.getState());
store.dispatch({ type: 'ADVANCE' });
console.log(store.getState());
store.dispatch({ type: 'ADVANCE' });
console.log(store.getState());
store.dispatch({ type: 'SET_RED' });
console.log(store.getState());
*/

/*
const store = createStore(clockReducer);
console.log(store.getState());
store.dispatch({ type: 'ADD_MINUTE' });
console.log(store.getState());
store.dispatch({ type: 'ADD_MINUTE' });
console.log(store.getState());
store.dispatch({ type: 'ADD_HOUR' });
console.log(store.getState());
store.dispatch({ type: 'ADD_HOUR' });
console.log(store.getState());
*/

const store = createStore(loginReducer);
console.log(store.getState());
store.dispatch({
  type: 'LOGIN',
  user: { userid: 42, username: 'you', token: 'abcdefg' }
});
console.log(store.getState());

store.dispatch({ type: 'LOGOUT' });

console.log(store.getState());
