import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import './index.css';

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      let item = {
        id: Math.random(),
        name: action.name
      };

      return [...state, item];
    default:
      return state;
  }
}

const store = createStore(reducer);

const List = ({ items }) => {
  return items.length ? (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  ) : (
    <div>No items yet</div>
  );
};

const mapState = state => {
  return {
    items: state
  };
};

const ConnectedList = connect(mapState)(List);

class App extends React.Component {
  state = {
    itemName: ''
  };

  setItemName = e => {
    this.setState({
      itemName: e.target.value
    });
  };

  addItem = () => {
    this.props.dispatch({
      type: 'ADD_ITEM',
      name: this.state.itemName
    });
    this.setState({ itemName: '' });
  };

  render() {
    const { itemName } = this.state;

    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <label>
            Item to buy:
            <input
              value={itemName}
              onChange={this.setItemName}
            />
          </label>
          <button
            onClick={this.addItem}
            disabled={!itemName}
          >
            Add
          </button>
        </form>
        <ConnectedList />
      </div>
    );
  }
}

const ConnectedApp = connect()(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.querySelector('#root')
);
