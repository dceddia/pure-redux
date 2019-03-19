import React from 'react';
import { connect } from 'react-redux';
import LessonEditor from '../components/LessonEditor';
import NotFoundPage from './NotFoundPage';
import ReactMarkdown from 'react-markdown';

const LessonPage = ({ lesson, loading, previewMode }) => {
  if (loading) {
    return 'Loading...';
  }

  if (!lesson) {
    return <NotFoundPage />;
  }
  return previewMode ? (
    <ReactMarkdown source={lesson.markdown || ''} />
  ) : (
    <LessonEditor lesson={lesson} />
  );
};

const mapState = (state, props) => {
  const lessonId = parseInt(props.lessonId, 10);
  return {
    previewMode: state.app.previewMode,
    lesson: state.lessons.lessons[lessonId],
    loading: state.lessons.loading
  };
};
export default connect(mapState)(LessonPage);
