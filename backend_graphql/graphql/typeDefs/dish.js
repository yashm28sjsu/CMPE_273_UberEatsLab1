const { gql } = require('apollo-server');

const typeDefs = gql`
    type Dish {
        _id: String
        name: String
        ingredients: String
        price: Float
        description: String
        image: String
        restaurantId: String
        type: String
    }
    type DishResponse {
        dish: Dish
        error: String
    }
    type DishArray {
        dishes: [Dish]
        error: String
    }
    input DishInput {
        id: String
        name: String
        ingredients: String
        price: Float
        description: String
        image: String
        restaurantId: String
        type: String
    }
    type Query {
        getDishes(restaurantId: String): DishArray
    }
    type Mutation {
        createDish(dish: DishInput): DishResponse
        updateDish(dish: DishInput): DishResponse
    }
`;

module.exports = typeDefs;
