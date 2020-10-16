import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import PropTypes from 'prop-types';
import Login from './Login';
import firebase, { auth } from 'firebase/app';
import 'firebase/auth';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  };

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }
  //auth function lives in inventory
  authHandler = async (authData) => {
    //Look up the current store in the firebase database
    //put await in front of .fetch so it returns the store
    //instead of a promise
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    //claim it if there is no owner
    if (!store.owner) {
      //if there is no owner push the data to firebase
      //pushing to owner field, if there is none it will create it
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    //set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
    console.log(authData);
  };
  authenticate = (provider) => {
    //in order to have dynamic auth call we use square bracket notation
    //so which we can use string interpolation instead of using
    //something like auth.FacebookAuthProvider
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  //logout method made an async function becauase we want them to log out
  //of firebase
  logout = async () => {
    console.log('logging out!');
    await firebase.auth().signOut();
    this.setState({
      uid: null,
    });
  };
  render() {
    const logout = <button id="logout" onClick={this.logout}>Log-out</button>;
    //check if they are logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    //check if they are not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you're not the owner of this page!</p>
          {logout}
        </div>
      );
    }
    //if they are logged in and the owner render the page
    return (
      <div className='inventory'>
        <h2>Inventory!!!</h2>
        {logout}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            index={key}
            key={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
