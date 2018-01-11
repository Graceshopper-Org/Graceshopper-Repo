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
        <img id="logo" src="/images/logo.png" />
      </div>
    )
  }
}
