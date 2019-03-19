import React from 'react';
import { connect } from 'react-redux';
import { setLessonMarkdown } from '../actions';

const LessonEditor = ({ lesson, setLessonMarkdown }) => (
  <>
    <div className="lesson-editor-help">
      <p>
        You are editing this lesson. Changes are saved
        automatically.
      </p>
    </div>
    <textarea
      className="lesson-editor"
      value={lesson.markdown || ''}
      onChange={e =>
        setLessonMarkdown(lesson, e.target.value)
      }
    />
  </>
);

export default connect(
  null,
  { setLessonMarkdown }
)(LessonEditor);
