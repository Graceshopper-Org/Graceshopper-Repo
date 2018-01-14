import React from 'react'
import { connect } from 'react-redux'
import { deleteProduct } from '../store/cart'
import { Button, Icon, Item, Image as ImageComponent } from 'semantic-ui-react'

const Cart = props => {

    const { submit, carts, user } = props

    console.log('carts', carts)

    return (
      <div>
        <h1>Cart</h1>
        {
          carts.length && carts.map(cart => (

            <Item.Group>
              <Item>
                <Item.Image size='small' src={cart.products[0].photo} />
                <Item.Content>
                <Item.Header>{cart.products[0].title}</Item.Header>
                <Item.Meta>
                <span className='price'>{cart.products[0].price}</span>
                </Item.Meta>
                <Item.Description>{cart.products[0].description}</Item.Description>
                <Button icon value={cart.products[0].id} onClick={submit}>
                  <Icon name='trash outline' />
                </Button>
                </Item.Content>
              </Item>
            </Item.Group>
          )
        )

        }
    </div>
  )
}

//container
const mapStateToProps = state => {
  return {
    carts: state.carts,
    user: state.user
  }

}

const mapDispatch = dispatch => {
  return {
    submit: function(event) {
      // console.log("EVENT: ", event.target.value)
      event.preventDefault()
      const currentProduct = event.target.value
      console.log(currentProduct)
      dispatch(deleteProduct(currentProduct))
    }
  }

}

export default connect(mapStateToProps, mapDispatch)(Cart)

//Actions for cart
//Add product
//remove product
//increase or decrease quantity
