import { createSelector } from 'reselect';

const getCourses = state => state.courses.courses;
const getLessons = state => state.lessons.lessons;
const parseCourseId = (state, props) =>
  parseInt(props.courseId, 10);

const getSortedLessons = createSelector(
  getLessons,
  lessons =>
    Object.values(lessons).sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else {
        return 0;
      }
    })
);
export const getLessonsByCourse = createSelector(
  getSortedLessons,
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
