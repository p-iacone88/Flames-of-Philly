const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  spiceRating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
});

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;

// Halal spice
// Asads hot chicken - rating 5, spiceRating 5
// Casablanca Carribean Cuisine - rating 5, spiceRating 5
// hotclucks - rating 5, spiceRating 5
// King of Tandoor - rating 5, spiceRating 5
// Amma's south indian cuisine - rating 5, spiceRating 5

// Asian
// Han Dynasty - rating 5, spiceRating 5
// Buddakan- rating 5, spiceRating 5
// Cafe Soho - rating 5, spiceRating 5
// Tamarind - rating 5, spiceRating 5
// Gojjo - rating 5, spiceRating 5

// Latin American
// Sophie's Kitchen - rating 5, spiceRating 5
// Sancho's Pistola's - rating 5, spiceRating 5
// Vista Peru - rating 5, spiceRating 5
// Mixto Restaurante - rating 5, spiceRating 5
// Jose Pistola's - rating 5, spiceRating 5
