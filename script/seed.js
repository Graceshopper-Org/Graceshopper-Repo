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
const {User, Product, Category, Cart, Order, productCart, Review} = require('../server/db/models')
const Promise = require('bluebird')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'guy@aemail.com',
    password: 'asjeas'}),
    User.create({email: 'person@yahHOOOOO.com',
    password: 'awesomepassword'}),
    User.create({email: 'nipbelter@hotmail.com',
    password: 'nippy'}),
    User.create({email: 'hermet_elbowton@yooohooo.com',
    password: 'hermybaby'}),
    User.create({email: 'uncleTerry@heybro.com',
    password: 'YEAHBROTHER'}),
    User.create({email: 'clydeDavis@countryman.com',
    password: 'yeeeehaw'}),
    User.create({email: 'orangeFeet@getsomesocks.com',
    password: 'help'}),
    User.create({email: 'rebecca@rebec.com',
    password: 'iamrebecca'}),
    User.create({email: 'alexa.billings@gmail.com', password: 'alexa'})
  ])

  const products = await Promise.all([
    Product.create({
      title: 'password-shirt',

      photo: '/images/alexaimages_shirts_bags/shirt4.jpg',

      description: 'Sweet T featuring Steve Carrell and insecure passwords',
      price: 3500,
      inventory: 1}),
    Product.create({
      title: 'putting out the fire mug',
      photo: '/images/patimages_mugs/mug1.jpg',
      description: 'when you pay the minimum on your credit card',
      price: 899,
      inventory: 11
    }),
    Product.create({
      title: 'liver-crossfit-koozie',
      photo: '/images/alexaimages_shirts_bags/coosy.jpg',
      description: 'Liver crossfit koozie',
      price: 1000,
      inventory: 1
    }),
    Product.create({
      title: 'Don\'t act like you\'re not impressed',
      photo: '/images/alexaimages_shirts_bags/bag3.jpg',
      description: 'Drawstring bag with Will Farrell...don\'t act like you\'re not impressed.',
      price: 10025,
      inventory: 17
    }),
    Product.create({
      title: 'grandparents mug',
      photo: '/images/patimages_mugs/mug2.jpg',
      description: 'when ur telling ur grandparents about ur job and they have no clue what ur talking about but they\'re supportive',
      price: 500,
      inventory: 15
    }),
    Product.create({
      title: 'bad life choices mug',
      photo: '/images/patimages_mugs/mug3.jpg',
      description: 'me --- (sad music) ---> my problems',
      price: 799,
      inventory: 7
    }),
    Product.create({
      title: 'no wifi mug',
      photo: '/images/patimages_mugs/mug4.jpg',
      description: 'when your wifi is down for ten minutes',
      price: 1000,
      inventory: 12
    }),
    Product.create({
      title: 'airplane funeral mug',
      photo: '/images/patimages_mugs/mug5.jpg',
      description: 'when the plane hits the slightest bit of turbulence so you take a shot and start planning your funeral',
      price: 1499,
      inventory: 25
    }),
    Product.create({
      title: 'your company mug',
      photo: '/images/patimages_mugs/mug7.jpg',
      description: 'to find someone who asks for nothing but your company',
      price: 1399,
      inventory: 18
    }),
    Product.create({
      title: 't.j. maxx mug',
      photo: '/images/patimages_mugs/mug8.jpg',
      description: 'tj maxx cashier: did you find everything you were looking for? | *me unloading full cart* first of all, i wasn\'t looking for any of this',
      price: 1700,
      inventory: 15
    })
  ])

  const productCategory = [
      {productId: 1, categoryId: 3},
      {productId: 2, categoryId: 2},
      {productId: 3, categoryId: 5},
      {productId: 4, categoryId: 3},
      {productId: 5, categoryId: 4}
  ]

  const categories = await Promise.all([
    Category.create({categoryName: 'T-Shirts'}),
    Category.create({categoryName: 'Hoodies'}),
    Category.create({categoryName: 'Mugs'}),
    Category.create({categoryName: 'Koozies'}),
    Category.create({categoryName: 'Everything Else'})
  ]).then(categories => {
    categories[1].addProduct(1);
    categories[2].addProduct(2);
    categories[3].addProduct(3);
    categories[4].addProduct(4)
  })

  const carts = await Promise.all([
    Cart.create({userId: 1}),
    Cart.create({userId: 2}),
    Cart.create({userId: 3}),
    Cart.create({userId: 4}),
    Cart.create({userId: 5}),
    Cart.create({userId: 6}),
    Cart.create({userId: 9})
  ])

  const orders = await Promise.all([
    Order.create({products: ['{\"id\": 1, \"name\":\"password-shirt\", \"quantity\": 3, \"price\": 1495}', '{\"id\": 2, \"name\":\"putting out the fire mug\", \"quantity\": 4, \"price\": 1705}'], status: 'created', userId: 1, streetAddress: '200 Wonderful Rd', city: 'Wonderfulness', stateCode: 'IL', zipCode: 61616}),
    Order.create({products: ['{\"id\": 1, \"name\":\"password-shirt\", \"quantity\": 3, \"price\": 1495}'], status: 'cancelled', userId: 1, streetAddress: '200 Wonderful Rd', city: 'Wonderfulness', stateCode: 'IL', zipCode: 61616}),
    Order.create({products: ['{\"id\": 1, \"quantity\": 3, \"price\": 1495}', '{\"id\": 2, \"quantity\": 1, \"price\": 2295}'], status: 'processing', userId: 2}),
    Order.create({products: ['{\"id\": 1, \"quantity\": 3, \"price\": 1495}'], status: 'cancelled', userId: 3}),
    Order.create({products: ['{\"id\": 1, \"quantity\": 3, \"price\": 1495}'], status: 'complete', userId: 4}),
    Order.create({products: ['{\"id\": 1, \"quantity\": 3, \"price\": 1495}'], status: 'created', userId: 5}),
    Order.create({products: ['{\"id\": 1, \"quantity\": 3, \"price\": 1495}'], status: 'processing', userId: 6}),
    Order.create({products: ['{\"id\": 1, \"quantity\": 3, \"price\": 1495}'], status: 'cancelled', userId: 7})
  ])

  const reviews = await Promise.all([
    Review.create({description: 'great product!', stars: 5, productId: 1, userId: 1}),
    Review.create({description: 'not so great, would avoid', stars: 1, productId: 2, userId: 2}),
    Review.create({description: 'very nice', stars: 4, productId: 3, userId: 3}),
    Review.create({description: 'needs improvement', stars: 2, productId: 4, userId: 4}),
    Review.create({description: 'bad', stars: 1, productId: 5, userId: 5}),
    Review.create({description: 'good stuff', stars: 3, productId: 1, userId: 6})
  ])

  const productCarts = await Promise.all([
    productCart.create({quantity: 1, price: 1500, productId: 1, cartId: 1}),
    productCart.create({quantity: 1, price: 100, productId: 2, cartId: 1}),
    productCart.create({quantity: 1, price: 775, productId: 3, cartId: 1}),
    productCart.create({quantity: 2, price: 1899, productId: 4, cartId: 2}),
    productCart.create({quantity: 1, price: 10001, productId: 5, cartId: 3}),
    productCart.create({quantity: 2, price: 1500, productId: 1, cartId: 4}),
    productCart.create({quantity: 1, price: 10001, productId: 5, cartId: 4}),
    productCart.create({quantity: 2, price: 775, productId: 3, cartId: 5}),
    productCart.create({quantity: 1, price: 1899, productId: 4, cartId: 5}),
    productCart.create({quantity: 3, price: 100, productId: 2, cartId: 6}),
    productCart.create({quantity: 1, price: 1899, productId: 4, cartId: 7}),
    productCart.create({quantity: 5, price: 1600, productId: 3, cartId: 7})
    ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded ${products.length} products`)
  // console.log(`seeded ${categories.length} categories`)
  // console.log(`seeded ${carts.length} carts`)
  // console.log(`seeded ${orders.length} orders`)
  // console.log(`seeded ${reviews.length} reviews`)
  // console.log(`seeded ${productCarts.length} productCarts`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
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
