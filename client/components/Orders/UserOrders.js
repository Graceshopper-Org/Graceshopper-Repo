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
      let total = 0
      this.props.orders.products.forEach(product => {
      total += (product.price) * (product.quantity)
      })
      total = (total / 100)

    return (
      <table>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Address</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
        {this.props.orders.map(order => (
          <tr key={ order.id }>
            <Link to={`/orders/${ order.id }`}>
              <td>{ order.id }</td>
            </Link>
            <td>{ order.createdAt }</td>
            <td>{ order.streetAdress }, { order.city }, { order.stateCode }, { order.zipCode }</td>
            <td>$ { total }</td>
            <td>{ order.status }</td>
          </tr>
        ))}
      </table>
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
