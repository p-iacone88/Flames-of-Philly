const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema({
  reviewText: {
    type: String,
    required: 'Leave your review',
    minlength: 1,
    maxlength: 2000,
    trim: true,
  },
  spiceRating: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Review = model('Review', reviewSchema);

module.exports = Review;
