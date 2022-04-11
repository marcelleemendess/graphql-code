const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User]
        favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: UsersResult #handling the error with union 
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

    input CreateUserInput {
        name: String!
        username: String!
        age: Int! 
        nationality: Nationality = BRAZIL
    }

    input UpdateUsernameInput {
        name: String!
        username: String!
        age: Int! 
        nationality: Nationality = BRAZIL
    }

    type Mutation {
        createUser(input:CreateUserInput!): User
        updateUsername(input:UpdateUsernameInput!): User
        deleteUser(id: ID!): User
    }

    enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
    UKRAINE
  }

  # Error Handling 
  type UsersSucessfulResult {
    users: [User!]!
  }

  type UsersErrorResult {
    message: String!
  }

  union UsersResult = UsersSucessfulResult | UsersErrorResult 

`;

module.exports = { typeDefs };