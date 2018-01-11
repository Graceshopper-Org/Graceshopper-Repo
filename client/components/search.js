import _ from 'lodash'
import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import history from '../history'


class SearchBar extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => history.push(`/products/${result.id}`)

  handleSearchChange = (e, { value }) => {
    const { products } = this.props

    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(products, isMatch),
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state
    const { products } = this.props

    return (
      <Search
           loading={isLoading}
           onResultSelect={this.handleResultSelect}
           onSearchChange={this.handleSearchChange}
           results={results}
           value={value}
           {...this.props}
         />
    )
  }
}

/// CONTAINER ///

const mapStateToProps = ({products}) => {
  return{
    products
  }
}

export default withRouter(connect(mapStateToProps)(SearchBar))
