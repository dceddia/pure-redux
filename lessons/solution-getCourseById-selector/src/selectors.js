import { createSelector } from 'reselect';

const getCourses = state => state.courses.courses;
const getLessons = state => state.lessons.lessons;
const parseCourseId = (state, props) =>
  parseInt(props.courseId, 10);

export const getLessonsByCourse = createSelector(
  getLessons,
  parseCourseId,
  (lessons, courseId) =>
    lessons.filter(lesson => lesson.courseId === courseId)
);

export const getCourseById = createSelector(
  getCourses,
  parseCourseId,
  (courses, courseId) =>
    courses.find(c => c.id === courseId)
);
