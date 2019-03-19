import { combineReducers } from 'redux';
import courses from './courses';
import lessons from './lessons';
import app from './app';
import user from './user';

export default combineReducers({
  courses,
  lessons,
  app,
  user
});
