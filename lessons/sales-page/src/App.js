import React from 'react';
import { Router, Redirect } from '@reach/router';
import CourseListPage from './pages/CourseListPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import SalesPage from './pages/SalesPage';

const App = () => {
  return (
    <Router>
      <LoginPage path="/login" />
      <Redirect noThrow from="/" to="/courses" />
      <CourseListPage path="/courses" />
      <SalesPage path="/courses/:courseId/buy" />
      <CourseDetailPage path="/courses/:courseId">
        <LessonPage path="lessons/:lessonId" />
      </CourseDetailPage>
      <NotFoundPage default />
    </Router>
  );
};

export default App;
