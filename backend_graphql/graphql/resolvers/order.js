const controller = require('../../controllers/order');

const resolvers = {
    Query: {
        getUserOrders: async (_parent, args, _context, _info) => await controller.getOrders(args.userId),
        getRestaurantOrders: async (_parent, args, _context, _info) => await controller.getRestaurantOrders(args.restaurantId),
    },
    Mutation: {
        createOrder: async (_parent, args, _context, _info) => await controller.create(args.order),
        updateOrderStatus: async (_parent, args, _context, _info) => await controller.updateStatus(args.order),
    },
};

module.exports = resolvers;
