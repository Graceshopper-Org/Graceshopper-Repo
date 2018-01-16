import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../../store/products';
import SingleProduct from './SingleProduct';
import Carousel from '../carousel'
import { Form, Button } from 'semantic-ui-react'


/*
====== Structure Notes ======
• AllProducts: Renders all the products(<SingleProduct />)currently available
• SingleProduct: Single product components rendered in the AllProducts view
• ProductDetail: After clicking on a product, this is the view you see with product details
*/

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.addNewProduct = this.addNewProduct.bind(this);
  }

  render() {
    return (
      <div>
        <div className="headerforall">
        <Carousel />
        </div>
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
    const { product } = this.props
    return (
      <div>
        <Form id="adminForm" onSubmit={(event) => this.addNewProduct(event, product)}>
          <div>
            <div className="adminOnlySign"> Admin-Only </div>
            <div className="adminTitle"> Add Product: </div>
            <div>
              <label> Title: </label>
              <input name="title" type="text" required placeholder="Product title" />
              <label> Description: </label>
              <textarea name="desc" type="text" form="adminForm" placeholder="Enter description here..." />
              <label> Select Category: </label>
              <select name="category" type="text" placeholder="Product category">
                <option value="choose here" disabled>Choose one</option>
              {
                this.props.category.map(cat => <option value={cat.categoryName}>{cat.categoryName}</option>)
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
            <Button type="submit" id="submitButton" value="Submit"> Add Product </Button>
          </div>
        </Form>
      </div>
    )
  }

  getProducts() {
    return (
      <div className="productsDisplay">
        <div className="divider" />
        <div id="peruse"> peruse our lovely products </div>
        {
          this.props.products ?
            this.props.products
              .map(product => <SingleProduct key={product.id} product={product} />) : <div />
        }
      </div>
    )
  }


  addNewProduct(event, product) {
    event.preventDefault();
    const updatedproduct = Object.assign({}, product,
      {
        title: event.target.title.value,
        description: event.target.desc.value,
        price: event.target.price.value,
        inventory: event.target.inventory.value,
        photo: event.target.imageUrl.value,
        categories: [event.target.category.value]
      }
    )
    this.props.addProduct(updatedproduct);
  }


}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    product: state.product,
    user: state.user,
    category: state.category
  }
}

const mapDispatchToProps = { addProduct };

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
