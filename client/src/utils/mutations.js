import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview($restaurantId: ID!, $reviewText: String!, $spiceRating: Int!) {
    addReview(restaurantId: $restaurantId, reviewText: $reviewText, spiceRating: $spiceRating) {
      _id
      reviewText
      spiceRating
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($reviewId: ID!, $comment: CommentInput!) {
    addComment(reviewId: $reviewId, comment: $comment) {
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
    }
  }
`;

export const REMOVE_REVIEW = gql`
  mutation RemoveReview($reviewId: ID!) {
    removeReview(reviewId: $reviewId) {
      _id
      reviewText
      spiceRating
      reviewAuthor
      createdAt
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($reviewId: ID!, $commentId: ID!) {
    removeComment(reviewId: $reviewId, commentId: $commentId) {
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
    }
  }
`;
