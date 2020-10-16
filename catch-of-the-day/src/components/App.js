import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes.js';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  //sync our fish and order states to firebase
  componentDidMount() {
    //when we load the app it is updating state and in turn triggering DidUpdate
    //so we need to  make a reference to the local storage before it gets deleted
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    //now we sync to firebase, unrelated to const above^
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
    //tried to avoid using local storage but was unable to update state removeFromOrder

    // this.OrderRef = base.syncState(`${this.props.match.params.storeId}/order`, {
    //   context: this,
    //   state: 'order',
    // });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  //prevent memory leak in case user swaps back and forth between stores
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  addFish = (fish) => {
    console.log('adding a fish');
    //take a copy of existing state
    const fishes = { ...this.state.fishes };
    //add our new fish to that fishes variable (date.now gives a unique number)
    fishes[`fish${Date.now()}`] = fish;
    //set the new fishes object to state
    this.setState({
      fishes: fishes,
    });
  };

  deleteFish = (key) => {
    //take a copy of state
    const fishes = { ...this.state.fishes };
    //update the state
    //in order to have firebase delete it we must set it's value to null
    fishes[key] = null;
    //update the state
    this.setState({
      fishes: fishes,
    });
  };
  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };
  addToOrder = (key) => {
    //take copy of state
    const order = { ...this.state.order };
    //add to order
    order[key] = order[key] + 1 || 1;
    //update state
    this.setState({
      order: order,
    });
  };
  removeFromOrder = (key) => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    // 2. remove that itemf from order
    delete order[key];
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  //function so state value in inventory can be edited
  updateFish = (key, updatedFish) => {
    //take a copy of the current state
    const fishes = { ...this.state.fishes };
    //update that state
    fishes[key] = updatedFish;
    //set that to the state
    this.setState({
      fishes: fishes,
    });
  };

  render() {
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
          <ul className='fishes'>
            {Object.keys(this.state.fishes).map((fish) => {
              return (
                <Fish
                  addToOrder={this.addToOrder}
                  key={fish}
                  index={fish}
                  details={this.state.fishes[fish]}
                />
              );
            })}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          deleteFish={this.deleteFish}
          updateFish={this.updateFish}
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId = {this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
