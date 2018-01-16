import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import {default as carts} from './cart'
import category from './category'
import products from './products'
import orders from './orders'
import adminOrders from './adminOrders'
import reviews from './reviews'
import allUsers from './allUsers'


const reducer = combineReducers({user, products, orders, category, reviews, carts, adminOrders, allUsers})


const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
export const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './cart'
export * from './category'
export * from './products'
export * from './orders'
export * from './adminOrders'
export * from './allUsers'
