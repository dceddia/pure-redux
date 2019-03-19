import { combineReducers } from 'redux';
import courses from './courses';
import lessons from './lessons';

export default combineReducers({
  courses,
  lessons
});
