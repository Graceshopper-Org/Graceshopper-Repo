import React from 'react'
import { connect } from 'react-redux'
import { deleteProduct } from '../store/cart'
import { Button, Icon, Item } from 'semantic-ui-react'

const Cart = props => {

    const { carts } = props

    console.log('PRODUCTS: ', carts)
    return (
        <div>
        <h1>Cart</h1>
        <Item.Group divided>
        <Item>
          <Item.Image/>
        </Item>

        <Item>
          <Item.Image src='/assets/images/wireframe/image.png' />
        </Item>

        <Item image='/assets/images/wireframe/image.png' />
      </Item.Group>
        <Button icon>
          <Icon />
        </Button>
      </div>
      )
}

//container
const mapStateToProps = ({carts}) => ({carts})

// const mapDispatch

export default connect(mapStateToProps)(Cart)

//Actions for cart
//Add product
//remove product
//increase or decrease quantity

