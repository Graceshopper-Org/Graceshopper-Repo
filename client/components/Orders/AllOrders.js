import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchAllOrders } from '../../store/adminOrders';


const mapStateToProps = (state) => {
  return {
    orders: state.adminOrders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllOrders: () => {
      const ordersThunk = fetchAllOrders()
      return dispatch(ordersThunk)
    }
  }
}

class AllOrders extends Component {

  componentDidMount () {
    this.props.getAllOrders()
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
      <h2>Customer Orders</h2>
        <h4>Click on Order No. for order details</h4>
        <table className="ui single line table">
          <tbody>
            <tr>
              <th>Order No.</th>
              <th>ID</th>
              <th>Date</th>
              <th>Address</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
            {this.props.orders.map((order, index) => (
              <tr key={ order.id }>
                <td><Link to={`/admin/orders/${ order.id }`}>{ index + 1 }</Link></td>
                <td>{ order.id }</td>
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
          <h1>No customer orders</h1>
        </div>
      )
    }
  }

}

const ConnectedAllOrders = connect(mapStateToProps, mapDispatchToProps)(AllOrders)

export default ConnectedAllOrders
