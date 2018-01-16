import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const CREATE_ORDER = 'CREATE_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})
const createOrder = order => ({type: CREATE_ORDER, order})

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

export const createNewOrder = order => dispatch => {
  axios.post('/api/orders', order)
    .then(res => dispatch(createOrder(res.data)))
    .catch(err => console.error('Error creating order', err))
}
/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  let newState = state.slice()
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case CREATE_ORDER:
      newState.push(action.order)
      return newState
    default:
      return state
  }
}
