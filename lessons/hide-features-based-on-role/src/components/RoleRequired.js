import { connect } from 'react-redux';

const RoleRequired = ({ currentUser, role, children }) => {
  return currentUser && currentUser.role === role
    ? children
    : null;
};

const mapState = state => ({
  currentUser: state.user.user
});
export default connect(mapState)(RoleRequired);
