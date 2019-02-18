import React from 'react';

class Counter extends React.Component {
  state = {
    count: 0
  };

  increment = () => {
    this.setState(state => ({
      count: state.count + 1
    }));
  };

  decrement = () => {
    this.setState(state => ({
      count: state.count - 1
    }));
  };

  render() {
    return (
      <div className="counter">
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span className="count">{this.state.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }
}

export default Counter;
