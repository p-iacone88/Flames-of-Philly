const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  }
});

const Favorite = model('Favorite', favoriteSchema);

module.exports = Favorite;
