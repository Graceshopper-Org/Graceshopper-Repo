import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateProduct, addProduct, removeProduct } from '../../store/products';
import { addCategory } from '../../store/category'
import { addItemToCartThunkCreator } from '../../store/cart'
import { Button, Form } from 'semantic-ui-react'
import history from '../../history'
import Reviews from '../reviews'


class ProductDetail extends Component {

    constructor(props) {
      super(props);
      this.editProductDetails = this.editProductDetails.bind(this);
      this.removeProduct = this.removeProduct.bind(this)
      this.createACategory = this.createACategory.bind(this)
      this.addToCart = this.addToCart.bind(this)
  }

  render() {
    return (
      <div className="singleProductView">
            {
              this.props.products.filter(product => product.id === this.props.product.id)
                .map(product => (
                    <div className="current-product-header" key={product.id}>
                      <div className="current-product">
                      <img className="product-view-image" src={product.photo} />
                      <div className="product-view-info">
                      <div className="product-view-title"> {product.title} </div>
                      {
                        product.inventory ?
                        <div className="product-view-price">${product.price}</div>
                        :
                        <div className="product-view-price">SOLD OUT</div>
                      }
                      <div className="product-view-desc">{product.description}</div>
                      <div className="product-view-category"><u>Category</u>:
                        { product.categories.length ?
                          <NavLink to={`/category/${product.categories[0].id}`}>
                            {product.categories[0].categoryName}
                          </NavLink>
                          : <p> No Current Category </p>
                        }
                       </div>
                         {
                           product.inventory ?
                           <div className="addtocartform">
                             <p><u>quantity</u></p>
                             <form onSubmit={this.addToCart}>
                              <select name="productQuantity" id={this.props.carts[0].id}>
                                <option name="quantity" type="number" value="1">1</option>
                                <option name="quantity" type="number" value="2">2</option>
                                <option name="quantity" type="number" value="3">3</option>
                                <option name="quantity" type="number" value="4">4</option>
                                <option name="quantity" type="number" value="5">5</option>
                              </select>
                              <button id="customButton" type="submit">add to cart</button>
                            </form>
                         </div>
                           :
                           <div />
                         }
                       <NavLink to={`/`}>
                         <h3>back to all products</h3>
                       </NavLink>
                     </div>
                   </div>
                  {
                    this.props.user.isAdmin ? (
                     <Form id="adminFormEditProduct" onSubmit={(event) => this.editProductDetails(event, product)}>
                       <div>
                         <h4> ADMIN ONLY </h4>
                         <h4>Edit Product Details:</h4>
                         <div className="editProductForm">
                           <label>Title</label>
                           <input name="title" type="text" defaultValue={product.title} />
                           <label>Description</label>
                           <input name="desc" type="text" defaultValue={product.description} />
                           <label>Price</label>
                           <input name="price" type="number" defaultValue={product.price} />
                           <label>Inventory</label>
                           <input name="inventory" type="number" defaultValue={product.inventory} />
                           <label>Image Url</label>
                           <input name="photoURL" type="text" defaultValue={product.photo} />
                           <label>Category</label>
                           <select name="category" type="text">
                           {
                               this.props.category.map(cat =>
                                 <option value={JSON.stringify(cat)}>{cat.categoryName}</option>)
                           }
                             </select>
                            {/*
                              product.categories.length ?
                              <input name="category" type="text" defaultValue={product.categories[0].categoryName} />
                              :
                              <p> no current categories </p>
                            */}
                         </div>
                       </div>
                       <div>
                         <Button input type="submit"> Update Product </Button>
                         <Button onClick={this.removeProduct}> Remove Product </Button>
                       </div>
                     </Form>
                    ) :
                   <div />
                  }
                    {
                      this.props.user.isAdmin ? (
                        <form onSubmit={this.createACategory}>
                          <div>
                            <h4> CATEGORY HUB </h4>
                            <div className="addCategoryForm">
                              <p>Create New Category</p>
                              <input name="category" type="text" placeholder="add a category"/>
                            </div>
                          </div>
                          <div>
                            <input type="submit" value="Add Category"/>
                          </div>
                        </form>
                      ) : <div />
                  }
                }
                </div>
              )
            )
          }
              }
              <Reviews />
      </div>
    );
  }


  /*
  ====== ignore this feature - possible backburner
  ====== allows admins to UPLOAD images to server
  ====== to add additional to product images
  uploadPhotos(){
    return (
      <div>
        <form action="upload.php" method="post" enctype="multipart/form-data">
          Select image to upload:
          <input type="file" name="fileToUpload" id="fileToUpload" />
          <input type="submit" value="Upload Image" name="submit" />
        </ form>
      </div>
    )
  }
  */

  // ========= Add To Cart ========= \\
  addToCart(event){
    event.preventDefault();
    const quantity = event.target.productQuantity.value
    const cartId = this.props.carts[0].id
    const product = this.props.product
    this.props.addItemToCartThunkCreator(cartId, product, quantity);
    // event.target.productQuantity.value = '1';
  }

  // ========= Admin: Remove Product ========= \\
  removeProduct(event) {
    const { removeProduct, product } = this.props;
    event.stopPropagation();
    removeProduct(product.id);
    history.push('/')
  }

  // ========= Admin: Edit Product ========= \\
  editProductDetails(event, product) {
    event.preventDefault();
    const updatedproduct = Object.assign({}, product,
      {
        id: this.props.product.id,
        title: event.target.title.value,
        description: event.target.desc.value,
        price: event.target.price.value,
        inventory: event.target.inventory.value,
        photo: event.target.photoURL.value,
        categories: [JSON.parse(event.target.category.value)]
      }
    )
    this.props.updateProduct(updatedproduct);
  }

  // ========= Admin: Create Category ========= \\
  createACategory(event) {
    event.preventDefault();
    const category = {
      id: this.props.category.id,
      categoryName: event.target.category.value,
    };
    this.props.addCategory(category);
    event.target.category.value = '';
  }

}

const mapStateToProps = ({ products, user, category, carts }, ownProps) => {
  const productParamId = Number(ownProps.match.params.id);
  return {
    product: products.find(product => product.id === productParamId),
    products,
    user,
    category,
    carts
  };
}

const mapDispatchToProps = { addProduct, updateProduct, removeProduct, addCategory, addItemToCartThunkCreator };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
