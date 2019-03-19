import React from 'react';
import { connect } from 'react-redux';
import { addStep, resetSteps } from './actions';

const StepCounter = ({ steps, addStep, resetSteps }) => (
  <div>
    You've walked {steps} {steps === 1 ? 'step' : 'steps'}{' '}
    today!
    <button onClick={addStep}>Add a Step</button>
    <button onClick={resetSteps}>Reset Steps</button>
  </div>
);

const mapState = state => ({
  steps: state.steps
});

const mapDispatch = {
  addStep,
  resetSteps
};

export default connect(
  mapState,
  mapDispatch
)(StepCounter);
