import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'

export class Navbar extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div id="navbar" class="ui menu">
        <a class="item">
          <img id="logo" src="/images/logo.png" />
        </a>
        <a class="item">Categories</a>
        <div id="searchcontainer">
          <div class="ui icon input" id="navbarsearch">
            <input type="text" placeholder="Search..." />
            <i aria-hidden="true" class="search icon"></i>
          </div>
        </div>
        <div class="right menu">
          <a class="item">My Account</a>
          <a class="item">Cart</a>
        </div>
      </div>
    )
  }
}
