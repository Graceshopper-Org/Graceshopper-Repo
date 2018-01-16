import React from 'react'
import { Link } from 'react-router-dom'

function AdminDashboard (){
  return (
    <div className="marginClass">
      <h1>Admin Page</h1>
      <button className="ui massive button"><Link to="/admin/orders">Manage Orders</Link></button>
      <button className="ui massive button"><Link to="/">Manage Products</Link></button>
      <button className="ui massive button"><Link to="/users">Manage Users</Link></button>
    </div>
  )
}

export default AdminDashboard
