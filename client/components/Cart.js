import React from 'react'
import { connect } from 'react-redux'
import { deleteProduct, setCart, store, updateProductQuantityThunkCreator } from '../store'
import { Link } from 'react-router-dom'
import { Button, Item, Dropdown } from 'semantic-ui-react'

const Cart = props => {
const { submit, carts, userId } = props

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
    if (!carts[0] || !carts[0].products){
      return (<div></div>)
    }
    return (
      <div id="cart">
        <h1>Cart</h1>
        {
          carts[0].products.length === 0 ? <h1>Your cart is empty!</h1> : carts[0].products.map(product => {
            return (
              <div>
              <Item.Group divided>
                <Item key={product.id}>
                  <Item.Image size="small" src={product.photo} />
                  <Item.Content>
                    <Item.Header>{product.title}</Item.Header>
                    <Item.Description>{product.description}</Item.Description>
                    <Item.Meta>
                      <span className="price">${product.price / 100}</span>
                    </Item.Meta>
                    <div className="cart-options">
                      <Item>
                        <div>
                          <button onClick={() => props.updateQuantity(carts[0].id, product, 'subtract')} className="quantityInline">-</button>
                          <h5 id="cartProdQuantity" className="quantityInline">{product.productCart.quantity.toString()}</h5>
                          <button onClick={() => props.updateQuantity(carts[0].id, product, 'add')} className="quantityInline">+</button>
                        </div>
                      </Item>
                    </div>
                    <Button
                    onClick={() => props.deleteProduct(product.productCart.cartId, product.id)}>
                    x
                   </Button>
                  </Item.Content>
                </Item>
              </Item.Group>
            <Link to="/checkout">Continue to Checkout</Link>
            </div>
            )
          })
        }
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
    updateQuantity: (cartId, product, addOrSubstract) => {
      dispatch(updateProductQuantityThunkCreator(cartId, product, addOrSubstract))
    },
    deleteProduct: (cartId, productId) => {
      dispatch(deleteProduct(cartId, productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(Cart)

