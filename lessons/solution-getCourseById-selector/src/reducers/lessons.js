import produce from 'immer';
import {
  ADD_LESSON_SUCCESS,
  ADD_LESSON_BEGIN,
  ADD_LESSON_ERROR,
  RESET_LESSON_ERROR
} from '../actions';

const initialState = {
  lessons: [],
  saving: false,
  error: null
};
const reducer = produce((draft, action) => {
  switch (action.type) {
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
      draft.lessons.push(action.payload);
      return;
    case RESET_LESSON_ERROR:
      draft.error = null;
      return;
    default:
      return;
  }
}, initialState);

export default reducer;
