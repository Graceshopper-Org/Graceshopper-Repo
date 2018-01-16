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

  statusFilterFunc() {
    let input, filter, table, tr, td, i;
    input = document.getElementById("statusInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("ordersTable");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[5];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  render () {
    if (this.props.orders.length > 0) {
      this.props.orders.forEach(order => {
        let orderTotal = 0;
        let orderProducts = order.products
        orderProducts.forEach(product => {
          let currentProduct = JSON.parse(product)
          orderTotal += (+currentProduct.quantity * +currentProduct.price) / 100
        })
        order.total = orderTotal.toFixed(2)
      })

    return (
      <div className="marginClass">
      <h2>Customer Orders</h2>
        <div className="ui icon input">
          <input type="text" id="statusInput" onKeyUp={ this.statusFilterFunc } placeholder="Search for status..." />
          <i aria-hidden="true" className="search icon" />
        </div>
        <h4>Click on Order No. for order details</h4>
        <table className="ui single line table" id="ordersTable">
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
