import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateOrderThunkCreator } from '../../store/adminOrders'

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (orderId, status) => {
      let updateThunk = updateOrderThunkCreator(orderId, status)
      dispatch(updateThunk)
    }
  }
}

class SingleAdminOrder extends Component {

  constructor() {
    super()
    this.state = {
      order: {},
      status: ''
    }
    this.getOrder = this.getOrder.bind(this)
    this.getFormattedTime = this.getFormattedTime.bind(this)
    this.localHandleSubmit = this.localHandleSubmit.bind(this)
  }

  getOrder(orderId) {
    axios.get(`/api/orders/${ orderId }`)
      .then(res => {
        return res.data
      })
      .then(order => {
        this.setState({
          order: order,
          status: order.status
        })
      })
      .catch(err => console.error(err))
  }

  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.getOrder(orderId)
  }

  getFormattedTime (fourDigitTime) {
    var hours24 = parseInt(fourDigitTime.substring(0, 2),10);
    var hours = ((hours24 + 11) % 12) + 1;
    var amPm = hours24 > 11 ? 'pm' : 'am';
    var minutes = fourDigitTime.substring(2);
    return hours + ':' + minutes + ' ' + amPm;
  }

  localHandleSubmit (evt) {
    evt.preventDefault()
    let status = evt.target.status.value
    this.setState({
      status
    })
    this.props.handleSubmit(this.state.order.id, status)
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
      order.time = this.getFormattedTime((order.createdAt.slice(11, 13) + '') + (order.createdAt.slice(14, 16) + ''))

      return (
        <div className="marginClass">
          <h2>Customer Order Details</h2>
          <h5>Click on Product No. for product info</h5>
          <table className="ui single line table">
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
            <table className="ui definition table">
                <tbody>
                  <tr>
                    <td>Date</td>
                    <td>{ order.createdAt.slice(0, 10) }</td>
                  </tr>
                  <tr>
                    <td>Time</td>
                    <td>{ order.time }</td>
                  </tr>
                  <tr>
                    <td>Shipping Address</td>
                    <td>{ order.streetAddress }, { order.city }, { order.stateCode }, { order.zipCode }</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>${ order.total }</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>{ this.state.status }</td>
                  </tr>
                </tbody>
            </table>
            <form onSubmit={ this.localHandleSubmit }>
              <select className="ui fluid selection dropdown" id="admin-order-select" name="status">
                <option value="Created">Created</option>
                <option value="Processing">Processing</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
              <button type="submit" className="ui button" role="button">Update status</button>
            </form>
        </div>
      )
      } else {
        return (
          <h1>Order not found</h1>
        )
      }
  }
}

const ConnectedSingleAdminOrder = connect('', mapDispatchToProps)(SingleAdminOrder)

export default ConnectedSingleAdminOrder
