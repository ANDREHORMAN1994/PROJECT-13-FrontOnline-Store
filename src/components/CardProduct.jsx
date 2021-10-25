import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { Link } from 'react-router-dom';

class CardProduct extends React.Component {
  constructor() {
    super();
    this.addToLocalStorage = this.addToLocalStorage.bind(this);
    this.createLocalStorage = this.createLocalStorage.bind(this);
    this.readLocalStorage = this.readLocalStorage.bind(this);
  }

  componentDidMount() {
    this.createLocalStorage();
  }

  createLocalStorage() {
    if (!localStorage.getItem('cartItems')) {
      localStorage.setItem('cartItems', JSON.stringify([]));
      localStorage.setItem('totalPrice', JSON.stringify(0));
    }
  }

  readLocalStorage() {
    return JSON.parse(localStorage.getItem('cartItems'));
  }

  addToLocalStorage() {
    const { item, saveNewProduct } = this.props;
    const cartItems = this.readLocalStorage();
    let total = JSON.parse(localStorage.getItem('totalPrice'));
    const oldItem = cartItems.find(product => product.id === item.id);
    if (oldItem) {
      oldItem.qtdItem += 1;
      cartItems.map(objItem => {
        if (objItem.id === oldItem.id) {
          return oldItem;
        }
      });
      saveNewProduct(cartItems);
      total += oldItem.price;
      localStorage.setItem('totalPrice', JSON.stringify(total));
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      const newItem = { ...item, qtdItem: 1 };
      const addItem = [...cartItems, newItem];
      saveNewProduct(addItem);
      total += newItem.price;
      localStorage.setItem('totalPrice', JSON.stringify(total));
      localStorage.setItem('cartItems', JSON.stringify(addItem));
    }
  }

  render() {
    const { item, categoryId, searchKey } = this.props;
    const { title, price, thumbnail, id } = item;
    return (
      <div className='product-card'>
        <Link to={`/${categoryId}/${searchKey}/${id}`}>
          <img src={thumbnail} alt={title} width='100' />
        </Link>
        <div className='product-info' data-testid='product-detail-link'>
          <Link
            to={`/${categoryId}/${searchKey}/${id}`}
            data-testid='product'
            className='product-link'>
            <div data-testid='product-detail-link'>
              <h4>{title}</h4>
            </div>
          </Link>
          <p>{`R$ ${price}`}</p>
          <button
            type='button'
            data-testid='product-add-to-cart'
            onClick={this.addToLocalStorage}
            className='add-to-cart-button'>
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    );
  }
}

CardProduct.propTypes = {
  categoryId: PropTypes.string.isRequired,
  searchKey: PropTypes.string.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
  }).isRequired,
};

export default CardProduct;
