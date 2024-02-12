const { User, Review, Restaurant, Favorite } = require('../models');
const userSeeds = require('./userSeeds.json');
const reviewSeeds = require('./reviewSeeds.json');
const favoriteSeeds = require('./favoriteSeeds.json');
const restaurantSeeds = require('./restaurantSeeds.json');
const cleanDB = require('./cleanDB');

async function seedDatabase() {
  try {
    await cleanDB('Review', 'reviews');
    await cleanDB('User', 'users');
    await cleanDB('Restaurant', 'restaurants');
    await cleanDB('Favorite', 'favorites');

    // Create users
    const users = await User.create(userSeeds);

    // Create restaurants
    const restaurants = await Restaurant.create(restaurantSeeds);

    // Create reviews and link them to users and restaurants
    for (const reviewSeed of reviewSeeds) {
      const user = users.find(user => user.username === reviewSeed.reviewAuthor);
      const restaurant = restaurants.find(restaurant => restaurant.name === reviewSeed.restaurant);

      if (!user || !restaurant) {
        console.error(`User or Restaurant not found for review: ${JSON.stringify(reviewSeed)}`);
        continue;
      }

      await Review.create({ ...reviewSeed, user: user._id, restaurant: restaurant._id });
    }

    // Create favorites and link them to users and restaurants
    for (const favoriteSeed of favoriteSeeds) {
      const user = users.find(user => user.username === favoriteSeed.user);
      const restaurant = restaurants.find(restaurant => restaurant.name === favoriteSeed.restaurant);

      if (!user || !restaurant) {
        console.error(`User or Restaurant not found for favorite: ${JSON.stringify(favoriteSeed)}`);
        continue;
      }

      await Favorite.create({ user: user._id, restaurant: restaurant._id });
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Seed data created successfully');
  process.exit(0);
}

seedDatabase();
