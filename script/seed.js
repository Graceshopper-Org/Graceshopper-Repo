/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const { Category, User } = require('../server/db/models')


// const reviews = [
//   {description: 'great product!', stars: 5},
//   {description: 'not so great, would avoid', stars: 1},
//   {description: 'very nice', stars: 4},
//   {description: 'needs improvement', stars: 2},
//   {description: 'bad', stars: 1},
//   {description: 'good stuff', stars: 3}
// ]

const categories = [
  {
    categoryName: 'T-Shirts'
  },
  {
    categoryName: 'Hoodies'
  },
  {
    categoryName: 'Mugs'
  },
  {
    categoryName: 'Koozies'
  },
  {
    categoryName: 'Everything Else'
  }
]

const users =
[
  {
    email: "guy@aemail.com",
    password:"asjeas"
  },
  {
    email: "person@yahHOOOOO.com",
    password:"awesomepassword"
  },
  {
    email: "nipbelter@hotmail.com",
    password:"nippy"
  },
  {
    email: "hermet_elbowton@yooohooo.com",
    password:"hermybaby"
  },
  {
    email: "uncleTerry@heybro.com",
    password:"YEAHBROTHER"
  },
  {
    email: "clydeDavis@countryman.com",
    password:"yeeeehaw"
  },
  {
    email: "orangeFeet@getsomesocks.com",
    password:"help"
  },
  {
    email: "rebecca@rebec.com",
    password:"iamrebecca"
  }
]

function seed () {
db.sync({ force: true })
.then(() => {
  console.log('db synced!')
  Promise.all(categories.map(category =>
    Category.create(category)))
})
.then(() => {
  return Promise.all(users.map(user => User.create(user)))
})
// .then(() => {
//   console.log(`seeded successfully`)
// })
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  // console.log(`seeded ${categories.length} categories`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .then(() => console.log('seeded successfully'))
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
