const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    reviews: [Review]!
  }

  type Review {
    _id: ID
    reviewText: String
    reviewAuthor: String
    createdAt: String
    comments: [Comment]!
    restaurant: [Restaurant]!
  }
  
  type Restaurant {
    _id: ID
    name: String!
    address: String!
    rating: Int!
    spiceRating: Int!
  }

  type Favorite {
    user: [User]
    restaurant: [Restaurant]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    reviews(username: String): [Review]
    review(reviewId: ID!): Review
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview(reviewText: String!): Review
    addComment(reviewId: ID!, commentText: String!): Review
    removeReview(reviewId: ID!): Review
    removeComment(reviewId: ID!, commentId: ID!): Review
  }
`;

module.exports = typeDefs;
