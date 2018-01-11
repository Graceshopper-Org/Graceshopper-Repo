import React, { Component } from 'react';
import axios from 'axios'


class SingleOrder extends Component {

  constructor() {
    super()
    this.state = {
      order: {}
    }
    this.getOrder = this.getOrder.bind(this)
  }

  getOrder(orderId) {
    axios.get(`/api/orders/${orderId}`)
      .then(res => res.data)
      .then(order => {
        this.setState({
          order: order[0]
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.getOrder(orderId)
  }

  render () {

    const order = this.state.order

    return (
      <div>
        <table>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            {order.products.map(product => (
              <tr key={ product.id }>
                <Link to={`/products/${ product.id }`}>
                  <td>{ product.id }</td>
                </Link>
                <td>{ product.createdAt }</td>
                <td>{ product.streetAdress }, { product.city }, { product.stateCode }, { product.zipCode }</td>
                <td>$ { total }</td>
                <td>{ product.status }</td>
              </tr>
            ))}
          </table>
          <h1>Shipping Address: { order.streetAdress }, { order.city }, { order.stateCode }, { order.zipCode }</h1>
          <h1>Order Status: { order.status }</h1>
          <h1>Order Total: $ { order.total }</h1>
        </div>
    )
  }

}

export default SingleOrder
