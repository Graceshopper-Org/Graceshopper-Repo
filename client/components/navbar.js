import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import {logout} from '../store'
import {connect} from 'react-redux'
import { Search, Icon } from 'semantic-ui-react'
import SearchBar from './search'

class Navbar extends Component {
  constructor(props){
    super(props)
  }

  displayCategories(element){
    document.getElementById('categorymenu').style.display = 'block'
  }

  hideCategories(){
    document.getElementById('categorymenu').style.display = 'none'
  }

  displayAccountInfo(element){
    document.getElementById('accountmenu').style.display = 'block'
  }

  hideAccountInfo(){
    document.getElementById('accountmenu').style.display = 'none'
  }

  render() {
    const {isLoggedIn, handleClick, category, products, isAdmin, user} = this.props
    return (
      <div id="navbar" className="ui menu">
        <Link className="item" to="/">
          <img id="logo" src="/images/logo.png" />
        </Link>
        <div className="ui dropdown item" onMouseEnter={this.displayCategories}>
      Categories
          <i className="dropdown icon"></i>
          <div className="menu" id="categorymenu" onMouseLeave={this.hideCategories}>
            {
              category && category.map(category => (
                <Link to={`/category/${category.id}`} className="item" key={category.id}>
                  {category.categoryName}
                </Link>
              ))
            }
          </div>
        </div>
        <div id="searchcontainer">
          <SearchBar id="navbarsearch" fluid={true} />
        </div>
        <div className="right menu">
        <div className="ui dropdown item" onMouseEnter={this.displayAccountInfo}>
        Account
            <i className="dropdown icon"></i>
            <div className="menu" id="accountmenu" onMouseLeave={this.hideAccountInfo}>
              {
                isLoggedIn
                  ? (
                    this.props.user.isAdmin ?
                      <div>
                          <Link to={`/users/${user.id}`} className="item">My Account</Link>
                          <Link to="/admin" className="item">Admin Page</Link>
                          <a href="#" onClick={handleClick} className="item">Log Out</a>
                      </div> :
                      <div>
                          <Link to="#" className="item">My Account</Link>
                          <a href="#" onClick={handleClick} className="item">Log Out</a>
                      </div>
                    )
                  : <div>
                      <div>
                        <Link to="/login" className="item">Log In</Link>
                      </div>
                      <div>
                        <Link to="/signup" className="item">Sign Up</Link>
                      </div>
                    </div>
              }
            </div>
          </div>
          <Link to="/cart" className="item"><Icon name="shopping cart"/></Link>
        </div>

      </div>
    )
  }
}

///CONTAINER///

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    category: state.category,
    products: state.prodcuts,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(Navbar))
