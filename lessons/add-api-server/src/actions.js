export const ADD_COURSE = 'ADD_COURSE';
export const addCourse = name => ({
  type: ADD_COURSE,
  payload: {
    name,
    id: Math.random()
  }
});
