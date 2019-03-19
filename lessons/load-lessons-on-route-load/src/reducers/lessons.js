import produce from 'immer';
import {
  ADD_LESSON_SUCCESS,
  ADD_LESSON_BEGIN,
  ADD_LESSON_ERROR,
  LOAD_LESSONS_SUCCESS,
  LOAD_LESSONS_BEGIN,
  LOAD_LESSONS_ERROR,
  RESET_LESSON_ERROR
} from '../actions';

const initialState = {
  lessons: {},
  saving: false,
  error: null
};
const reducer = produce((draft, action) => {
  switch (action.type) {
    case LOAD_LESSONS_SUCCESS:
      draft.loading = false;
      action.payload.forEach(lesson => {
        draft.lessons[lesson.id] = lesson;
      });
      return;
    case LOAD_LESSONS_BEGIN:
      draft.loading = true;
      draft.error = null;
      return;
    case LOAD_LESSONS_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return;
    case ADD_LESSON_BEGIN:
      draft.saving = true;
      draft.error = null;
      return;
    case ADD_LESSON_ERROR:
      draft.saving = false;
      draft.error = action.error;
      return;
    case ADD_LESSON_SUCCESS:
      draft.saving = false;
      draft.lessons[action.payload.id] = action.payload;
      return;
    case RESET_LESSON_ERROR:
      draft.error = null;
      return;
    default:
      return;
  }
}, initialState);

export default reducer;
