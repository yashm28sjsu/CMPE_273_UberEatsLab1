const { gql } = require('apollo-server');

const typeDefs = gql`
    type Restaurant {
        _id: String
        name: String
        password: String
        email: String
        country: String
        contact: String
        deliveryMode: String
        address: String
        picture: String
        type: String
    }
    type RestaurantToken {
        restaurant: Restaurant
        token: String
        error: String
    }
    type RestaurantResponse {
        restaurant: Restaurant
        error: String
    }
    type RestaurantArray {
        restaurants: [Restaurant]
        error: String
    }
    input RestaurantInput {
        id: String
        name: String
        password: String
        email: String
        country: String
        contact: String
        deliveryMode: String
        address: String
        picture: String
    }
    input RestaurantLogin {
        username: String!
        password: String!
    }
    type Query {
        loginRestaurant(user: RestaurantLogin): RestaurantToken
        getAllRestaurants: RestaurantArray
    }
    type Mutation {
        createRestaurant(user: RestaurantInput): RestaurantToken
        updateRestaurant(user: RestaurantInput): RestaurantResponse
    }
`;

module.exports = typeDefs;
