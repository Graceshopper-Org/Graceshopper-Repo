import React, { Component } from 'react'
import { render } from 'react-dom'
import {connect} from 'react-redux'
import { Tab, Divider, Form, Select, Input, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

class Reviews extends Component {
  constructor(props){
    super(props)
    this.averageStars = this.averageStars.bind(this)
  }

  averageStars(){
    const {reviews, productId} = this.props
    let productReviews = reviews.filter(review => review.productId === productId)
    let totalReviews = 0
    let count = 0

    productReviews.forEach(review => {
      totalReviews += review.stars
      count++
    })
    console.log('yup')
    return (totalReviews/count).toString()
  }

  render(){
    const {reviews, productId, isLoggedIn, user} = this.props

    return(
      <div id="reviewscontainer">
        <Tab menu={{secondary: true, pointing: true}} panes={[
          {menuItem: 'Read Reviews', render: () => <Tab.Pane attached={false}>
            <h4 className="review-spacing">Average Star Rating: {this.averageStars()}</h4>
            {
              reviews.filter(review => review.productId === productId).map(review => (
                <div key={review.id}>
                  <Divider />
                  <h5 className="review-spacing">{review.stars} / 5 Stars <span className="review-author"> By: {review.user.firstName || 'anonymous'}</span></h5>
                  <p className="review-spacing">{review.description}</p>
                </div>
              ))
            }
          </Tab.Pane>},
          {menuItem: 'Write a Review', render: () => <Tab.Pane attached={false}>
            {
              isLoggedIn ?
                  <Form>
                    <h4 className="review-spacing">Review by: {user.firstName || 'anonymous'}</h4>
                    <Form.Group>
                      <Form.Field control={Select} options={[
                        {key: 5, text: 5, value: 5},
                        {key: 4, text: 4, value: 4},
                        {key: 3, text: 3, value: 3},
                        {key: 2, text: 2, value: 2},
                        {key: 1, text: 1, value: 1}
                      ]} placeholder="Stars" />
                      <Form.Field control={Input} placeholder="What'd you think?" />
                    </Form.Group>
                      <Form.Field control={Button}>Submit</Form.Field>
                    <Form.Group>
                    </Form.Group>
                  </Form>
                :
                <div>
                  Please <Link to="/login">Log-In</Link> to leave a review.
                </div>
            }
          </Tab.Pane>}
        ]}/>
      </div>
    )
  }
}

//CONTAINER//

const mapStateToProps = ({reviews, user}, ownProps) => {
  const productId = Number(ownProps.match.params.id)
  return{
    reviews,
    productId,
    isLoggedIn: !!user.id,
    user
  }

}

export default withRouter(connect(mapStateToProps)(Reviews))
