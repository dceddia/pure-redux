import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import './index.css';

const App = () => (
  <div>
    <Counter />
  </div>
);

ReactDOM.render(<App />, document.querySelector('#root'));
