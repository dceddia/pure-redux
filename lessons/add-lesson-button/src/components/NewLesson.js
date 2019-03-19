import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { addLesson } from '../actions';
import './NewLesson.css';

const NewLesson = ({ addLesson, courseId }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const inputRef = useRef();

  const reset = () => {
    setTitle('');
    setEditing(false);
  };

  const commitEdit = e => {
    e.preventDefault();
    addLesson(title, courseId);
    reset();
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  return editing ? (
    <form
      className="add-lesson-button editing"
      onSubmit={commitEdit}
    >
      <input
        ref={inputRef}
        value={title}
        onChange={e => setTitle(e.target.value)}
        onBlur={reset}
        placeholder="Name the lesson"
      />
    </form>
  ) : (
    <button
      className="add-lesson-button"
      onClick={() => setEditing(true)}
    >
      New Lesson
    </button>
  );
};

export default connect(
  null,
  { addLesson }
)(NewLesson);
