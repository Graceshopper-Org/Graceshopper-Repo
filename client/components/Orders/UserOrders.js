import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchOrders } from '../../store/orders';


const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrdersForUser: (userId) => {
      const ordersThunk = fetchOrders(userId)
      return dispatch(ordersThunk)
    }
  }
}

class UserOrders extends Component {

  componentDidMount () {
    if (this.props.user.id) {
      const userId = this.props.user.id
      this.props.getOrdersForUser(userId)
    }
  }



  render () {


    if (this.props.orders.length > 0) {
      this.props.orders.forEach(order => {
        let orderTotal = 0;
        let orderProducts = order.products.map(product => JSON.parse(product))
        orderProducts.forEach(product => {
          orderTotal += (+product.quantity * +product.price) / 100
        })
        order.total = orderTotal.toFixed(2)
      })

    return (
      <div>
      <h2>My Orders</h2>
        <h4>Click on Order No. for order details</h4>
        <table className="ui celled table">
          <tbody>
            <tr>
              <th>Order No.</th>
              <th>Date</th>
              <th>Address</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
            {this.props.orders.map((order, index) => (
              <tr key={ order.id }>
                <td><Link to={`/orders/${ order.id }`}>{ index + 1 }</Link></td>
                <td>{ order.createdAt.slice(0, 10) }</td>
                <td>{ order.streetAddress }, { order.city }, { order.stateCode }, { order.zipCode }</td>
                <td>${ order.total }</td>
                <td>{ order.status }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
    } else {
      return (
        <div>
          <h1>No previous orders</h1>
        </div>
      )
    }

  }

}

const ConnectedOrders = connect(mapStateToProps, mapDispatchToProps)(UserOrders)


export default ConnectedOrders
