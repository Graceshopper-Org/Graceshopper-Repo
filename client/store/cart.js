import axios from 'axios'

// actions
const INIT_CART = 'INIT_CART'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'

//action creators
const initCart = carts => ({type: INIT_CART, carts})
const removeProduct = product => ({type: REMOVE_PRODUCT, product})
const updateQuantity = product => ({type: UPDATE_QUANTITY, product})

//reducer
export default function reducer(carts = [], action) {
  switch (action.type) {
    case INIT_CART:
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
export const fetchCarts = () => dispatch => {
  axios.get('/api/carts')
    .then(res => {
      dispatch(initCart(res.data))})
    .catch(err => console.error('Error fetching cart', err))
}

export const deleteProduct = (product) => dispatch => {
  dispatch(removeProduct(product.id))
  axios.delete(`/api/products/${product.id}`)
    .catch(err => console.error(`Error deleting product: ${product}`, err))
}
