import React from 'react';
import { connect } from 'react-redux';
import LessonEditor from '../components/LessonEditor';
import NotFoundPage from './NotFoundPage';
import ReactMarkdown from 'react-markdown';

const LessonPage = ({
  lesson,
  loading,
  previewMode,
  currentUser
}) => {
  if (loading) {
    return 'Loading...';
  }

  if (!lesson) {
    return <NotFoundPage />;
  }
  if (
    currentUser &&
    currentUser.role === 'admin' &&
    !previewMode
  ) {
    return <LessonEditor lesson={lesson} />;
  } else {
    return <ReactMarkdown source={lesson.markdown || ''} />;
  }
};

const mapState = (state, props) => {
  const lessonId = parseInt(props.lessonId, 10);
  return {
    currentUser: state.user.user,
    previewMode: state.app.previewMode,
    lesson: state.lessons.lessons[lessonId],
    loading: state.lessons.loading
  };
};
export default connect(mapState)(LessonPage);
