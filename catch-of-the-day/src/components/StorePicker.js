import React from 'react';
import { getFunName } from '../helpers';
import PropTypes from 'prop-types'

class StorePicker extends React.Component {
  myInput = React.createRef();
  static propTypes = {
    history: PropTypes.object
  }

  goToStore = (event) => {
    //stop form from submitting
    event.preventDefault();
    //get the text from that input
    const storeName = this.myInput.current.value;
    // Change the page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <form className='store-selector' onSubmit={this.goToStore}>
        {/*comment */}
        <h2>Please Enter A Store</h2>
        <input
          type='text'
          placeholder='Store Name'
          ref={this.myInput}
          required
          defaultValue={getFunName()}
        ></input>
        <button type='submit'>Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
