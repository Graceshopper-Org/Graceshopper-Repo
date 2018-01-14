import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import { updateProduct, addProduct, removeProduct } from '../../store/products';
import { Button } from 'semantic-ui-react'
import history from '../../history'


class ProductDetail extends Component {

  constructor(props) {
    super(props);
    this.editCampusInfo = this.editCampusInfo.bind(this);
    // this.editProductInfo = this.editProductInfo.bind(this);
    this.removeProduct = this.removeProduct.bind(this)
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
                      { product.inventory > 0 ? <div className="product-view-price">${product.price}</div> : <div className="product-view-price">SOLD OUT</div> }
                      <div className="product-view-desc">{product.description}</div>
                      <div className="product-view-category">category :
                        <NavLink to={`/category/${product.categories[0].id}`}>
                        {product.categories[0].categoryName}
                       </NavLink>
                       </div>
                         { product.inventory > 0 ? <button>add to cart</button> : <div /> }
                       <NavLink to={`/`}>
                         <h3>back to all products</h3>
                       </NavLink>
                     </div>
                   </div>
                  { this.props.user.isAdmin ? (
                   <form onSubmit={this.editCampusInfo}>
                     <div>
                       <h4> ADMIN ONLY </h4>
                       <h4>Edit Product Details:</h4>
                       <div className="editProductForm">
                         <p>title</p>
                         {console.log('HELLO!!!!', product.categories[0].id)}
                         <input name="title" type="text" defaultValue={product.title}/>
                         <p>desc</p>
                         <input name="desc" type="text" defaultValue={product.description} />
                         <p>price</p>
                         <input name="price" type="number" defaultValue={product.price} />
                         <p>Inventory</p>
                         <input name="inventory" type="number" defaultValue={product.inventory} />
                         <p>image url</p>
                         <input name="photoURL" type="text" defaultValue={product.photo} />
                         <p>category</p>
                         <input name="category" type="text" defaultValue={product.categories[0].categoryName} />
                       </div>
                     </div>
                     <div>
                       <input type="submit" value="Submit"/>
                     </div>
                   </form>
                   )  : <div />
                  }
                  </div>
                  )
                )
              }
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

removeProduct(event) {
  const { removeProduct, product } = this.props;
  event.stopPropagation();
  removeProduct(product.id);
  history.push('/')
}

editCampusInfo(event) {
  event.preventDefault();
  const product = {
    id: this.props.product.id,
    title: event.target.title.value,
    description: event.target.desc.value,
    price: event.target.price.value,
    inventory: event.target.inventory.value,
    photo: event.target.photoURL.value,
    categories: [event.target.category.value],
  };
  this.props.updateProduct(product);
  event.target.title.value = product.title;
  event.target.desc.value = product.description;
  event.target.price.value = product.price;
  event.target.inventory.value = product.inventory;
  event.target.photoURL.value = product.photo;
  event.target.category.value = product.categories[0];
  console.log('LOG PRODUCT:', product)
}

  // editProductInfo(event) {
  //   event.preventDefault();
  //   const product = {
  //     title: event.target.title.value,
  //     description: event.target.desc.value,
  //     price: event.target.price.value,
  //     inventory: event.target.inventory.value,
  //     photo: event.target.imageUrl.value,
  //     categories: [event.target.category.value]
  //   };
  //   console.log('LOG PRODUCT:', product)
  //   this.props.updateProduct(product);
  //   event.target.title.value = '';
  //   event.target.desc.value = '';
  //   event.target.category.value = '';
  //   event.target.price.value = '';
  //   event.target.inventory.value = '';
  //   event.target.imageUrl.value = '';
  // }

}

const mapStateToProps = ({ products, user, category }, ownProps) => {
  const productParamId = Number(ownProps.match.params.id);
  return {
    product: _.find(products, product => product.id === productParamId),
    products,
    user,
    category
  };
}

const mapDispatchToProps = { addProduct, updateProduct, removeProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
