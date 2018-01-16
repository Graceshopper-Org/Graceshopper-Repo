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
    password: 'asjeas', isAdmin: true}),
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
    password: 'iamrebecca', needsPasswordReset: true}),
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
    }),
    Product.create({
      title: 'when you wanna get in shape bag',
      photo: '/images/alexaimages_shirts_bags/bag1.jpg',
      description: 'when you wanna get in shape for summer... but life is hard',
      price: 2500,
      inventory: 10
    }),
    Product.create({
      title: 'password bag',
      photo: '/images/alexaimages_shirts_bags/bag2.jpg',
      description: 'i changed my password to \'incorrect\'... so whenever i forget it will tell me \'your password is incorrect\'',
      price: 1900,
      inventory: 8
    }),
    Product.create({
      title: 'age is just a number shirt',
      photo: '/images/alexaimages_shirts_bags/shirt1.jpg',
      description: 'age is just a number... false: age is a word',
      price: 2600,
      inventory: 11
    }),
    Product.create({
      title: 'tacos shirt',
      photo: '/images/alexaimages_shirts_bags/shirt2.jpg',
      description: 'if you have tacos... i will find them, and i will eat them',
      price: 2400,
      inventory: 3
    }),
    Product.create({
      title: 'cat smile shirt',
      photo: '/images/alexaimages_shirts_bags/shirt3.jpg',
      description: 'a smiling cat... on a t-shirt',
      price: 2000,
      inventory: 12
    }),
    Product.create({
      title: 'shut up liver shirt',
      photo: '/images/alexaimages_shirts_bags/shirt5.jpg',
      description: 'shut up liver... you\'re fine',
      price: 1700,
      inventory: 6
    }),
    Product.create({
      title: 'software update shirt',
      photo: '/images/alexaimages_shirts_bags/shirt6.jpg',
      description: 'you remind me of a software update... whenever i see you i usually think \'not now\'',
      price: 2100,
      inventory: 16
    }),
    Product.create({
      title: 'the hangover',
      photo: '/images/alexaimages_shirts_bags/shirt8.jpg',
      description: 'a hungover cat... on a t-shirt',
      price: 1400,
      inventory: 4
    }),
    Product.create({
      title: 'valentine shirt',
      photo: '/images/alexaimages_shirts_bags/shirt9.jpg',
      description: 'do i have a date for valentines day? yes. february 14.',
      price: 2300,
      inventory: 18
    }),
    Product.create({
      title: 'don\'t act like you\'re not impressed t-shirt',
      photo: '/images/alexaimages_shirts_bags/shirt10.jpg',
      description: 'don\'t act like you\'re not impressed',
      price: 1200,
      inventory: 10
    }),
    Product.create({
      title: 'cloned t-shirt',
      photo: '/images/alexaimages_shirts_bags/shirt11.jpg',
      description: 'holy crap... i\'ve been cloned',
      price: 1800,
      inventory: 7
    }),
    Product.create({
      title: 'selectively social t-shirt',
      photo: '/images/alexaimages_shirts_bags/shirt12.jpg',
      description: 'i\'m not anti-social. i\'m selectively social... there\'s a difference',
      price: 2300,
      inventory: 14
    }),
    Product.create({
      title: 'tacos tank',
      photo: '/images/alexaimages_shirts_bags/tank1.jpg',
      description: 'if you have tacos... i will find them. and i will eat them.',
      price: 1400,
      inventory: 9
    }),
    Product.create({
      title: 'chandler bings tank',
      photo: '/images/jakeimages_tanks/tank_chandlerthings.jpg',
      description: 'chandler bings stranger things tank',
      price: 1800,
      inventory: 7
    }),
    Product.create({
      title: 'chuck norris tank',
      photo: '/images/jakeimages_tanks/tank_chuck.jpg',
      description: 'chuck norris died 20 years ago... death just hasn\'t built up the courage to tell him',
      price: 1600,
      inventory: 12
    }),
    Product.create({
      title: 'eyebrow tank',
      photo: '/images/jakeimages_tanks/tank_eyebrows.jpg',
      description: 'i don\'t always use the internet at work... but when i do, eyebrows',
      price: 1800,
      inventory: 2
    }),
    Product.create({
      title: 'salty tank',
      photo: '/images/jakeimages_tanks/tank_grandma.jpg',
      description: 'all these flavors... and you choose to be salty',
      price: 2000,
      inventory: 17
    }),
    Product.create({
      title: 'joann fabrics tank',
      photo: '/images/jakeimages_tanks/tank_JoannFabrics.jpg',
      description: 'the outburst i had at joann\'s fabrics is not reflective of who i am',
      price: 1600,
      inventory: 8
    }),
    Product.create({
      title: 'crying jordan tank',
      photo: '/images/jakeimages_tanks/tank_jordan.jpg',
      description: 'crying jordan tank',
      price: 1500,
      inventory: 8
    }),
    Product.create({
      title: 'kanye tank',
      photo: '/images/jakeimages_tanks/tank_kanye.jpg',
      description: 'to kanye, love kanye tank',
      price: 1900,
      inventory: 73
    }),
    Product.create({
      title: 'one not does tank',
      photo: '/images/jakeimages_tanks/tank_onenotdoes.jpg',
      description: 'one not does simply... read the top line wrong',
      price: 1000,
      inventory: 15
    }),
    Product.create({
      title: 'fresh prince stranger things tank',
      photo: '/images/jakeimages_tanks/tank_willywill.jpg',
      description: 'fresh prince stranger things tank',
      price: 1800,
      inventory: 7
    }),
    Product.create({
      title: 'harry potter hoodie',
      photo: '/images/niharikaimages_hoodies/hoodie1.jpg',
      description: 'i got 99 problems but a snitch ain\'t one',
      price: 2600,
      inventory: 12
    }),
    Product.create({
      title: 'full name hoodie',
      photo: '/images/niharikaimages_hoodies/hoodie2.jpg',
      description: 'you know you\'re in trouble when they call you by your full name',
      price: 2400,
      inventory: 18
    }),
    Product.create({
      title: 'couch hoodie',
      photo: '/images/niharikaimages_hoodies/hoodie3.jpg',
      description: 'i love you couch... you understand me',
      price: 2200,
      inventory: 10
    }),
    Product.create({
      title: 'yolo hoodie',
      photo: '/images/niharikaimages_hoodies/hoodie4.jpg',
      description: 'yolo? false: you only die once',
      price: 2800,
      inventory: 17
    }),
    Product.create({
      title: 'aca-awesome birthday hoodie',
      photo: '/images/niharikaimages_hoodies/hoodie5.jpg',
      description: 'hope your birthday is aca-awesome',
      price: 1700,
      inventory: 8
    }),
    Product.create({
      title: 'workout hoodie',
      photo: '/images/niharikaimages_hoodies/hoodie6.jpg',
      description: 'today workout lineup hoodie',
      price: 1800,
      inventory: 10
    }),
    Product.create({
      title: 'flower hoodie',
      photo: '/images/niharikaimages_hoodies/hoodie7.jpg',
      description: 'i brought youz a flower... but i eated it',
      price: 2000,
      inventory: 5
    }),
    Product.create({
      title: 'procrastination hoodie',
      photo: '/images/niharikaimages_hoodies/hoodie8.jpg',
      description: 'stop procrastinating... starting tomorrow',
      price: 2200,
      inventory: 17
    }),
    Product.create({
      title: 'no charger hoodie',
      photo: '/images/niharikaimages_hoodies/hoodie10.jpg',
      description: 'how you look when you wake up and the charger wasn\'t plugged in',
      price: 2600,
      inventory: 11
    }),
    Product.create({
      title: 'not even drunk yet mug',
      photo: '/images/patimages_mugs/mug10.jpg',
      description: 'i\'m not even drunk yet mug',
      price: 1200,
      inventory: 12
    }),
    Product.create({
      title: 'dog mug',
      photo: '/images/patimages_mugs/mug12.jpg',
      description: 'future husband: why are there 50 dogs in our living room? where did they come from?',
      price: 1200,
      inventory: 12
    }),
    Product.create({
      title: 'healthy diet fail',
      photo: '/images/patimages_mugs/mug13.jpg',
      description: '9AM: Egg whites and avacdo, 1PM: Kale salad, 6PM: Chicken and veggies, 11PM: 23 oreos &+ tub of ice cream',
      price: 1200,
      inventory: 12
    }),
    Product.create({
      title: 'hate my job mug',
      photo: '/images/patimages_mugs/mug15.jpg',
      description: 'man returns to work after vacation with fresh, reenergized hatred for job mug',
      price: 1200,
      inventory: 12
    }),
    Product.create({
      title: 'favorite hobby mug',
      photo: '/images/patimages_mugs/mug19.jpg',
      description: 'what\'s your favorite hobby mug',
      price: 1200,
      inventory: 12
    }),
    Product.create({
      title: 'broke batman mug',
      photo: '/images/patimages_mugs/mug20.jpg',
      description: 'me: i think i only spent like $20 last night, bank account: -$268.46, me:',
      price: 1200,
      inventory: 12
    })
  ])
  .then(products => {
    let productIds = products

    const categories = Promise.all([
      Category.create({categoryName: 'T-Shirts'}),
      Category.create({categoryName: 'Hoodies'}),
      Category.create({categoryName: 'Mugs'}),
      Category.create({categoryName: 'Koozies'}),
      Category.create({categoryName: 'Everything Else'}),
      Category.create({categoryName: 'Tanks'})
    ]).then(categories => {
      categories[0].addProduct(products[0].id)
      categories[2].addProduct(products[1].id)
      categories[3].addProduct(products[2].id)
      categories[4].addProduct(products[3].id)
      categories[2].addProduct(products[4].id)
      categories[2].addProduct(products[5].id)
      categories[2].addProduct(products[6].id)
      categories[2].addProduct(products[7].id)
      categories[2].addProduct(products[8].id)
      categories[2].addProduct(products[9].id)
      categories[4].addProduct(products[10].id)
      categories[4].addProduct(products[11].id)
      categories[0].addProduct(products[12].id)
      categories[0].addProduct(products[13].id)
      categories[0].addProduct(products[14].id)
      categories[0].addProduct(products[15].id)
      categories[0].addProduct(products[16].id)
      categories[0].addProduct(products[17].id)
      categories[0].addProduct(products[18].id)
      categories[0].addProduct(products[19].id)
      categories[0].addProduct(products[20].id)
      categories[0].addProduct(products[21].id)
      categories[5].addProduct(products[22].id)
      categories[5].addProduct(products[23].id)
      categories[5].addProduct(products[22].id)
      categories[5].addProduct(products[23].id)
      categories[5].addProduct(products[24].id)
      categories[5].addProduct(products[25].id)
      categories[5].addProduct(products[26].id)
      categories[5].addProduct(products[27].id)
      categories[5].addProduct(products[28].id)
      categories[5].addProduct(products[29].id)
      categories[5].addProduct(products[30].id)
      categories[5].addProduct(products[31].id)
      categories[1].addProduct(products[32].id)
      categories[1].addProduct(products[33].id)
      categories[1].addProduct(products[34].id)
      categories[1].addProduct(products[35].id)
      categories[1].addProduct(products[36].id)
      categories[1].addProduct(products[37].id)
      categories[1].addProduct(products[38].id)
      categories[1].addProduct(products[39].id)
      categories[1].addProduct(products[40].id)
      categories[2].addProduct(products[41].id)
      categories[2].addProduct(products[42].id)
      categories[2].addProduct(products[43].id)
      categories[2].addProduct(products[44].id)
      categories[2].addProduct(products[45].id)
      categories[2].addProduct(products[46].id)

    })

    console.log(products[0].id)
  })

  const productCategory = [
      {productId: 1, categoryId: 3},
      {productId: 2, categoryId: 2},
      {productId: 3, categoryId: 5},
      {productId: 4, categoryId: 3},
      {productId: 5, categoryId: 4}
  ]

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


