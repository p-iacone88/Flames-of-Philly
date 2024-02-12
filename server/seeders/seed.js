const { User, Review, Restaurant, Favorite } = require('../models');
const userSeeds = require('./userSeeds.json');
const reviewSeeds = require('./reviewSeeds.json');
const cleanDB = require('./cleanDB');

async function seedDatabase() {
  try {
    await cleanDB('Review', 'reviews');
    await cleanDB('User', 'users');
    await cleanDB('Restaurant', 'restaurant');
    await cleanDB('Favorite', 'favorite');

    // Create users
    const users = await User.create(userSeeds);

    // Create reviews and link them to users
    for (let i = 0; i < reviewSeeds.length; i++) {
      const reviewSeed = reviewSeeds[i];
      const user = users.find(user => user.username === reviewSeed.reviewAuthor);

      if (!user) {
        console.error(`User not found for review author: ${reviewSeed.reviewAuthor}`);
        continue;
      }

      const review = await Review.create({ ...reviewSeed, user: user._id });
      user.reviews.push(review._id);
      await user.save();
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Seed data created successfully');
  process.exit(0);
}

seedDatabase();
