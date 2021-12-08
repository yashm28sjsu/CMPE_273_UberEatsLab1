const { gql } = require('apollo-server');

const typeDefs = gql`
    type OrderLineItem {
        _id: String
        dish: Dish
        cost: Float
        quantity: Float
    }
    input OrderLineItemInput {
        dishId: String
        cost: Float
        quantity: Float
    }
    type Order {
        _id: String
        status: String
        type: String
        cost: Float
        deliverycost: Float,
        tax: Float,
        totalcost: Float,
        instructions: String,
        user: User,
        restaurant: Restaurant,
        address: Address,
        lineitems: [OrderLineItem]
    }
    type OrderResponse {
        order: Order
        error: String
    }
    type OrderArray {
        orders: [Order]
        error: String
    }
    input OrderInput {
        status: String
        type: String
        cost: Float
        deliverycost: Float,
        tax: Float,
        totalcost: Float,
        instructions: String,
        userId: String,
        restaurantId: String,
        addressId: String,
        lineitems: [OrderLineItemInput]
    }
    input OrderStatusInput {
        id: String
        status: String
    }
    type Query {
        getUserOrders(userId: String): OrderArray
        getRestaurantOrders(restaurantId: String): OrderArray
    }
    type Mutation {
        createOrder(order: OrderInput): OrderResponse
        updateOrderStatus(order: OrderStatusInput): OrderResponse
    }
`;

module.exports = typeDefs;
