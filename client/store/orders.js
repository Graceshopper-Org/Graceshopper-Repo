import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'


/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})

/**
 * THUNK CREATORS
 */

export const fetchOrders = (userId) =>
  dispatch =>
    axios.get(`/api/orders/users/${userId}`)
      .then(res => res.data)
      .then(orders => {
        const action = getOrders(orders)
        dispatch(action)
      })
      .catch(err => console.error(err))

/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
