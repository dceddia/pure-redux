import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { addLesson, resetLessonError } from '../actions';
import './NewLesson.css';

const NewLesson = ({
  addLesson,
  resetError,
  courseId,
  saving,
  error
}) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const inputRef = useRef();

  const reset = () => {
    setTitle('');
    setEditing(false);
    resetError();
  };

  const commitEdit = e => {
    e.preventDefault();
    addLesson(title, courseId)
      .then(reset)
      .catch(error => {
        setEditing(false);
        setEditing(true);
      });
  };

  const cancelEdit = () => {
    if (!saving) {
      reset();
    }
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  return editing ? (
    <>
      <form
        className={`add-lesson-button editing ${
          error ? 'error' : ''
        }`}
        onSubmit={commitEdit}
      >
        <input
          ref={inputRef}
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={cancelEdit}
          disabled={saving}
          placeholder="Name the lesson"
        />
      </form>
      {error && <div>{error.message}</div>}
    </>
  ) : (
    <button
      className="add-lesson-button"
      onClick={() => setEditing(true)}
    >
      New Lesson
    </button>
  );
};

const mapState = state => ({
  saving: state.lessons.saving,
  error: state.lessons.error
});
export default connect(
  mapState,
  { addLesson, resetError: resetLessonError }
)(NewLesson);
