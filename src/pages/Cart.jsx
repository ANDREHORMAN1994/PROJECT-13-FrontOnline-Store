import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import ItemCart from '../components/ItemCart';
import TopBar from '../components/TopBar';

class Cart extends React.Component {
  constructor() {
    super();

    this.saveNewProduct = this.saveNewProduct.bind(this);
    this.loadList = this.loadList.bind(this);
    this.updateListProduct = this.updateListProduct.bind(this);
    this.updateTotalValue = this.updateTotalValue.bind(this);

    this.state = {
      listProduct: [],
      emptyCart: true,
      carProducts: 0,
      total: 0,
    };
  }

  componentDidMount() {
    const products = JSON.parse(localStorage.getItem('cartItems'));
    const total = JSON.parse(localStorage.getItem('totalPrice'));
    if (products) {
      this.saveNewProduct(products);
    }
    if (total) {
      this.setState({ total });
    }
    this.loadList();
  }

  updateTotalValue(total) {
    this.setState({ total })
  }

  updateListProduct(listProduct) {
    this.setState({ listProduct });
  }

  saveNewProduct(carProducts) {
    let count = 0;
    carProducts.forEach(item => (count += item.qtdItem));
    this.setState({ carProducts: count });
  }

  loadList() {
    if (localStorage.length) {
      const products = JSON.parse(localStorage.getItem('cartItems'));
      this.setState({
        emptyCart: false,
        listProduct: [...products],
      });
    }
  }

  render() {
    const { listProduct, emptyCart, carProducts, total } = this.state;
    const products = localStorage.getItem('cartItems');
    // console.log(products);

    if (products === '[]' || emptyCart || !Number(carProducts)) {
      return (
        <div className='page-container'>
          <div className='page-sub-container'>
            <TopBar />
            <h1
              data-testid='shopping-cart-empty-message'
              className='empty-cart'>
              Seu carrinho está vazio
            </h1>
          </div>
        </div>
      );
    }

    return (
      <div className='page-container'>
        <div className='page-sub-container'>
          <TopBar carProducts={carProducts} />
          <div className='items-card-container'>
            {listProduct
              .filter(product => product.qtdItem && Number(product.qtdItem) > 0)
              .map(product => (
                <ItemCart
                  key={product.id}
                  product={product}
                  saveNewProduct={this.saveNewProduct}
                  updateListProduct={this.updateListProduct}
                  updateTotalValue={this.updateTotalValue}
                />
              ))}
          </div>
          <Link
            data-testid='checkout-products'
            to='/Cart/Finish'
            className='final-to-cart-button'
          >
            {`Finalizar Compra Total: R$ ${Math.round(total * 100) / 100}`}
          </Link>
        </div>
      </div>
    );
  }
}

export default Cart;
