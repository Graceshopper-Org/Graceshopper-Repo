import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import { addProduct } from '../../store/products';
import { updateProduct } from '../../store/products';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    // this.enrollNewStudent = this.enrollNewStudent.bind(this);
    this.editProductInfo = this.editProductInfo.bind(this);
  }

  render() {
    return (
      <div className="singleProductView">
        <div className="current-product">
          <div>
            {
              this.props.products.filter(product => product.id === this.props.product.id)
                .map(product => (
                    <div key={product.id}>
                      <h3> {product.title} </h3>
                      <img className="productImage" src={product.photo} />
                      <h5>{product.price}</h5>
                      <p>{product.description}</p>
                       <NavLink to={`/`}>
                         <h2>back to all products</h2>
                       </NavLink>
                    </div>
                  )
                )
            }
          </div>
        </div>
        <br />
        <div>
          {this.editProductTitle()}
        </div>
        <br />
        <div>
          {/*this.newStudentForm()*/}
        </div>
        <br />
        <div>
          {/*this.getStudentsInCampus()*/}
        </div>
        <br />
      </div>
    );
  }


//   getStudentsInCampus() {
//     return (
//       <div>
//         <h4>Current Students: </h4>
//         {
//           this.props.students.filter(student => student.productId === this.props.product.id)
//           .map(currentStudent => (
//               <NavLink key={currentStudent.id} to={`/students/${currentStudent.id}`}>
//               <h4> {currentStudent.fullname} </h4>
//             </NavLink>)
//           )
//         }
//       </div>
//     )
//   }
//
  editProductTitle() {
    return (
      <div>
        <form onSubmit={this.editProductInfo}>
          <div>
            <h4>Edit Product Details: </h4>
            <h4>
              <input name="title" type="text" required placeholder="Enter New Product Title" />
            </h4>
          </div>
          <div>
            <input type="submit" value="Submit" onClick={this.pageReloader}
            />
          </div>
        </form>
      </div>
    )
  }
//
//   newStudentForm() {
//     return (
//       <div>
//         <form onSubmit={this.enrollNewStudent}>
//           <div>
//             <h4>Enroll New Student: </h4>
//             <h4>
//               <input name="firstName" type="text" required placeholder="First Name" />
//             </h4>
//             <h4>
//               <input name="lastName" type="text" required placeholder="Last Name" />
//             </h4>
//             <h4>
//               <input name="email" type="text" required placeholder="Student Email" />
//             </h4>
//           </div>
//           <div>
//             <input type="submit" value="Submit" onClick={this.pageReloader} />
//           </div>
//         </form>
//       </div>
//     )
//   }
//
//   enrollNewStudent(event) {
//     event.preventDefault();
//     const student = {
//       firstName: event.target.firstName.value,
//       lastName: event.target.lastName.value,
//       email: event.target.email.value,
//       productId: this.props.product.id
//     };
//     this.props.addProduct(student);
//     event.target.firstName.value = '';
//     event.target.lastName.value = '';
//     event.target.email.value = '';
//   }
//
  editProductInfo(event) {
    event.preventDefault();
    const product = {
      id: this.props.product.id,
      title: event.target.title.value
    };
    this.props.updateProduct(product);
    event.target.title.value = '';
  }
//
  pageReloader(){
    return window.location.reload()
  }

}

const mapStateToProps = ({ products }, ownProps) => {
  const productParamId = Number(ownProps.match.params.id);
  return {
    product: _.find(products, product => product.id === productParamId),
    products
  };
}

const mapDispatchToProps = { addProduct, updateProduct };

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
