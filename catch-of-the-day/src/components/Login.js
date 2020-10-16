import React from 'react';
import PropTypes from 'prop-types';

//must pass props as a param  to use it in a stateless component
const Login = (props) => {
  return (
    <nav className='login'>
      <h2>Inventory Login</h2>
      <p>Sign in to manage your store's inventory.</p>
      {/* Note that stateless components only need props.${prop} if this component had state
      it would be this.props.authenticate */}
      <button className='github' onClick={() => props.authenticate('Github')}>
        Log In With GitHub
      </button>
      <button className='twitter' onClick={() => props.authenticate('Twitter')}>
        Log In With Twitter
      </button>
      <button
        className='facebook'
        onClick={() => props.authenticate('Facebook')}
      >
        Log In With Facebook
      </button>
    </nav>
  );
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
