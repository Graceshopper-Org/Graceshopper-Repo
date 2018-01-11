import React, { Component } from 'react'
import { connect } from 'react-redux'
import { render } from 'react-dom'
import { Link, withRouter } from 'react-router-dom'
import SingleProduct from './Products/SingleProduct'

class Category extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    const {category, products, categoryId} = this.props
    console.log('CATEGORY: ', category)
    console.log('PRODUCTS: ', this.props.products)
    return(
      <div className="productsDisplay">
        <div className="pageTitle">
          {category.length && category[0].categoryName}
        </div>
        <div>
          {
            (products.length > 0) ?
              products.filter(product => product.categories[0]).filter(product => product.categories[0].id === categoryId).map(product =>
                <SingleProduct product={product} key={product.id} />
              )
              :
              <h1>no</h1>
          }
        </div>
      </div>
    )
  }
}

/// CONTAINER ///

const mapStateToProps = ({category, products}, ownProps) => {
  const categoryId = Number(ownProps.match.params.id)
  return{
    category: category.filter(category => category.id === categoryId),
    products,
    categoryId
  }
}

const mapDispatch = {}

export default withRouter(connect(mapStateToProps, mapDispatch)(Category))
