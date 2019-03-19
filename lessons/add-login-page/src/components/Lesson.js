import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteLesson, resetLessonError } from '../actions';
import './Lesson.css';

const Lesson = ({
  resetError,
  deleteLesson,
  saving,
  error,
  onSubmit,
  className,
  lesson,
  children
}) => {
  const initialValue = lesson ? lesson.name : '';
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(initialValue);
  const inputRef = useRef();

  const reset = () => {
    setTitle(initialValue);
    setEditing(false);
    resetError();
  };

  const commitEdit = e => {
    e.preventDefault();
    onSubmit(title)
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

  const beginEditing = () => {
    setEditing(true);
  };

  const performDelete = () => {
    deleteLesson(lesson);
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  return editing ? (
    <>
      <form
        className={`${className || ''} editing ${
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
    children(beginEditing, performDelete)
  );
};

const mapState = state => ({
  saving: state.lessons.saving,
  error: state.lessons.error
});
export default connect(
  mapState,
  { resetError: resetLessonError, deleteLesson }
)(Lesson);
