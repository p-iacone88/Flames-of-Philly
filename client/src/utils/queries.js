import { gql } from '@apollo/client';

export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants {
      _id
      name
      address
      rating
      spiceRating
    }
  }
`;

export const GET_RESTAURANT = gql`
  query GetRestaurant($id: ID!) {
    restaurant(id: $id) {
      _id
      name
      address
      rating
      spiceRating
      reviews {
        _id
        reviewText
        spiceRating
        comments {
          _id
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      username
      email
      reviews {
        _id
        reviewText
        spiceRating
        createdAt
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      reviews {
        _id
        reviewText
        spiceRating
        createdAt
      }
    }
  }
`;

export const GET_REVIEWS = gql`
  query GetReviews($username: String) {
    reviews(username: $username) {
      _id
      reviewText
      spiceRating
      reviewAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
      user {
        _id
        username
      }
      restaurant {
        _id
        name
        address
        rating
        spiceRating
      }
    }
  }
`;

export const GET_REVIEW = gql`
  query GetReview($reviewId: ID!) {
    review(reviewId: $reviewId) {
      _id
      reviewText
      spiceRating
      reviewAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
      user {
        _id
        username
      }
      restaurant {
        _id
        name
        address
        rating
        spiceRating
      }
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      username
      email
      reviews {
        _id
        reviewText
        spiceRating
        createdAt
      }
    }
  }
`;
