import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'


/**
 * INITIAL STATE
 */
const defaultAllOrders = []

/**
 * ACTION CREATORS
 */
const getAllOrders = orders => ({type: GET_ALL_ORDERS, orders})
const updateOrder = (orderId, status) => ({ type: UPDATE_ORDER, orderId, status})

/**
 * THUNK CREATORS
 */

export const fetchAllOrders = () =>
  dispatch =>
    axios.get(`/api/orders`)
      .then(res => res.data)
      .then(orders => {
        const action = getAllOrders(orders)
        dispatch(action)
      })
      .catch(err => console.error(err))

export const updateOrderThunkCreator = (orderId, status) =>
  dispatch => {
    const action = updateOrder(orderId, status)
    dispatch(action)
    axios.put(`/api/orders/${orderId}`, { status })
      .catch(err => console.error(err))
  }

/**
 * REDUCER
 */
export default function (state = defaultAllOrders, action) {

  let newState = state.slice();

  switch (action.type) {
    case GET_ALL_ORDERS:
      return action.orders
    case UPDATE_ORDER:
      newState.forEach(order => {
        if (order.id === action.orderId) {
          order.status = action.status
        }
      })
      return newState
    default:
      return newState
  }
}
