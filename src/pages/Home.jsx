import React from 'react';
import * as api from '../services/api';
import ListCategory from '../components/ListCategory';
import CardProduct from '../components/CardProduct';
import '../App.css';
import Loading from '../components/Loading';
import TopBar from '../components/TopBar';
import Logo from '../images/clube-dos-4.png';
import Lupa from '../images/lupa.png';

class Home extends React.Component {
  constructor() {
    super();

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.fetchQueryAndCategoryId = this.fetchQueryAndCategoryId.bind(this);
    this.sendCategoryId = this.sendCategoryId.bind(this);
    this.saveNewProduct = this.saveNewProduct.bind(this);

    this.state = {
      newSearch: '',
      searchKey: '',
      searchProducts: [],
      categoryId: ' ',
      loading: false,
      carProducts: 0,
    };
  }

  componentDidMount() {
    const products = JSON.parse(localStorage.getItem('cartItems'));
    if (products) {
      this.saveNewProduct(products);
    }
  }

  saveNewProduct(carProducts) {
    let count = 0;
    carProducts.forEach(item => (count += item.qtdItem));
    this.setState({ carProducts: count });
  }

  handleSearchChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  fetchQueryAndCategoryId() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { searchKey, categoryId } = this.state;
        const response = await api.getProductsFromCategoryAndQuery(
          categoryId,
          searchKey,
        );
        // console.log(response.results);
        this.setState({
          loading: false,
          searchProducts: [...response.results],
          newSearch: searchKey,
        });
      },
    );
  }

  sendCategoryId({ target }) {
    this.setState(
      {
        loading: true,
        categoryId: target.id,
      },
      () => this.fetchQueryAndCategoryId(),
    );
  }

  render() {
    const {
      newSearch,
      searchKey,
      categoryId,
      searchProducts,
      loading,
      carProducts,
    } = this.state;
    return (
      <div className='home-container'>
        <div className='home-aside-container'>
          <img alt='logo' src={Logo} width={200} />
          <ListCategory sendCategoryId={this.sendCategoryId} />
        </div>
        <div className='home-search-container'>
          <div className='search-subcontainer'>
            <TopBar carProducts={carProducts} />
            <div className='search-bar-container'>
              <input
                name='searchKey'
                type='text'
                value={searchKey}
                onChange={this.handleSearchChange}
                data-testid='query-input'
              />
              <button
                className='search-button'
                type='button'
                onClick={this.fetchQueryAndCategoryId}
                data-testid='query-button'>
                <img alt='Buscar' src={Lupa} />
              </button>
            </div>
            <h3
              data-testid='home-initial-message'
              style={{ textAlign: 'center' }}>
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h3>
            <div className='item-cards-container'>
              {loading ? (
                <Loading />
              ) : (
                searchProducts.map(item => (
                  <CardProduct
                    key={item.id}
                    item={item}
                    categoryId={categoryId}
                    searchKey={newSearch === '' ? ' ' : newSearch}
                    saveNewProduct={this.saveNewProduct}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
