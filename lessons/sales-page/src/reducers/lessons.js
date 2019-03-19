import produce from 'immer';
import {
  ADD_LESSON_SUCCESS,
  ADD_LESSON_BEGIN,
  ADD_LESSON_ERROR,
  SAVE_LESSON_SUCCESS,
  SAVE_LESSON_BEGIN,
  SAVE_LESSON_ERROR,
  DELETE_LESSON_SUCCESS,
  LOAD_LESSONS_SUCCESS,
  LOAD_LESSONS_BEGIN,
  LOAD_LESSONS_ERROR,
  RESET_LESSON_ERROR,
  SET_LESSON_MARKDOWN,
  RESET_LESSONS
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
    case SAVE_LESSON_BEGIN:
      draft.saving = true;
      draft.error = null;
      return;
    case ADD_LESSON_ERROR:
    case SAVE_LESSON_ERROR:
      draft.saving = false;
      draft.error = action.error;
      return;
    case ADD_LESSON_SUCCESS:
    case SAVE_LESSON_SUCCESS:
      draft.saving = false;
      draft.lessons[action.payload.id] = action.payload;
      return;
    case DELETE_LESSON_SUCCESS:
      delete draft.lessons[action.payload.id];
      return;
    case SET_LESSON_MARKDOWN:
      draft.lessons[action.payload.lesson.id].markdown =
        action.payload.markdown;
      return;
    case RESET_LESSON_ERROR:
      draft.error = null;
      return;
    case RESET_LESSONS:
      return initialState;
    default:
      return;
  }
}, initialState);

export default reducer;
