import produce from 'immer';
import { ADD_COURSE } from './actions';

const initialState = {
  courses: []
};
const reducer = produce((draft, action) => {
  switch (action.type) {
    case ADD_COURSE:
      draft.courses.push(action.payload);
      return;
    default:
      return;
  }
}, initialState);

export default reducer;
