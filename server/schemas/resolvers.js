const { User, Review, Restaurant } = require('../models');
const { signToken, NewAuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    restaurants: async () => {
      return await Restaurant.find();
    },
    restaurant: async (parent, { id }) => {
      return await Restaurant.findById(id);
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
    addReview: async (parent, { reviewText, spiceRating }, context) => {
      console.log("text: ", reviewText, "rating: ", spiceRating);
      if (context.user) {
        const newReview = await Review.create({
          reviewText: reviewText,
          reviewAuthor: context.user.username,
        });

        // once new review is created update context.user
        // $push to the reviews array on a user 
        // const updateUser = await User.findOneAndUpdate({
        // push the newReview._id onto the users reviews array 
        // });
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
