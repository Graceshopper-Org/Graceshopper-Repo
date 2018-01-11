import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import { updateProduct } from '../../store/products';
import { addProduct } from '../../store/products';
import { removeProduct } from '../../store/products';
import { Button } from 'semantic-ui-react'
import history from '../../history'


class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.editProductInfo = this.editProductInfo.bind(this);
    this.removeProduct = this.removeProduct.bind(this)
  }


  render() {
    return (
      <div className="singleProductView">
        <div className="current-product">
          <div>
            {
              this.props.products.filter(product => product.id === this.props.product.id)
                .map(product => (
                  <div>
                    <div key={product.id}>
                      <h3> {product.title} </h3>
                      <img className="productImage" src={product.photo} />
                      <div className="editTitles">${product.price}</div>
                      <p>{product.description}</p>
                       <NavLink to={`/`}>
                         <h2>back to all products</h2>
                       </NavLink>
                    </div>
                        { this.props.user.isAdmin ? (
                          <div className="product-edit-div">
                            <div className="editProductform" key={product.id} onSubmit={this.editProductInfo}>
                              <h4> ADMIN ONLY </h4>
                              <h4>Edit Product Details:</h4>
                              <div className="editTitles">Title:</div>
                              <input
                                name="title"
                                type="text"
                                defaultValue={product.title}
                                />
                              <div className="editTitles">Price:</div>
                              <input
                                name="price"
                                type="number"
                                defaultValue={product.price}
                                />
                              <div className="editTitles">Description:</div>
                              <input
                                name="desc"
                                type="text"
                                defaultValue={product.description}
                                />
                              <div className="editTitles">Image Url:</div>
                              <input
                                name="photo"
                                type="text"
                                defaultValue={product.photo}
                                />
                              <div>
                                <input
                                  type="submit"
                                  value="Update"
                                  onClick={this.editProductInfo}
                                  />
                              </div>
                              <Button
                                onClick={ this.removeProduct }>
                                Remove
                              </Button>
                            </div>
                          </div>
                        ) : <div />
                    }
                    </div>
                  )
                )
              }
          </div>
        </div>
      </div>
    );
  }

  /*



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

  editProductInfo(event) {
    event.preventDefault();
    const product = {
      id: this.props.product.id,
      title: event.target.title.value,
      price: event.target.price.value,
      description: event.target.desc.value,
      photo: event.target.photo.value
    };
    this.props.updateProduct(product)
    event.target.title.value = '';
    event.target.price.value = '';
    event.target.desc.value = '';
    event.target.photo.value = '';
  }

}

const mapStateToProps = ({ products, user }, ownProps) => {
  const productParamId = Number(ownProps.match.params.id);
  return {
    product: _.find(products, product => product.id === productParamId),
    products,
    user
  };
}

const mapDispatchToProps = { addProduct, updateProduct, removeProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
