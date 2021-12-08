const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        _id: String
        firstname: String
        lastname: String
        email: String
        dob: String
        country: String
        contact: String
        type: String
    }
    type UserToken {
        user: User
        token: String
        error: String
    }
    type UserResponse {
        user: User
        error: String
    }
    input UserInput {
        id: String
        firstname: String
        lastname: String
        password: String
        email: String
        dob: String
        country: String
        contact: String
    }
    input UserLogin {
        username: String!
        password: String!
    }
    type Query {
        loginUser(user: UserLogin): UserToken
    }
    type Mutation {
        createUser(user: UserInput): UserToken
        updateUser(user: UserInput): UserResponse
    }
`;

module.exports = typeDefs;
