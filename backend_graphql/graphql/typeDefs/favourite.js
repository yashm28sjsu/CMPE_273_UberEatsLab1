const { gql } = require('apollo-server');

const typeDefs = gql`
    type Favourite {
        _id: String
        userId: String
        restaurantId: String
    }
    type FavouriteWithRestaurant {
        _id: String
        restaurant: Restaurant
    }
    type FavouriteResponse {
        favourite: Favourite
        error: String
    }
    type SuccessResponse {
        success: Boolean
        error: String
    }
    type FavouriteArray {
        favourites: [FavouriteWithRestaurant]
        error: String
    }
    input FavouriteInput {
        userId: String
        restaurantId: String
    }
    type Query {
        getFavourites(userId: String): FavouriteArray
    }
    type Mutation {
        createFavourite(favourite: FavouriteInput): FavouriteResponse
        deleteFavourite(favouriteId: String): SuccessResponse
    }
`;

module.exports = typeDefs;
