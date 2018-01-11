import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'



class SingleOrder extends Component {

  constructor() {
    super()
    this.state = {
      order: {}
    }
    this.getOrder = this.getOrder.bind(this)
  }

  getOrder(orderId) {
    axios.get(`/api/orders/${ orderId }`)
      .then(res => {
        return res.data
      })
      .then(order => {
        this.setState({
          order: order
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.getOrder(orderId)
  }

  render () {

    if (this.state.order.id) {

      let order = this.state.order
      let orderTotal = 0;
      let orderProducts = order.products.map(product => JSON.parse(product))
      orderProducts.forEach(product => {
        orderTotal += (+product.quantity * +product.price) / 100
      })
      order.total = orderTotal.toFixed(2)

      return (
        <div>
          <h5>Click on Product No. for product info</h5>
          <table>
            <tbody>
                <tr>
                  <th>Product No.</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
                {orderProducts.map((product, index) => (
                  <tr key={ product.id }>
                    <td><Link to={`/products/${ product.id }`}>{ index + 1 }</Link></td>
                    <td>{ product.name }</td>
                    <td>{ product.quantity }</td>
                    <td>${ product.price / 100 }</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4>Shipping Address: { order.streetAddress }, { order.city }, { order.stateCode }, { order.zipCode }</h4>
            <h4>Order Total: ${ order.total }</h4>
            <h4>Order Status: { order.status }</h4>
        </div>
      )
      } else {
        return (
          <h1>Order not found</h1>
        )
      }
  }

}

export default SingleOrder
