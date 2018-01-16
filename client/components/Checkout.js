import React from 'react'
import {connect} from 'react-redux'
import {createNewOrder} from '../store/orders'
import {clearUserCart} from '../store/cart'
import { Form, Button } from 'semantic-ui-react'

const Checkout = props => {
  const { user, carts, createOrder } = props
  const products = JSON.stringify(carts[0].products)

  return (
  <div className="marginClass">
    <h1>Checkout</h1>
    <h2>Email & Shipping Address:</h2>
    {
    <div className="checkout-form">
      <Form>
      <Form.Group>
    <form onSubmit={createOrder} id={products + 'graceShopper' + user.id + 'graceShopper' + user.email + 'graceShopper' + carts[0].id}>
      <label>
        Email
        <input type="text" name="email" defaultValue={user.email} required/>
      </label>
      <label>
        Street Address
        <input type="text" name="address" defaultValue={user.streetAddress} required />
      </label>
      <label>
        City
        <input type="text" name="city" defaultValue={user.city} required />
      </label>
      <label>
        State
        <input type="text" name="state" defaultValue={user.stateCode} required />
      </label>
      <label>
        Zip
        <input type="text" name="zipCode" defaultValue={user.zipCode} required />
      </label>
      <Button className="checkout-button" type="submit">Complete Order</Button>
    </form>
    </Form.Group>
    </Form>
    </div>
    }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    carts: state.carts,
    user: state.user,
    order: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createOrder: (event) => {
      let eventTargetObj = event.target
      event.preventDefault()
      let array = eventTargetObj.id.split('graceShopper')

      let productsArr = []
      JSON.parse(array[0]).forEach(product => {
        let productsObj = {
          id: product.id,
          name: product.title,
          quantity: product.productCart.quantity,
          price: product.price
        }
        productsArr.push(productsObj)
      })
      let order = {
        products: productsArr,
        userId: +array[1],
        cartId: +array[3],
        status: 'Created',
        email: array[2],
        streetAddress: eventTargetObj.address.value,
        city: eventTargetObj.city.value,
        stateCode: eventTargetObj.state.value,
        zipCode: +eventTargetObj.zipCode.value
      }
      dispatch(createNewOrder(order))
      dispatch(clearUserCart(order.cartId))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
