import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import {logout} from '../store'
import {connect} from 'react-redux'

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
    const {isLoggedIn, handleClick, category} = this.props
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
          <div className="ui icon input" id="navbarsearch">
            <input type="text" placeholder="Search..." />
            <i aria-hidden="true" className="search icon"></i>
          </div>
        </div>
        <div className="right menu">
        <div className="ui dropdown item" onMouseEnter={this.displayAccountInfo}>
        Account
            <i className="dropdown icon"></i>
            <div className="menu" id="accountmenu" onMouseLeave={this.hideAccountInfo}>
              {
                isLoggedIn
                  ? <div>
                        <Link to="#" className="item">My Account</Link>
                        <a href="#" onClick={handleClick} className="item">Log Out</a>
                    </div>
                  : <div>
                      <div className="item">
                        <Link to="/login">Log In</Link>
                      </div>
                      <div className="item">
                        <Link to="/signup">Sign Up</Link>
                      </div>
                    </div>
              }
            </div>
          </div>
          <a className="item">Cart</a>
        </div>
      </div>
    )
  }
}

///CONTAINER///

const mapStateToProps = (state) => {
  console.log(state)
  return {
    isLoggedIn: !!state.user.id,
    category: state.category
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
