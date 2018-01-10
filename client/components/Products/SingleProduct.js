import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeProduct } from '../../store/products';

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.removeProduct = this.removeProduct.bind(this);
  }

  render() {
    const { product } = this.props;
    return (
      <div className="productView">
            <img className="productImage" src={product.photo} />
          <NavLink className="single-product-link" activeClassName="active" to={`/products/${product.id}`}>
            <div id="campusName">
              {product.title}
            </div>
          </NavLink>
          <button
            className="submitButton"
            onClick={this.removeProduct}>
            Remove
          </button>
      </div>
    )
  }

  removeProduct(event) {
    const { removeProduct, product } = this.props;
    event.stopPropagation();
    alert('are you sure you want to remove this product?')
    removeProduct(product.id);
    window.location.reload()
  }

}

const mapStateToProps = ({ Products }) => ({ Products });

const mapDispatchToProps = { removeProduct };



export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
