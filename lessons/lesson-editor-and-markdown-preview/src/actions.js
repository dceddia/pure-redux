import {
  createCourse,
  getCourses,
  createLesson,
  getLessons,
  updateLesson,
  destroyLesson
} from './api';

export const ADD_COURSE_BEGIN = 'ADD_COURSE_BEGIN';
export const ADD_COURSE_SUCCESS = 'ADD_COURSE_SUCCESS';
export const ADD_COURSE_ERROR = 'ADD_COURSE_ERROR';
export const LOAD_COURSES_BEGIN = 'LOAD_COURSES_BEGIN';
export const LOAD_COURSES_SUCCESS = 'LOAD_COURSES_SUCCESS';
export const LOAD_COURSES_ERROR = 'LOAD_COURSES_ERROR';
export const OPEN_NEW_COURSE_MODAL =
  'OPEN_NEW_COURSE_MODAL';
export const CLOSE_NEW_COURSE_MODAL =
  'CLOSE_NEW_COURSE_MODAL';
export const LOAD_LESSONS_BEGIN = 'LOAD_LESSONS_BEGIN';
export const LOAD_LESSONS_SUCCESS = 'LOAD_LESSONS_SUCCESS';
export const LOAD_LESSONS_ERROR = 'LOAD_LESSONS_ERROR';
export const ADD_LESSON_BEGIN = 'ADD_LESSON_BEGIN';
export const ADD_LESSON_SUCCESS = 'ADD_LESSON_SUCCESS';
export const ADD_LESSON_ERROR = 'ADD_LESSON_ERROR';
export const DELETE_LESSON_BEGIN = 'DELETE_LESSON_BEGIN';
export const DELETE_LESSON_SUCCESS =
  'DELETE_LESSON_SUCCESS';
export const DELETE_LESSON_ERROR = 'DELETE_LESSON_ERROR';
export const SAVE_LESSON_BEGIN = 'SAVE_LESSON_BEGIN';
export const SAVE_LESSON_SUCCESS = 'SAVE_LESSON_SUCCESS';
export const SAVE_LESSON_ERROR = 'SAVE_LESSON_ERROR';
export const RESET_LESSON_ERROR = 'RESET_LESSON_ERROR';
export const SET_LESSON_MARKDOWN = 'SET_LESSON_MARKDOWN';
export const TOGGLE_PREVIEW_MODE = 'TOGGLE_PREVIEW_MODE';

export const addCourse = (name, price) => {
  return dispatch => {
    dispatch({ type: ADD_COURSE_BEGIN });
    createCourse(name, price)
      .then(course => {
        dispatch({
          type: ADD_COURSE_SUCCESS,
          payload: course
        });
      })
      .catch(error => {
        dispatch({ type: ADD_COURSE_ERROR, error });
      });
  };
};

export const addLesson = (name, courseId) => {
  return dispatch => {
    dispatch({ type: ADD_LESSON_BEGIN });
    return createLesson(name, courseId)
      .then(course => {
        dispatch({
          type: ADD_LESSON_SUCCESS,
          payload: course
        });
      })
      .catch(error => {
        dispatch({ type: ADD_LESSON_ERROR, error });
        throw error;
      });
  };
};

export const saveLesson = lesson => {
  return dispatch => {
    dispatch({ type: SAVE_LESSON_BEGIN });
    return updateLesson(lesson)
      .then(lesson => {
        dispatch({
          type: SAVE_LESSON_SUCCESS,
          payload: lesson
        });
      })
      .catch(error => {
        dispatch({ type: SAVE_LESSON_ERROR, error });
        throw error;
      });
  };
};

let saveTimer = null;
export const setLessonMarkdown = (lesson, markdown) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_LESSON_MARKDOWN,
      payload: {
        lesson,
        markdown
      }
    });
    if (saveTimer) {
      clearTimeout(saveTimer);
    }
    saveTimer = setTimeout(() => {
      const latest = getState().lessons.lessons[lesson.id];
      dispatch(saveLesson(latest));
    }, 500);
  };
};

export const deleteLesson = lesson => {
  return dispatch => {
    dispatch({ type: DELETE_LESSON_BEGIN });
    return destroyLesson(lesson)
      .then(() => {
        dispatch({
          type: DELETE_LESSON_SUCCESS,
          payload: lesson
        });
      })
      .catch(error => {
        dispatch({ type: DELETE_LESSON_ERROR, error });
        throw error;
      });
  };
};

export const resetLessonError = () => ({
  type: RESET_LESSON_ERROR
});

export const loadCourses = () => {
  return dispatch => {
    dispatch({ type: LOAD_COURSES_BEGIN });
    getCourses()
      .then(courses => {
        dispatch({
          type: LOAD_COURSES_SUCCESS,
          payload: courses
        });
      })
      .catch(error => {
        dispatch({ type: LOAD_COURSES_ERROR, error });
      });
  };
};

export const loadLessons = courseId => {
  return dispatch => {
    dispatch({ type: LOAD_LESSONS_BEGIN });
    getLessons(courseId)
      .then(lessons => {
        dispatch({
          type: LOAD_LESSONS_SUCCESS,
          payload: lessons
        });
      })
      .catch(error => {
        dispatch({ type: LOAD_LESSONS_ERROR, error });
      });
  };
};

export const openNewCourseModal = () => ({
  type: OPEN_NEW_COURSE_MODAL
});

export const closeNewCourseModal = () => ({
  type: CLOSE_NEW_COURSE_MODAL
});

export const togglePreviewMode = () => ({
  type: TOGGLE_PREVIEW_MODE
});
