import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { fetchCarts, setCart } from './store/cart'
import {Main, Login, Signup, UserHome, UserOrders, SingleOrder, UserAccount, Cart, AllOrders, SingleAdminOrder} from './components'
import {fetchCategories} from './store/category'
import AllProducts from './components/Products/AllProducts'
import ProductDetail from './components/Products/ProductDetail'
import { fetchProducts } from './store/products'
import { me } from './store'
import Category from './components/category'
import SearchBar from './components/search'
import Reviews from './components/reviews'
import { fetchReviews } from './store/reviews'


/**
 * COMPONENT
 */

class Routes extends Component {
  componentDidMount () {
    const categoryThunk = fetchCategories()
    const productsThunk = fetchProducts();
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}


            <Route exact path="/cart" component={Cart} />

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
            <Route
              path="/testreview/:id"
              component={Reviews}
            />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route
                   path="/home"
                   component={UserHome}
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
                   exact path="/admin/orders"
                   component={AllOrders}
                  />
                  <Route
                   exact path="/admin/orders/:orderId"
                   component={SingleAdminOrder}
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  let cookie = Number(document.cookie.slice(document.cookie.indexOf('=')+1))
  return {

    loadInitialData () {
      dispatch(me())
      dispatch(fetchCategories())
      dispatch(fetchProducts())
      dispatch(fetchReviews())
      console.log('COOKIE: ', cookie)
      dispatch(setCart(cookie))
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


