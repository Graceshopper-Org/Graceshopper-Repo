import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { addProduct } from '../reducers/products';
import SingleProduct from './SingleProduct';

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <div className="products">
          {this.getProducts()}
          {/*}
// ============ NEW PRODUCT FORM FOR ADMIN ============  //
          <div>
            {this.newProductForm()}
          </div>
          */}
        </div>
      </div>
    );
  }

  newProductForm() {
    return (
      <div>
        <form id="addProductsFrom" onSubmit={this.onSubmit}>
          <div>
            <h2> Add New Product </h2>
            <div>
              <label> Title: </label>
              <input name="title" type="text" required placeholder="Product Title" />
              <label> Description: </label>
              <input name="description" type="text" required placeholder="description..." />
              <label> Image Url: </label>
              {
              /* how would we get an upload image feature? */
              }
              <input name="image" type="text"placeholder="Image Url" />
            </div>
          </div>
          <div>
            <button type="submit" id="submitButton" value="Submit"> Add Product </button>
          </div>
        </form>
      </div>
    )
  }

  getProducts() {
    return (
      <div className="productsDisplay">
        <div className="pageTitle">
          <h3>Products</h3>
        </div>
        {
          this.props.products
            .map(product => <SingleProduct product={product} key={product.id} />)
        }
      </div>
    )
  }

  onSubmit(event) {
    event.preventDefault();
    const product = {
      name: event.target.name.value,
    };
    this.props.addProduct(product);
    event.target.name.value = '';
  }

}

const mapStateToProps = ({ products }) => ({ products });

const mapDispatchToProps = {};
// { addProducts }

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
