import axios from 'axios'

// REVIEW ACTION TYPES
const INIT_REVIEWS = 'INIT_REVIEWS'
const CREATE_REVIEW = 'CREATE_REVIEW'
const EDIT_REVIEW = 'EDIT_REVIEW'
const DELETE_REVIEW = 'DELETE_REVIEW'

// REVIEW ACTION CREATORS
const initReviews = reviews => ({type: INIT_REVIEWS, reviews})
const createReview = review => ({type: CREATE_REVIEW, review})
const editReview = review => ({type: EDIT_REVIEW, review})
const deleteReview = review => ({type: DELETE_REVIEW, review})

// REVIEW REDUCER
export default function reducer(reviews=[], action){
  switch (action.type) {
    case INIT_REVIEWS:
      return action.reviews
    case CREATE_REVIEW:
      return [...reviews, action.review]
    case EDIT_REVIEW:
      return reviews.map(review => (
        review.id === action.review.id ? action.review : review
      ))
    case DELETE_REVIEW:
      return reviews.filter(review => review.id !== action.review.id)
    default:
      return reviews
  }
}

// REVIEW THUNK CREATORS
export const fetchReviews = () => dispatch => {
  axios.get('/api/reviews')
    .then(res => dispatch(initReviews(res.data)))
    .catch(err => console.error('Error fetching reviews: ', err))
}

export const addReview = (review) => dispatch => {
  axios.post('/api/reviews', review)
    .then(res => dispatch(createReview(res.data)))
    .catch(err => console.error('Error fetching reviews: ', err))
}

export const updateReview = (review) => dispatch => {
  axios.put(`/api/reviews/${review.id}`, review)
    .then(res => dispatch(editReview(res.data)))
    .catch(err => console.error('Error updating review', err))
}

export const removeReview = (review) => dispatch => {
  dispatch(deleteReview(review.id))
  axios.delete(`/api/reviews/${review.id}`)
  .catch(err => console.error('Error deleting review', err))
}
