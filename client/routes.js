import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, UserOrders, SingleOrder, UserAccount, Cart, Checkout, AllOrders, SingleAdminOrder, Admin, AllUsers} from './components'
import { fetchInitialCart, setCart } from './store/cart'
import {fetchCategories} from './store/category'
import AllProducts from './components/Products/AllProducts'
import ProductDetail from './components/Products/ProductDetail'
import { fetchProducts } from './store/products'
import { me } from './store'
import Category from './components/category'
import SearchBar from './components/search'
import Reviews from './components/reviews'
import { fetchReviews } from './store/reviews'
import { fetchOrders } from './store/orders'


/**
 * COMPONENT
 */

class Routes extends Component {
  componentDidMount () {
    const {loadInitialData} = this.props
    const categoryThunk = fetchCategories()
    const productsThunk = fetchProducts();
    loadInitialData()
  }

  render () {
    const {isLoggedIn, userId, setActiveCart, setDefaultCart} = this.props

    let cookie = Number(document.cookie.slice(document.cookie.lastIndexOf('=') + 1))

    if (isLoggedIn){
      setActiveCart(userId)
    } else {
      setDefaultCart(cookie)
    }

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/cart" component={Cart} />

            <Route exact path="/checkout" component={Checkout} />

            <Route
              exact
              path="/"
              component={AllProducts}
              />
            <Route
              exact
              path="/products/:id"
              component={ProductDetail} />
            <Route
              exact
              path="/category/:id"
              component={Category}
            />
            <Route
              path="/login"
              component={Login}
              />
            <Route
              path="/signup"
              component={Signup}
              />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}


                  <Route
                   path="/home"
                   component={UserHome, AllProducts}
                  />
                  <Route
                   exact path="/orders"
                   component={UserOrders}
                  />
                  <Route
                   exact path="/orders/:orderId"
                   component={SingleOrder}
                  />
                  <Route
                   exact path="/users/:userId"
                   component={UserAccount}
                  />
                  <Route
                   exact path="/admin"
                   component={Admin}
                  />
                  <Route
                   exact path="/admin/orders"
                   component={AllOrders}
                  />
                  <Route
                   exact path="/admin/orders/:orderId"
                   component={SingleAdminOrder}
                  />
                  <Route
                   exact path="/users"
                   component={AllUsers}
                  />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route
              component={Login}
              />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch) => {

  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchCategories())
      dispatch(fetchProducts())
      dispatch(fetchReviews())
    },
    setActiveCart (userId) {
      dispatch(setCart(userId))
      dispatch(fetchOrders(userId))
    },
    setDefaultCart (cookie) {
      dispatch(fetchInitialCart(cookie))
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
