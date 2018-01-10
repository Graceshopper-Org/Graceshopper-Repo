import React, { Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
// import { Link } from 'react-router-dom'

export class Cart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <h1>I am the cart.</h1>
    )
  }
}

//Actions for cart
//Add product
//remove product
//increase or decrease quantity

