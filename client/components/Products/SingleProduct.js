import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { removeProduct } from '../reducers/products';

class SingleProduct extends Component {
  constructor(props) {
    super(props);

    // this.removeProduct = this.removeProduct.bind(this);
  }

  render() {
    const { product } = this.props;
    return (
      <div className="campusItem">
          <img src={product.photo} />
        <NavLink className="single-product-link" activeClassName="active" to={`/products/${product.id}`}>
          <div id="campusName">
            {product.name}
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

  // removeProduct(event) {
  //   const { removeProduct, product } = this.props;
  //   event.stopPropagation();
  //   alert('are you sure you want to remove this campus?')
  //   removeProduct(campus.id);
  //   window.location.reload()
  // }

}

const mapStateToProps = ({ Products }) => ({ Products });

const mapDispatchToProps = {};
// { removeProduct }


export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
