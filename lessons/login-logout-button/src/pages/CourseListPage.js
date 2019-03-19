import React from 'react';
import { connect } from 'react-redux';
import { Link } from '@reach/router';
import {
  openNewCourseModal,
  closeNewCourseModal
} from '../actions';
import Modal from 'react-modal';
import NewCourse from '../components/NewCourse';
import LoginLogout from '../components/LoginLogout';
import './CourseListPage.css';

const CourseListPage = ({
  courses,
  coursesLoading,
  coursesError,
  isModalOpen,
  openNewCourseModal,
  closeNewCourseModal
}) => {
  if (coursesLoading) {
    return <div />;
  }

  if (coursesError) {
    return <div>{coursesError.message}</div>;
  }

  return courses.length === 0 ? (
    <div className="CreateCourse">
      <NewCourse />
    </div>
  ) : (
    <div className="CourseList">
      <h1>Your Courses</h1>
      <LoginLogout />
      <button
        className="new-course-btn"
        onClick={openNewCourseModal}
      >
        New Course
      </button>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>
              <div className="title">{course.name}</div>
              <div className="price">
                ${course.price.toFixed(2)}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeNewCourseModal}
      >
        <NewCourse />
      </Modal>
    </div>
  );
};

const mapState = state => ({
  courses: state.courses.courses,
  coursesLoading: state.courses.coursesLoading,
  coursesError: state.courses.coursesError,
  isModalOpen: state.courses.newCourseModalOpen
});
const mapDispatch = {
  openNewCourseModal,
  closeNewCourseModal
};
export default connect(
  mapState,
  mapDispatch
)(CourseListPage);
