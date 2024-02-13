const { User, Review, Restaurant } = require('../models');
const userSeeds = require('./userSeeds.json');
const reviewSeeds = require('./reviewSeeds.json');
const restaurantSeeds = require('./restaurantSeeds.json');
const cleanDB = require('./cleanDB');
const db = require('../config/connection');
const mongoose = require('mongoose'); // Ensure mongoose is imported

async function seedDatabase() {
  try {
    await db.dropCollection("users");
    await db.dropCollection("restaurants");
    await db.dropCollection("reviews");

    // Create users
    try {

      const users = await User.create(userSeeds);

    } catch (error) {
      console.log(error);
    }

    // Create restaurants
    try {
      const restaurants = await Restaurant.create(restaurantSeeds);
    } catch (error) {

    }

    try {
      // Create reviews and link them to users and restaurants
      for (const reviewSeed of reviewSeeds) {

        const user = await User.findOne({ username: reviewSeed.reviewAuthor });
        console.log(reviewSeed.reviewAuthor);
        console.log(user.username);

        const restaurant = await Restaurant.findOne({ name: reviewSeed.restaurant });
        // console.log(reviewSeed.restaurant);
        // if (!user || !restaurant) {
        //   console.error(`User or Restaurant not found for review: ${JSON.stringify(reviewSeed)}`);
        //   continue;
        // }

        try {
          console.log(restaurant._id);
          // console.log({ ...reviewSeed });
          let newReview = await Review.create({ ...reviewSeed, user: user._id, restaurant: restaurant._id });          // once a review is created grab newReview._id 
          // find one user and update with the $push on the reviews array of the user
          // here
          await User.findOneAndUpdate(
            { _id: user._id },
            { $push: { reviews: newReview._id } },
            { new: true }
          );
        } catch (error) {
          console.log(error);
        }

      }

    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  } catch (error) {
    console.log(error);
  }
  console.log('Seed data created successfully');
  process.exit(0);
}

seedDatabase();
