import React from 'react';
import '../App.css';
import TopBar from '../components/TopBar';

class FinishCart extends React.Component {
  constructor() {
    super();

    this.saveNewProduct = this.saveNewProduct.bind(this);
    this.loadList = this.loadList.bind(this);

    this.state = {
      listProduct: [],
      emptyCart: true,
      carProducts: '0',
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
    const { listProduct, emptyCart, total, carProducts } = this.state;
    const products = localStorage.getItem('cartItems');
    // console.log(products);

    if (products === '[]' || emptyCart) {
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
              .filter(item => Number(item.qtdItem) > 0)
              .map(item => (
                <div className='product-card' key={item.id}>
                  <img src={item.thumbnail} alt={item.title} width='100' />
                  <div>
                    <h3 data-testid='shopping-cart-product-name'>
                      {item.title}
                    </h3>
                    <p>{`QTD: ${item.qtdItem} - R$ ${
                      Math.round(item.price * 100) / 100
                    }`}</p>
                  </div>
                </div>
              ))}
          </div>
          <span>{`Total: R$ ${Math.round(total * 100) / 100}`}</span>
          <form className='form-final-buy' >
            <h3>Informações do Comprador</h3>
            <input
              data-testid='checkout-fullname'
              placeholder='Nome completo'
              type='text'
              required
            />
            <input
              data-testid='checkout-email'
              placeholder='Email'
              type='text'
              required
            />
            <input
              data-testid='checkout-cpf'
              placeholder='CPF'
              type='text'
              required
            />
            <input
              data-testid='checkout-phone'
              placeholder='Telefone'
              type='text'
              required
            />
            <input
              data-testid='checkout-cep'
              placeholder='CEP'
              type='text'
              required
            />
            <input
              data-testid='checkout-address'
              placeholder='Endereço'
              type='text'
              required
            />
            <button type='button'>Comprar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default FinishCart;
