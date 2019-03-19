import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Match, Redirect } from '@reach/router';
import NotFoundPage from './NotFoundPage';
import Loading from '../components/Loading';
import Lesson from '../components/Lesson';
import LoginLogout from '../components/LoginLogout';
import RoleRequired from '../components/RoleRequired';
import {
  loadLessons,
  addLesson,
  saveLesson,
  togglePreviewMode
} from '../actions';
import {
  getLessonsByCourse,
  getCourseById,
  userOwnsCourse
} from '../selectors';
import './CourseDetailPage.css';

const CourseDetailPage = ({
  userOwnsCourse,
  currentUser,
  courseId,
  course,
  lessons,
  loading,
  loadLessons,
  addLesson,
  saveLesson,
  children,
  togglePreviewMode,
  previewMode
}) => {
  if (!userOwnsCourse) {
    return (
      <Redirect to={`/courses/${courseId}/buy`} noThrow />
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (!course) {
    return <NotFoundPage />;
  }

  useEffect(() => {
    // dispatch an action
    loadLessons(course.id);
  }, [course]);

  return (
    <div className="CourseDetail">
      <header>
        <h1>{course.name}</h1>
        <RoleRequired role="admin">
          <button
            className="preview-btn"
            onClick={togglePreviewMode}
          >
            {previewMode ? 'Edit' : 'Preview'}
          </button>
        </RoleRequired>
        <LoginLogout />
      </header>
      <div className="content">
        <div className="sidebar">
          {lessons.length > 0 && (
            <ul className="lessons">
              {lessons.map(lesson => (
                <Match
                  key={lesson.id}
                  path={`lessons/${lesson.id}`}
                >
                  {({ match }) => {
                    const className = `lesson-item ${
                      match ? 'selected' : ''
                    }`;
                    return (
                      <li>
                        <Lesson
                          className={className}
                          lesson={lesson}
                          onSubmit={name =>
                            saveLesson({
                              ...lesson,
                              name
                            })
                          }
                        >
                          {(edit, remove) => (
                            <div className={className}>
                              <Link
                                to={`lessons/${lesson.id}`}
                              >
                                {lesson.name}
                              </Link>
                              <RoleRequired role="admin">
                                <button
                                  onClick={() =>
                                    edit(lesson.name)
                                  }
                                  className="edit-lesson-btn"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={remove}
                                  className="delete-lesson-btn"
                                >
                                  Delete
                                </button>
                              </RoleRequired>
                            </div>
                          )}
                        </Lesson>
                      </li>
                    );
                  }}
                </Match>
              ))}
            </ul>
          )}
          <RoleRequired role="admin">
            <Lesson
              className="add-lesson-button"
              onSubmit={title =>
                addLesson(title, course.id)
              }
            >
              {edit => (
                <button
                  className="add-lesson-button"
                  onClick={edit}
                >
                  New Lesson
                </button>
              )}
            </Lesson>
          </RoleRequired>
        </div>
        <div className="lesson">{children}</div>
      </div>
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    currentUser: state.user.user,
    previewMode: state.app.previewMode,
    loading: state.courses.coursesLoading,
    lessons: getLessonsByCourse(state, ownProps),
    course: getCourseById(state, ownProps),
    userOwnsCourse: userOwnsCourse(state, ownProps)
  };
};
export default connect(
  mapState,
  { loadLessons, addLesson, saveLesson, togglePreviewMode }
)(CourseDetailPage);
