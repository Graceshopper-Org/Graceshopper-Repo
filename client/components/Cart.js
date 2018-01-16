import React, {Component} from 'react'
import { connect } from 'react-redux'
import { deleteProduct, setCart, store, updateProductQuantityThunkCreator } from '../store'
import { Button, Icon, Item, Image as ImageComponent, Dropdown, Menu } from 'semantic-ui-react'

const Cart = props => {

    const { submit, carts, userId } = props

    return (
      <div id="cart">
        <h1>Cart</h1>
        <Item.Group divided>
        {
          carts.length && carts[0].products.map(product => {
            return (
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
                    <button value={product.id} onClick={submit}>Remove</button>
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
    user: state.user,
    userId: state.user.id
  }

}

const mapDispatch = dispatch => {
  return {
    submit(event) {
      event.preventDefault()
      const currentProduct = event.target.value
      dispatch(deleteProduct(currentProduct))
    },
    updateQuantity(cartId, product, addOrSubstract) {
      dispatch(updateProductQuantityThunkCreator(cartId, product, addOrSubstract))
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(Cart)

//Actions for cart
//Add product
//remove product
//increase or decrease quantity
