import React from 'react';
import { Router, Redirect } from '@reach/router';
import CourseListPage from './pages/CourseListPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';

const App = () => {
  return (
    <Router>
      <Redirect noThrow from="/" to="/courses" />
      <CourseListPage path="/courses" />
      <CourseDetailPage path="/courses/:courseId">
        <LessonPage path="lessons/:lessonId" />
      </CourseDetailPage>
    </Router>
  );
};

export default App;
