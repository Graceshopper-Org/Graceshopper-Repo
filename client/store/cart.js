import axios from 'axios'

// actions
const INIT_CART = 'INIT_CART'
const SET_ACTIVE_CART = 'SET_ACTIVE_CART'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'

//action creators
const fetchCart = carts => ({type: INIT_CART, carts})
const setActiveCart = carts => ({type: SET_ACTIVE_CART, carts})
const removeProduct = product => ({type: REMOVE_PRODUCT, product})
const updateQuantity = product => ({type: UPDATE_QUANTITY, product})
const addItemToCart = (cartId, product, quantity) => ({type: ADD_ITEM_TO_CART, cartId, product, quantity})

//reducer
export default function reducer(carts = [], action) {
  let newCarts = carts.slice()
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

    case ADD_ITEM_TO_CART:
      var products = newCarts[0].products
      products.push(action.product)
      products[products.length - 1].productCart = {quantity: +action.quantity, price: action.product.price, productId: action.product.id, cartId: action.cartId}
      return newCarts

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

export const addItemToCartThunkCreator = (cartId, product, quantity) =>
  dispatch => {
    product['quantity'] = quantity
    const action = addItemToCart(cartId, product, quantity)
    dispatch(action)
    axios.put(`/api/carts/${cartId}`, { newProduct: product })
      .catch(err => console.error(err))
  }

//the cookie is the cartId
export const setCart = (userId) => dispatch => {
  if(userId){

    axios.get(`/api/carts/user/${userId}`)
    .then(res => {
      dispatch(setActiveCart(res.data))
    })
    .catch(err => console.error('Error fetching cart', err))
  }
}

export const deleteProduct = (cartId, productId) => dispatch => {
  dispatch(removeProduct(productId))
  axios.delete(`/api/carts/${cartId}/delete-product/${productId}`)
    .catch(err => console.error(`Error deleting product: ${productId}`, err))
}
