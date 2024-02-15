const { User, Review, Restaurant } = require('../models');
const { signToken, NewAuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    restaurants: async () => {
      return await Restaurant.find();
    },
    restaurant: async (parent, { id }) => {
      return await Restaurant.findById(id).populate('reviews');
    },
    users: async () => {
      const users = await User.find().populate('reviews');

      return users;
    },
    user: async (parent, { username }) => {
      const user = await User.findOne({ username });
      const reviews = await Review.find({ reviewAuthor: username });
      user.reviews = reviews;
      return user;
    },
    reviews: async (parent, { username }) => {
      const params = username ? { reviewAuthor: username } : {};
      return Review.find(params).sort({ createdAt: -1 });
    },
    review: async (parent, { reviewId }) => {
      return Review.findOne({ _id: reviewId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        const reviews = await Review.find({ reviewAuthor: user.username });
        user.reviews = reviews;
        return user;
      }
      throw NewAuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw NewAuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addReview: async (parent, { restaurantId, reviewText, spiceRating }, context) => {
      console.log(context.user);
      if (context.user) {
        console.log("hello!");
        const newReview = await Review.create({
          reviewText,
          spiceRating,
          reviewAuthor: context.user.username,
          restaurant: restaurantId,
        });
        console.log(newReview);
        await Restaurant.findOneAndUpdate(
          { _id: restaurantId },
          { $push: { reviews: newReview._id } }
        );

        return newReview;
      }
      throw NewAuthenticationError;
    },

    addComment: async (parent, { reviewId, comment }, context) => {
      if (context.user) {
        const updatedReview = await Review.findOneAndUpdate(
          { _id: reviewId },
          {
            $addToSet: {
              comments: {
                commentText: comment.commentText,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedReview;
      }
      throw NewAuthenticationError;
    },
    removeReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const review = await Review.findOneAndDelete({
          _id: reviewId,
          reviewAuthor: context.user.username,
        });

        return review;
      }
      throw NewAuthenticationError;
    },
    removeComment: async (parent, { reviewId, commentId }, context) => {
      if (context.user) {
        return Review.findOneAndUpdate(
          { _id: reviewId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw NewAuthenticationError;
    },
  },
};

module.exports = resolvers;
