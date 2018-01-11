import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div id="navbar" className="ui menu">
        <a className="item">
          <img id="logo" src="/images/logo.png" />
        </a>
        <a className="item">Categories</a>
        <div id="searchcontainer">
          <div className="ui icon input" id="navbarsearch">
            <input type="text" placeholder="Search..." />
            <i aria-hidden="true" className="search icon"></i>
          </div>
        </div>
        <div className="right menu">
          <a className="item">My Account</a>
          <a className="item">Cart</a>
        </div>
      </div>
    )
  }
}
