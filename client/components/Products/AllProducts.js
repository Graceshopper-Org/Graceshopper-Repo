import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../../store/products';
import SingleProduct from './SingleProduct';


/*
====== Structure Notes ======
• AllProducts: Renders all the products(<SingleProduct />)currently available
• SingleProduct: Single product components rendered in the AllProducts view
• ProductDetail: After clicking on a product, this is the view you see with product details
*/

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <div>
            { this.props.user.isAdmin ? (this.newProductForm()) : <div /> }
        </div>
        <div>
          {this.getProducts()}
        </div>
      </div>
    );
  }

  newProductForm() {
    return (
      <div>
        <form id="addProductsFrom" onSubmit={this.onSubmit}>
          <div>
            <h5> Admin-Only </h5>
            <h4> Add Product: </h4>
            <div>
              <label> Title: </label>
              <input name="title" type="text" required placeholder="Product title" />
              <label> Description: </label>
              <textarea name="desc" type="text" form="addProductsFrom" placeholder="Enter description here..." />
              <label> Select Category: </label>
              <select name="category" type="text" placeholder="Product category">
              {
                this.props.category.map(cat => <option>{cat.categoryName}</option>)
                }
              </select>
              <label> Price: </label>
              <input name="price" type="number" required placeholder="Enter price" />
              <label> Inventory: </label>
              <input name="inventory" type="number" required placeholder="Enter inventory" />
              <label> Image Url: </label>
              <input name="imageUrl" type="text" defaultValue="/images/defaultphoto.jpg" />
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
          All Products
        </div>
        {
          this.props.products ?
            this.props.products
              .map(product => <SingleProduct product={product} key={product.id} />) : <div />
        }
      </div>
    )
  }

  onSubmit(event) {
    event.preventDefault();
    const product = {
      title: event.target.title.value,
      description: event.target.desc.value,
      price: event.target.price.value,
      inventory: event.target.inventory.value,
      photo: event.target.imageUrl.value,
      categories: [event.target.category.value]
    };
    this.props.addProduct(product);
    event.target.title.value = '';
    event.target.desc.value = '';
    event.target.category.value = '';
    event.target.price.value = '';
    event.target.inventory.value = '';
    event.target.imageUrl.value = '';
  }

}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    user: state.user,
    category: state.category
  }
}

const mapDispatchToProps = { addProduct };

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
