import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    addToOrder: PropTypes.func,
  };
  render() {
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === 'available';

    //first solution i made below, better terminary solution in jsx

    // function button() {
    //     if(!isAvailable) {
    //         return <button disabled>Sold Out</button>
    //     }else {
    //      return <button>Add To Cart</button>
    //     }
    // }

    const clickHandler = () => {
      this.props.addToOrder(this.props.index);
    };
    return (
      <li className='menu-fish'>
        {this.props.fish}
        <img src={image} alt={name}></img>
        <h3 className='fish-name'>
          {name}
          <span className='price'>{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        {/* {button()} */}
        <button onClick={clickHandler} disabled={!isAvailable}>
          {isAvailable ? 'Add To the Order' : 'Sold Out!'}
        </button>
      </li>
    );
  }
}
export default Fish;
