const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    reviews: [Review]!
    favorites: [Restaurant]!
  }

  type Review {
    _id: ID
    reviewText: String
    reviewAuthor: String
    createdAt: String
    comments: [Comment]!
    user: User!
    restaurant: Restaurant!
  }
  
  type Restaurant {
    _id: ID!
    name: String!
    address: String!
    rating: Int!
    spiceRating: Int!
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
input ReviewInput {
  reviewTest: String!
}
input CommentInput {
  commentText: String!
  commentAuthor: String!
}
  type Query {
    users: [User]
    user(username: String!): User
    reviews(username: String): [Review]
    review(reviewId: ID!): Review
    me: User
    restaurant(id: ID!): Restaurant
    restaurants: [Restaurant]
  }
  type Mutation { 
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview(reviewText: String!): Review
    addComment(reviewId: ID!, comment: CommentInput!): Review
    removeReview(reviewId: ID!): Review
    removeComment(reviewId: ID!, commentId: ID!): Review
  }
`;

module.exports = typeDefs;
