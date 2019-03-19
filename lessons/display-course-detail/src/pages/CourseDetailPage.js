import React from 'react';
import { connect } from 'react-redux';
import NotFoundPage from './NotFoundPage';

const CourseDetailPage = ({
  courseId,
  course,
  loading
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <NotFoundPage />;
  }

  return (
    <div>
      Viewing {courseId} -- {course.name}
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    loading: state.coursesLoading,
    course: state.courses.find(
      c => c.id === parseInt(ownProps.courseId, 10)
    )
  };
};
export default connect(mapState)(CourseDetailPage);
