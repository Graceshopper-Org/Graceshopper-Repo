/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'

export {default as Cart} from './Cart'

export {default as UserOrders} from './Orders/UserOrders'
export {default as SingleOrder} from './Orders/SingleOrder'
export {default as AllOrders} from './Orders/AllOrders'
export {default as SingleAdminOrder} from './Orders/SingleAdminOrder'

export {default as Admin} from './Admin'
export {default as AllUsers} from './AllUsers'

export {default as Navbar} from './navbar'
export {AllProducts} from './Products/AllProducts'
export {default as Reviews} from './reviews'
export {default as UserAccount} from './UserAccount'
