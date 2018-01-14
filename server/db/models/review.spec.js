/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('reviewCreation', () => {

    let checkReview

    beforeEach(() => {
      return Review.create({
        description: 'great product!',
        stars: 5
      })
      .then(review => {
        checkReview = review
      })
    })

    it('creates the review in the database', () => {
      expect(checkReview.stars).to.be.equal(5)
    })

  })

})
