import React from 'react'
import { connect } from 'react-redux'
import { deleteProduct } from '../store/cart'
import { Button, Icon, Item, Image as ImageComponent } from 'semantic-ui-react'

const Cart = props => {

    const { carts, products} = props

    console.log('CART: ', carts)
    console.log('PRODUCTS: ', products)

    return (
      <div>
        <h1>Cart</h1>
        {
          products.length && products.map(product => {
            return (
            <Item.Group>
            <Item>
              <Item.Image size='tiny' src={product[0].photo} />
              <Item.Content>
              <Item.Header>{product[0].title}</Item.Header>
              <Item.Meta>
              <span className='price'>{product[0].price}</span>
              </Item.Meta>
              <Item.Description>{product[0].description}</Item.Description>
              </Item.Content>
            </Item>
            </Item.Group>
            )
          })
        }
      </div>
  )
}

//container
const mapStateToProps = state => {
  const products = state.carts.map(cart => cart.products)
  return {
    carts: state.carts,
    products
  }

}

// const mapDispatch

export default connect(mapStateToProps)(Cart)

//Actions for cart
//Add product
//remove product
//increase or decrease quantity

