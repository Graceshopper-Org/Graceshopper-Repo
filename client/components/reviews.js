import React, { Component } from 'react'
import { render } from 'react-dom'
import {connect} from 'react-redux'
import { Tab, Divider, Form, Select, Input, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import { addReview } from '../store/reviews'

class Reviews extends Component {
  constructor(props){
    super(props)
    this.averageStars = this.averageStars.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
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

    return (totalReviews/count).toFixed(2)
  }

  submitHandler(event){
    event.preventDefault()
    const {user, productId, addNewReview} = this.props

    let review = {
      description: event.target.review.value,
      stars: Number(event.target.stars.value),
      productId,
      userId: user.id
    }
    addNewReview(review)
    document.getElementById('review-form').reset()
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
                  <form id="review-form" onSubmit={this.submitHandler}>
                    <h4 className="review-spacing">Review by: {user.firstName || 'anonymous'}</h4>
                    <div className="center">
                      <select name="stars" class="ui search dropdown" id="stars">
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                      </select>
                      <div class="ui input">
                        <input name="review" placeholder="What'd you think?" id="review"></input>
                      </div>
                    </div>
                    <div className="center">
                      <button type="submit" class="ui button">Submit</button>
                    </div>
                  </form>
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

const mapDispatch = (dispatch) => {
  return{

    addNewReview(review){
      dispatch(addReview(review))
    }

  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(Reviews))
