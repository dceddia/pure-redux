import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  LOGOUT_SUCCESS
} from './actions';
import { setToken } from './api';

export const saveAuthToken = store => next => action => {
  if (
    action.type === LOGIN_SUCCESS ||
    action.type === SIGNUP_SUCCESS
  ) {
    // save token
    setToken(action.payload.token);

    localStorage.setItem(
      'currentUser',
      JSON.stringify(action.payload)
    );
  }

  if (action.type === LOGOUT_SUCCESS) {
    setToken(null);
    localStorage.removeItem('currentUser');
  }
  next(action);
};
