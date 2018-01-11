import React, { Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import { initCart, deleteProduct } from '../store/cart'
import { Image, Item } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'

export class Cart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { carts } = this.props
    console.log('PROPS: ', this.props.match.params)
    return (
      <div class="ui divided items">
      <div class="item">
        <div class="image">
          <img src="https://res.cloudinary.com/teepublic/image/private/s--O5uFXkWG--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_470/c_crop,g_north_west,h_626,w_470,x_0,y_0/g_north_west,u_upload:v1462829015:production:blanks:mtl53ofohwq5goqjo9ke,x_-395,y_-325/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1513727293/production/designs/2198697_1.jpg"></img>
        </div>
        <div class="content">
      <a class="header">Product</a>
      <div class="meta">
        <span>Description</span>
      </div>
      <div class="description">
        <p>This is an example product description.</p>
      </div>
      <button type="sumbit" class="ui icon button"><i class="trash outline icon"></i></button>
    </div>
    </div>
    <button class="ui button">Proceed to Checkout</button>
    </div>
    )
  }
}

//container
const mapStateToProps = ({carts}, ownProps) => {
  return {
    carts
  }
}


const mapDispatch = dispatch => {
  return {
    deleteProduct: deleteProduct
  }
}

export default connect(mapStateToProps, mapDispatch)(Cart)

//Actions for cart
//Add product
//remove product
//increase or decrease quantity

