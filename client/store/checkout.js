import axios from 'axios'

//actions
const GET_SHIPPING_INFO = 'GET_SHIPPING_INFO'
const UPDATE_SHIPPING_INFO = 'UPDATE_SHIPPING_INFO'
const ADD_ADDRESS = 'DELETE_ADDRESS'

//action creators
const getShippingInfo = shippingInfo => ({type: GET_SHIPPING_INFO, shippingInfo})
const addNewAddress = address => ({
  type: ADD_ADDRESS, address
})
const updateShippingInfo = shippingInfo => ({type: UPDATE_SHIPPING_INFO, shippingInfo})

//reducer
export default function reducer (shippingInfo = [], action) {
  switch (action.type) {
    case GET_SHIPPING_INFO:
      return action.shippingInfo

    case ADD_ADDRESS:
        return [...shippingInfo, action.address]

    case UPDATE_SHIPPING_INFO:
      return shippingInfo.map(user => (
        user.id === action.user.id ?
        action.shippingInfo : shippingInfo))

    default:
      return shippingInfo
  }
}

//Thunks
export const getUserShippingInfo = userId => dispatch => {
  axios.get(`api/users/${userId}`)
    .then(res => {
      dispatch(getShippingInfo(res.data))
    })
    .catch(err => console.error('Error fetching user info', err))
}

export const addNewShippingAddress = address => dispatch => {
  axios.post(`/api/users`, address)
    .then(res => dispatch(addNewAddress(res.data)))
    .catch(err => console.error('Error adding address', err))
}

export const updateUserShippingInfo = userId => dispatch => {
  axios.put(`/api/users/${userId}`, userId)
  .then(res => dispatch(updateShippingInfo(res.data)))
  .catch(err => console.error('Error updating address', err))
}

