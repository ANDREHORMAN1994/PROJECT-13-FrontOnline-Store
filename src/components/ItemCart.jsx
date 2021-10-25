import React from 'react';
import PropTypes from 'prop-types';

class ItemCart extends React.Component {
  constructor() {
    super();
    this.countAdd = this.countAdd.bind(this);
    this.countLess = this.countLess.bind(this);
    this.handleQtdItems = this.handleQtdItems.bind(this);
    this.removeItem = this.removeItem.bind(this);

    this.state = {
      count: 0,
      item: {},
    };
  }

  componentDidMount() {
    const {
      product: { id },
    } = this.props;
    const products = JSON.parse(localStorage.getItem('cartItems'));
    const item = products.find(i => i.id === id);
    if (item) {
      this.setState({ count: item.qtdItem, item });
    }
  }

  removeItem(id, price, qtdItem) {
    const { saveNewProduct, updateTotalValue, updateListProduct } = this.props;
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const newCart = cartItems.filter(item => item.id !== id);
    let total = JSON.parse(localStorage.getItem('totalPrice'));
    total = total - (price * qtdItem);

    updateListProduct(newCart);
    saveNewProduct(newCart);
    updateTotalValue(total);
    localStorage.setItem('cartItems', JSON.stringify(newCart));
    localStorage.setItem('totalPrice', JSON.stringify(total));
  }

  handleQtdItems(type) {
    const { count, item } = this.state;
    const { saveNewProduct, updateTotalValue, updateListProduct } = this.props;
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    let total = JSON.parse(localStorage.getItem('totalPrice'));
    type === 'add' ? (total += item.price) : (total -= item.price);
    cartItems.forEach(objItem => {
      if (objItem.id === item.id) {
        objItem.qtdItem = count;
      }
    });
    saveNewProduct(cartItems);
    updateListProduct(cartItems);
    updateTotalValue(total);
    localStorage.setItem('totalPrice', JSON.stringify(total));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  countAdd() {
    const { product } = this.props;
    const { available_quantity: quantity } = product;
    const { count } = this.state;
    console.log(quantity, 'quantity');
    if (Number(count) < Number(quantity)) {
      this.setState(
        ({ count }) => ({
          count: count + 1,
        }),
        () => this.handleQtdItems('add'),
      );
    } else {
      alert(`Esse produto só possui ${quantity} UND no momento!!`);
    }
  }

  countLess() {
    this.setState(
      ({ count }) => ({
        count: count - 1,
      }),
      () => this.handleQtdItems('sub'),
    );
  }

  render() {
    const { count } = this.state;
    const { product } = this.props;
    const { title, thumbnail, price, id, qtdItem } = product;
    return (
      <div className='product-card'>
        <img src={thumbnail} alt={title} width='150' />
        <div>
          <h3 data-testid='shopping-cart-product-name'>{title}</h3>
          <p>{`R$ ${price}`}</p>
          <div className='quantity-buttons'>
            <button
              data-testid='product-increase-quantity'
              type='button'
              onClick={this.countAdd}>
              +
            </button>
            <span data-testid='shopping-cart-product-quantity'>{count}</span>
            <button
              type='button'
              data-testid='product-decrease-quantity'
              onClick={this.countLess}>
              -
            </button>
            <button
              type='button'
              onClick={() => this.removeItem(id, price, qtdItem)}>
              Remover
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ItemCart.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    available_quantity: PropTypes.number,
  }).isRequired,
};

export default ItemCart;
