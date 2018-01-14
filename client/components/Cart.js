import React from 'react'
import { connect } from 'react-redux'
import { deleteProduct } from '../store/cart'
import { Button, Icon, Item, Image as ImageComponent, Dropdown, Menu } from 'semantic-ui-react'

const Cart = props => {

    const { submit, carts, user } = props

    const quantityOptions = [
      {key: 1, text: '1', value: 1},
      {key: 2, text: '2', value: 2},
      {key: 3, text: '3', value: 3},
      {key: 4, text: '4', value: 4},
      {key: 5, text: '5', value: 5},
      {key: 6, text: '6', value: 6},
      {key: 7, text: '7', value: 7},
      {key: 8, text: '8', value: 8},
      {key: 9, text: '9', value: 9},
      {key: 10, text: '10', value: 10}
    ]

    return (
      <div id="cart">
        <h1>Cart</h1>
        <Item.Group divided>
        {

          carts.length && carts[0].products.map(product => {
            return (

                <Item>
                  <Item.Image size='small' src={product.photo} />
                  <Item.Content>
                  <Item.Header>{product.title}</Item.Header>
                  <Item.Description>{product.description}</Item.Description>
                  <Item.Meta>
                  <span className='price'>${product.price/100}</span>
                  </Item.Meta>
                  <div className="cart-options">
                  <Item>
                  <Dropdown text={product.productCart.quantity} scrolling options={quantityOptions}/>
                  </Item>
                  <button value={product.id} onClick={submit}>Remove</button>

                  </div>
                  </Item.Content>
                </Item>

            )
          })
        }
        </Item.Group>
      </div>
  )
}

//container
const mapStateToProps = state => {
  return {
    carts: state.carts,
    user: state.user
  }

}

const mapDispatch = dispatch => {
  return {
    submit(event) {
      console.log("EVENT: ", event)
      event.preventDefault()
      const currentProduct = event.target.value
      console.log('Current Product: ', currentProduct)
      dispatch(deleteProduct(currentProduct))
    }
  }

}

export default connect(mapStateToProps, mapDispatch)(Cart)

//Actions for cart
//Add product
//remove product
//increase or decrease quantity

