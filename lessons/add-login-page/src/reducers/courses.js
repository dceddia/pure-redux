import produce from 'immer';
import {
  ADD_COURSE_BEGIN,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_ERROR,
  LOAD_COURSES_BEGIN,
  LOAD_COURSES_SUCCESS,
  LOAD_COURSES_ERROR,
  OPEN_NEW_COURSE_MODAL,
  CLOSE_NEW_COURSE_MODAL
} from '../actions';

const initialState = {
  coursesLoading: false,
  coursesError: null,
  saveInProgress: false,
  saveError: null,
  courses: [],
  newCourseModalOpen: false
};
const reducer = produce((draft, action) => {
  switch (action.type) {
    case ADD_COURSE_BEGIN:
      draft.saveInProgress = true;
      draft.saveError = null;
      return;
    case ADD_COURSE_SUCCESS:
      draft.saveInProgress = false;
      draft.courses.push(action.payload);
      draft.newCourseModalOpen = false;
      return;
    case ADD_COURSE_ERROR:
      draft.saveInProgress = false;
      draft.saveError = action.error;
      return;
    case LOAD_COURSES_BEGIN:
      draft.coursesLoading = true;
      return;
    case LOAD_COURSES_SUCCESS:
      draft.courses = action.payload;
      draft.coursesLoading = false;
      return;
    case LOAD_COURSES_ERROR:
      draft.coursesLoading = false;
      draft.coursesError = action.error;
      return;
    case OPEN_NEW_COURSE_MODAL:
      draft.newCourseModalOpen = true;
      return;
    case CLOSE_NEW_COURSE_MODAL:
      draft.newCourseModalOpen = false;
      draft.saveError = null;
      return;
    default:
      return;
  }
}, initialState);

export default reducer;
