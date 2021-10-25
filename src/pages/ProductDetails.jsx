import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import ProductDetailsEvaluation from '../components/ProductDetailsEvaluation';
import TopBar from '../components/TopBar';
import Loading from '../components/Loading';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.addToLocalStorage = this.addToLocalStorage.bind(this);
    this.readLocalStorage = this.readLocalStorage.bind(this);
    this.fetchProduct = this.fetchProduct.bind(this);
    this.saveNewProduct = this.saveNewProduct.bind(this);

    this.state = {
      loading: true,
      product: {},
      carProducts: '0',
    };
  }

  componentDidMount() {
    const products = JSON.parse(localStorage.getItem('cartItems'));
    if (products) {
      this.saveNewProduct(products);
    }
    this.fetchProduct();
  }

  saveNewProduct(carProducts) {
    let count = 0;
    carProducts.forEach(item => (count += item.qtdItem));
    this.setState({ carProducts: count });
  }

  fetchProduct() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { match } = this.props;
        const { params } = match;
        const { categoryId, search, id } = params;
        const response = await api.getProductsFromCategoryAndQuery(
          categoryId,
          search,
        );
        // console.log(response.results)
        const result = response.results.find(item => item.id === id);
        // console.log(result);
        this.setState({
          loading: false,
          product: result,
        });
      },
    );
  }

  readLocalStorage() {
    return JSON.parse(localStorage.getItem('cartItems'));
  }

  // addToLocalStorage() {

  //   const cartItems = this.readLocalStorage();
  //   const addItem = [...cartItems, product];
  //   localStorage.setItem('cartItems', JSON.stringify(addItem));
  //   // console.log(this.readLocalStorage());
  // }

  addToLocalStorage() {
    const { product: item } = this.state;
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
      this.saveNewProduct(cartItems);
      total += oldItem.price;
      localStorage.setItem('totalPrice', JSON.stringify(total));
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      const newItem = { ...item, qtdItem: 1 };
      const addItem = [...cartItems, newItem];
      this.saveNewProduct(addItem);
      total += newItem.price;
      localStorage.setItem('totalPrice', JSON.stringify(total));
      localStorage.setItem('cartItems', JSON.stringify(addItem));
    }
  }

  render() {
    const { loading, product, carProducts } = this.state;
    const { thumbnail, title, price } = product;

    if (loading) return <Loading />;

    return (
      <div className='page-container'>
        <div className='page-sub-container'>
          <TopBar carProducts={carProducts} />
          <div className='product-card'>
            <img alt='Imagem do produto' src={thumbnail} />
            <div>
              <h2 data-testid='product-detail-name'>{title}</h2>
              <p>{`R$ ${price}`}</p>
              <button
                className='add-to-cart-button'
                type='button'
                data-testid='product-detail-add-to-cart'
                onClick={this.addToLocalStorage}>
                Adicionar ao carrinho
              </button>
            </div>
          </div>
          <ProductDetailsEvaluation />
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      categoryId: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
