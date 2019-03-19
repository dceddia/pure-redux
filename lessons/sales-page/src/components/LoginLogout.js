import React from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { logout } from '../actions';

const LoginLogout = ({ currentUser, logout }) => {
  const performAction = () => {
    if (currentUser) {
      logout();
    } else {
      navigate('/login');
    }
  };
  return (
    <button className="LoginLogout" onClick={performAction}>
      {currentUser ? 'Logout' : 'Login'}
    </button>
  );
};

const mapState = state => ({
  currentUser: state.user.user
});
const mapDispatch = {
  logout
};
export default connect(
  mapState,
  mapDispatch
)(LoginLogout);
