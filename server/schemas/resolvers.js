const { User, Review, Restaurant } = require('../models');
const { signToken, NewAuthenticationError } = require('../utils/auth');


// leave the addUser, login, me, users, user alone

const resolvers = {
  Query: {
    restaurants: async () => {

      return await Restaurant.find();

    },
    restaurant: async (parent, { id }) => {
      return await Restaurant.findById(id);
    },
    users: async () => {
      return User.find().populate('reviews');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('reviews');
    },
    // allReviews
    // allReviews: async () => {
    //   return Reviews.find()
    // },
    // userReviews
    reviews: async (parent, { username }) => {
      const params = username ? { reviewAuthor: username } : {};
      return Review.find(params).sort({ createdAt: -1 });
    },
    // review by id
    review: async (parent, { reviewId }) => {
      return Review.findOne({ _id: reviewId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('reviews');
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
    addReview: async (parent, { reviewText, reviewAuthor }, context) => {
      if (context.user) {
        const review = await Review.create({
          reviewText,
          reviewAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { reviews: review._id } }
        );

        return review;
      }
      throw NewAuthenticationError;
    },
    addComment: async (parent, { reviewId, commentText, commentAuthor }, context) => {
      if (context.user) {
        return Review.findOneAndUpdate(
          { _id: reviewId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw NewAuthenticationError;
    },
    removeReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const review = await Review.findOneAndDelete({
          _id: reviewId,
          reviewAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { reviews: review._id } }
        );

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
