import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import Loading from './Loading';
import Item from './ItemCategory';

class ListCategory extends React.Component {
  constructor() {
    super();

    this.fetchCategories = this.fetchCategories.bind(this);

    this.state = {
      loading: true,
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const response = await api.getCategories();
        // console.log(response)
        this.setState(() => ({
          loading: false,
          categories: [...response],
        }));
      },
    );
  }

  render() {
    const { loading, categories } = this.state;
    const { sendCategoryId } = this.props;
    if (loading) return <Loading />;
    return (
      <div>
        {
          categories.map(({ id, name }) => (<Item
            key={ id }
            name={ name }
            id={ id }
            onClick={ sendCategoryId }
          />))
        }
      </div>
    );
  }
}

ListCategory.propTypes = {
  sendCategoryId: PropTypes.func.isRequired,
};


export default ListCategory;
