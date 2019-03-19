import React, { useState } from 'react';
import { Redirect } from '@reach/router';
import { connect } from 'react-redux';
import { login, signup } from '../actions';
import './LoginPage.css';

const LoginPage = ({
  currentUser,
  error,
  loading,
  login,
  signup
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (currentUser) {
    return <Redirect to="/" noThrow />;
  }

  return (
    <div className="LoginPage">
      <p>Please log in or sign up to continue.</p>
      <form onSubmit={e => e.preventDefault()}>
        <label>
          Username
          <input
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        {error && (
          <div className="error">{error.message}</div>
        )}
        <button
          type="submit"
          disabled={loading}
          onClick={() => login(username, password)}
        >
          Login
        </button>
        <button
          disabled={loading}
          onClick={() => signup(username, password)}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

const mapState = state => ({
  loading: state.user.loading,
  error: state.user.error,
  currentUser: state.user.user
});
const mapDispatch = { signup, login };
export default connect(
  mapState,
  mapDispatch
)(LoginPage);
