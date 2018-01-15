import axios from 'axios'

// actions
const INIT_CART = 'INIT_CART'
const SET_ACTIVE_CART = 'SET_ACTIVE_CART'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
// const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'

//action creators
const fetchCart = carts => ({type: INIT_CART, carts})
const setActiveCart = carts => ({type: SET_ACTIVE_CART, carts})
const removeProduct = product => ({type: REMOVE_PRODUCT, product})
const updateQuantity = product => ({type: UPDATE_QUANTITY, product})
// const addItemToCart = product => ({type: ADD_ITEM_TO_CART, product})

//reducer
export default function reducer(carts = [], action) {
  switch (action.type) {
    case INIT_CART:
      return action.carts

    case SET_ACTIVE_CART:
      return action.carts

    case REMOVE_PRODUCT:
      return carts.filter(product => product.id !== action.product.id)

    case UPDATE_QUANTITY:
      return carts.map(product => (
        product.id === action.product.id ? action.product : product
      ))

    default:
      return carts
  }
}

//thunks
export const fetchInitialCart = cartId => dispatch => {
  axios.get(`api/carts/${cartId}`)
    .then(res => {
      dispatch(fetchCart(res.data))})
    .catch(err => console.error('Error fetching initial cart', err))
}

//the cookie is the cartId
export const setCart = (userId) => dispatch => {
  if (userId){

    axios.get(`/api/carts/user/${userId}`)
    .then(res => {
      dispatch(setActiveCart(res.data))
    })
    .catch(err => console.error('Error fetching cart', err))
  }
}

export const deleteProduct = (cartId, productId) => dispatch => {
  dispatch(removeProduct(productId))
  dispatch(fetchInitialCart(cartId))
  axios.delete(`/api/carts/${cartId}/delete-product/${productId}`)
    .catch(err => console.error(`Error deleting product: ${productId}`, err))
}
