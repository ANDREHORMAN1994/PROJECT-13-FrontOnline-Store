import React from 'react';
import { Link } from 'react-router-dom';
import House from '../images/house.svg';

class TopBar extends React.Component {
  render() {
    const { carProducts } = this.props;

    return (
      <div className='header-container'>
        <Link to='/'>
          <img alt='home' src={House} width={20} />
        </Link>
        <Link to='/Cart' data-testid='shopping-cart-button' className="car-items">
          <img
            alt='Carrinho'
            src='https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG37.png'
          />
          <span data-testid='shopping-cart-size'>{carProducts}</span>
        </Link>
      </div>
    );
  }
}

export default TopBar;
