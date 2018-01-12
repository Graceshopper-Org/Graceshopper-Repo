import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'

import {default as carts} from './cart'



import category from './category'
import products from './products'
import orders from './orders'

const reducer = combineReducers({user, products, orders, category, carts})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'

export * from './cart'

export * from './category'
export * from './products'
export * from './orders'


