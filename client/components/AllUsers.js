import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteUserThunkCreator, fetchUsers, updateUserThunkCreator } from '../store/allUsers';


const mapStateToProps = (state) => {
  return {
    users: state.allUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => {
      const usersThunk = fetchUsers()
      return dispatch(usersThunk)
    },
    deleteUser: (evt) => {
      const userId = evt.target.value
      const deleteUserThunk = deleteUserThunkCreator(userId)
      return dispatch(deleteUserThunk)
    },
    handleAdminClick: (evt) => {
      const evtArray = evt.target.id.split('admin')
      const userId = +evtArray[0]
      const userIsAdmin = (evtArray[1] === 'true')
      const currentClassName = userIsAdmin ? 'on toggle icon' : 'off toggle icon'
      document.getElementById(userId + 'admin' + userIsAdmin).className = currentClassName.includes('on') ? 'off toggle icon' : 'on toggle icon'
      const updateUserThunk = updateUserThunkCreator(userId, 'isAdmin', !userIsAdmin)
      return dispatch(updateUserThunk)
    }
  }
}

class AllUsers extends Component {

  componentDidMount () {
    this.props.getAllUsers()
  }

  render () {

    if (this.props.users.length > 0) {
      return (
        <table className="ui single line table">
          <tbody>
            <tr>
              <th>User No.</th>
              <th>ID</th>
              <th>Email</th>
              <th>Admin Flag</th>
              <th>Password Reset Flag</th>
              <th />
            </tr>
            {this.props.users.map((user, index) => (
              <tr key={ user.id }>
                <td>{ index + 1 }</td>
                <td>{ user.id }</td>
                <td>{ user.email }</td>
                <td><i
                  className={ user.isAdmin ? 'on toggle icon' : 'off toggle icon' }
                  id={ user.id + 'admin' + user.isAdmin }
                  onClick={ this.props.handleAdminClick } />
                </td>
                <td>Yes</td>
                <td>
                  <button
                    className="ui negative button" role="button"
                    value={ user.id }
                    onClick={ this.props.deleteUser }>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    } else {
      return (
        <h1>Users Loading...</h1>
      )
    }
  }

}

const ConnectedAllUsers = connect(mapStateToProps, mapDispatchToProps)(AllUsers)
export default ConnectedAllUsers
