import { createSelector } from 'reselect';

const getLessons = state => state.lessons.lessons;
const parseCourseId = (state, props) =>
  parseInt(props.courseId, 10);

export const getLessonsByCourse = createSelector(
  getLessons,
  parseCourseId,
  (lessons, courseId) =>
    lessons.filter(lesson => lesson.courseId === courseId)
);
