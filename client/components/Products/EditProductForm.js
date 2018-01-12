// import React, { Component } from 'react'
// import { render } from 'react-dom'
// import { Link, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { Button } from 'semantic-ui-react'
// import axios from 'axios';
//
//
// export default class EditProductForm extends Component {
//   constructor() {
//     super();
//     this.state = {
//       products: {}
//     }
//   }
//
//   componentDidMount () {
//     const productId = this.props.match.params.id;
//     axios.get(`/api/products/${productId}`)
//     .then(res => res.data)
//     .then(product => {
//       this.setState({ products: product })
//     });
//   }
// ////////// replace below on line 43 ProductDetial.
//   { this.props.user.isAdmin ? (
//     <div className="product-edit-div">
//       <form className="editProductForm" key={product.id} onSubmit={this.editProductInfo}>
//         <h4> ADMIN ONLY </h4>
//         <h4>Edit Product Details:</h4>
//         <div className="editTitles">Title:</div>
//         <input
//           name="title"
//           type="text"
//           defaultValue={product.title}
//           />
//         <div className="editTitles">Price:</div>
//         <input
//           name="price"
//           type="number"
//           defaultValue={product.price}
//           />
//         <div className="editTitles">Description:</div>
//         <input
//           name="desc"
//           type="text"
//           defaultValue={product.description}
//           />
//         <div className="editTitles">Category:</div>
//           <input
//             name="category"
//             type="text"
//             defaultValue={product.categories[0].categoryName}
//             />
//         <div className="editTitles">Image Url:</div>
//         <input
//           name="photo"
//           type="text"
//           defaultValue={product.photo}
//           />
//         <Button type="submit"> Update Product </Button>
//         <Button onClick={this.removeProduct}> Remove </Button>
//       </form>
//     </div>
//   )  : <div />
// }
