import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, UserOrders, SingleOrder, UserAccount} from './components'
import {fetchCategories} from './store/category'
import AllProducts from './components/Products/AllProducts'
import ProductDetail from './components/Products/ProductDetail'
import { fetchProducts } from './store/products'
import { me } from './store'
import Category from './components/category'
import SearchBar from './components/search'

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
            <Route
              exact
              path='/'
              component={AllProducts}
              />
            <Route
              exact
              path="/products/:id"
              component={ProductDetail} />
            <Route
              exact
              path='/category/:id'
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
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchCategories())
      dispatch(fetchProducts())
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


