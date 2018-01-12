import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeProduct } from '../../store/products';
import { Button } from 'semantic-ui-react'
import history from '../../history'

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.removeProduct = this.removeProduct.bind(this);
  }

  render() {
    const { product } = this.props;
    return (
      <div className="productView">
        <NavLink className="single-product-link" activeClassName="active" to={`/products/${product.id}`}>
        <img className="productImage" src={ product.photo } />
        <div className="productInfo">
            <div id="productTitle">
              { product.title }
            </div>
        </div>
      </NavLink>
      <div id="productPrice">
        ${ product.price }
      </div>
          { this.props.user.isAdmin ?
            (
              <Button onClick={ this.removeProduct }>
                Remove
              </Button>
            ) : <div /> }
      </div>
    )
  }

  removeProduct(event) {
    const { removeProduct, product } = this.props;
    event.stopPropagation();
    removeProduct(product.id);
    history.push('/')
  }

}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatchToProps = { removeProduct };



export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
